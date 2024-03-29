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

const writeAllowed = ["PHYSICIAN"];
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
  const parse = VaccinationSchema.safeParse(values);

  if (!parse.success) return { error: "Parse error. Invalid input!" };

  const vaccination = await db.vaccination.create({
    data: {
      ...(parse.data && parse.data),
    },
  });

  if (!vaccination)
    return { error: "Error. Vaccination not added!" };

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

