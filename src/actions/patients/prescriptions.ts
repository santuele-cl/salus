"use server";

import { db } from "@/app/_lib/db";
import { PrescriptionSchema } from "@/app/_schemas/zod/schema";
import { auth } from "@/auth";
import { Presciption } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";

import { z } from "zod";
import { createChartLog, updateChartLogStatus } from "../logs/chart-logs";
import { encryptObjectData } from "@/app/_lib/crypto";

const writeAllowed = ["PHYSICIAN"];
const getAllowed = [];

export async function getPrescriptionsByPatientId(patientId: string) {
  noStore();
  const prescriptions = await db.presciption.findMany({
    where: { patientId },
    include: {
      drugs: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!prescriptions) return { error: "No prescriptions data found!" };

  return { success: " found!", data: prescriptions };
  //   const chart = await db.chart.findUnique({ where: { i } });

  //   const visit = await db.visit.findFirst({ where: {} });
}

export async function addPrescription(
  values: z.infer<typeof PrescriptionSchema>
) {
  const session = await auth();

  // console.log(session);

  if (
    !session ||
    !session.user.empRole ||
    !writeAllowed.includes(session.user.empRole)
  )
    return { error: "Unauthorized!" };

  const validatedValues = PrescriptionSchema.safeParse(values);

  if (!validatedValues.success) return { error: "Parse error!" };

  const headersList = headers();
  const ipAddress = headersList.get("x-forwarded-for") || "";
  const userAgent = headersList.get("user-agent") || "";

  const log = await createChartLog({
    action: "Add Prescription",
    status: "pending",
    userAgent,
    ipAddress,
    employeeId: session?.user.empId,
    logDescription: "",
    patientId: validatedValues.data.patientId,
  });

  if (!log) return { error: "Database error. Log not saved!" };

  const toExcludeEncryptFields: Array<
    keyof z.infer<typeof PrescriptionSchema>
  > = ["drugsId", "physicianId", "patientId", "startDate", "endDate"];

  console.log(validatedValues.data);
  console.log(encryptObjectData(validatedValues.data, toExcludeEncryptFields));

  const prescription = await db.presciption.create({
    data: {
      ...(validatedValues.data &&
        encryptObjectData(validatedValues.data, toExcludeEncryptFields)),
    },
  });

  if (!prescription) {
    await updateChartLogStatus({
      logId: log.data?.id,
      status: "failed",
    });

    return { error: "Error. Prescription not added!" };
  }

  await updateChartLogStatus({
    logId: log.data?.id,
    status: "success",
  });

  return { success: "Prescription added!", data: prescription };
}

export async function getPrescriptionByPrescriptionId(prescriptionId: string) {
  noStore();
  try {
    const prescription = await db.presciption.findUnique({
      where: { id: prescriptionId },
      include: {
        drugs: { select: { name: true } },
      },
    });

    if (!prescription) return { error: "No prescription data found!" };

    return { success: "Prescription found!", data: prescription };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function findPrescriptionByTermAndPatientId(
  term?: string,
  patientId?: string
) {
  noStore();

  if (!term) return { error: "No data found!" };

  try {
    const presciptions = await db.presciption.findMany({
      where: {
        ...(patientId && { patientId }),
        OR: [
          { id: { contains: term, mode: "insensitive" } },
          {
            drugs: {
              name: {
                contains: term,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        drugs: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!presciptions || presciptions.length < 1) {
      return { error: "No presciptions found!" };
    } else {
      return { success: "Fetch successful!", data: presciptions };
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function addDate() {}
