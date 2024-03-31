"use server";

import { db } from "@/app/_lib/db";
import { DiagnosisSchema, VaccinationSchema } from "@/app/_schemas/zod/schema";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { string, z } from "zod";
import { createChartLog, updateChartLogStatus } from "../logs/chart-logs";
import { headers } from "next/headers";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";
import dayjs from "dayjs";

const writeAllowed = ["PHYSICIAN", "NURSE"];
const getAllowed = [];

export async function getVaccinationsByPatientId(patientId: string) {
  noStore();
  try {
    const vaccination = await db.vaccination.findMany({
      where: { patientId: patientId },
    });

    if (!vaccination) return { error: "No vaccination data found!" };

    return { success: " found!", data: vaccination };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function getVaccinationsByVaccinationsId(vaccinationId: string) {
  noStore();
  try {
    const vaccination = await db.vaccination.findUnique({
      where: { id: vaccinationId },
    });

    if (!vaccination) return { error: "No vaccination data found!" };

    return { success: "Vaccination found!", data: vaccination };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function postVaccinations(
  values: z.infer<typeof VaccinationSchema>
) {
  const session = await auth();

  if (
    !session ||
    !session.user.empRole ||
    !writeAllowed.includes(session.user.empRole)
  )
    return { error: "Unauthorized!" };

  const parsedValues = VaccinationSchema.safeParse(values);

  if (!parsedValues.success) return { error: "Parse error!" };

  const headersList = headers();
  const ipAddress = headersList.get("x-forwarded-for") || "";
  const userAgent = headersList.get("user-agent") || "";

  const log = await createChartLog({
    action: "Add vaccination",
    status: "pending",
    userAgent,
    ipAddress,
    employeeId: session?.user.empId,
    logDescription: "",
    patientId: parsedValues.data.physicianId,
  });
  
  const parse = VaccinationSchema.safeParse(values);

  if (!parse.success) return { error: "Parse error. Invalid input!" };

  const vaccination = await db.vaccination.create({
    data: {
      ...(parse.data && parse.data),
    },
  });

  if (!vaccination){
    await updateChartLogStatus({
      logId: log.data?.id,
      status: "failed",
    });

    return { error: "Error. Vaccination not added!" };
  }

  await updateChartLogStatus({
    logId: log.data?.id,
    status: "success",
  });
  
  return { success: "Vaccination added!", data: vaccination };
}

export async function findvaccinationsByTermAndPatientId(
  term?: string,
  patientId?: string
) {
  noStore();

  if (!term) return { error: "No data found!" };

  try {
    const vaccinations = await db.vaccination.findMany({
      where: {
        ...(patientId && { patientId }),
        OR: [
          { id: { contains: term, mode: "insensitive" } },
          {
          vaccineName: { contains: term, mode: "insensitive" } },
        ],
      },
    });

    if (!vaccinations || vaccinations.length < 1) {
      return { error: "No vaccinations found!" };
    } else {
      return { success: "Fetch successful!", data: vaccinations };
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

