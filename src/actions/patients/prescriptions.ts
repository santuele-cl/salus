"use server";

import { db } from "@/app/_lib/db";
import { PrescriptionSchema } from "@/app/_schemas/zod/schema";
import { auth } from "@/auth";
import { Presciption } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";

import { z } from "zod";
import { createChartLog, updateChartLogStatus } from "../logs/chart-logs";
import { decryptData, encryptData } from "@/app/_lib/crypto";

const writeAllowed = ["PHYSICIAN"];
const getAllowed = [];

const encryptedFields: Array<keyof z.infer<typeof PrescriptionSchema>> = [
  "dosage",
  "durationInDays",
  "frequencyPerDay",
  "notes",
  "takenEveryHour",
];

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

  const decryptedPrescription = prescriptions.map((item) => {
    return {
      ...item,
      dosage: JSON.parse(decryptData(item.dosage)),
      durationInDays: JSON.parse(decryptData(item.durationInDays)),
      frequencyPerDay: JSON.parse(decryptData(item.frequencyPerDay)),
      takenEveryHour: JSON.parse(decryptData(item.takenEveryHour)),
      ...(item.notes && {
        notes: encryptData(item.notes),
      }),
    };
  });

  console.log(decryptedPrescription);

  return { success: " found!", data: decryptedPrescription };
}

export async function addPrescription(
  values: z.infer<typeof PrescriptionSchema>
) {
  const session = await auth();

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

  const encryptedData: z.infer<typeof PrescriptionSchema> = {
    ...validatedValues.data,
    dosage: encryptData(validatedValues.data.dosage),
    durationInDays: encryptData(validatedValues.data.durationInDays),
    frequencyPerDay: encryptData(validatedValues.data.frequencyPerDay),
    takenEveryHour: encryptData(validatedValues.data.takenEveryHour),
    ...(validatedValues.data.notes && {
      notes: encryptData(validatedValues.data.notes),
    }),
  };

  const prescription = await db.presciption.create({
    data: {
      ...(validatedValues.data && encryptedData),
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

    const decryptedPrescription = {
      ...prescription,
      dosage: JSON.parse(decryptData(prescription.dosage)),
      durationInDays: JSON.parse(decryptData(prescription.durationInDays)),
      frequencyPerDay: JSON.parse(decryptData(prescription.frequencyPerDay)),
      takenEveryHour: JSON.parse(decryptData(prescription.takenEveryHour)),
      notes: JSON.parse(decryptData(prescription.notes)),
    };

    return { success: "Prescription found!", data: decryptedPrescription };
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
    const prescriptions = await db.presciption.findMany({
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

    if (!prescriptions || prescriptions.length < 1) {
      return { error: "No prescriptions found!" };
    } else {
      const decryptedPrescription = prescriptions.map((item) => {
        return {
          ...item,
          dosage: JSON.parse(decryptData(item.dosage)),
          durationInDays: JSON.parse(decryptData(item.durationInDays)),
          frequencyPerDay: JSON.parse(decryptData(item.frequencyPerDay)),
          takenEveryHour: JSON.parse(decryptData(item.takenEveryHour)),
          ...(item.notes && {
            notes: encryptData(item.notes),
          }),
        };
      });

      return { success: "Fetch successful!", data: decryptedPrescription };
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function addDate() {}
