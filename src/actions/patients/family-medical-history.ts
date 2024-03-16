"use server";

import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/app/_lib/db";
import { z } from "zod";
import { FamilyMedicalHistorySchema } from "@/app/_schemas/zod/schema";

export async function getFamilyMedicalHistoriesByPatientID(patientId: string) {
  noStore();
  try {
    const familyMedicalHistories = await db.familyMedicalHistory.findMany({
      where: { patientId },
    });

    if (!familyMedicalHistories)
      return { error: "No family medical histories found!" };

    return {
      success: "Family medical historiess found!",
      data: familyMedicalHistories,
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
}

export async function getFamilyMedicalHistoryByFamilyMedicalHistoryId(
  familyMedicalHistoryId: string
) {
  if (!familyMedicalHistoryId) return { error: "Missing ID!" };

  try {
    const familyMedicalHistory = await db.familyMedicalHistory.findUnique({
      where: { id: familyMedicalHistoryId },
    });

    if (!familyMedicalHistory)
      return { error: "Missing family medical history!" };

    return {
      success: "Family edical history found!",
      data: familyMedicalHistory,
    };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function findFamilyMedicalHistoryByTermAndPatientId(
  term?: string,
  patientId?: string
) {
  noStore();

  if (!term) return { error: "No data found!" };

  try {
    const familyMedicalHistories = await db.familyMedicalHistory.findMany({
      where: {
        ...(patientId && { patientId }),
        OR: [
          { id: { contains: term, mode: "insensitive" } },
          { condition: { contains: term, mode: "insensitive" } },
          { relationship: { contains: term, mode: "insensitive" } },
        ],
      },
    });

    if (!familyMedicalHistories || familyMedicalHistories.length < 1) {
      return { error: "No data found!" };
    } else {
      return { success: "Fetch successful!", data: familyMedicalHistories };
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function addFamilyMedicalHistory(
  values: z.infer<typeof FamilyMedicalHistorySchema>
) {
  const validatedValues = FamilyMedicalHistorySchema.safeParse(values);

  if (!validatedValues.success) return { error: "Parse error!" };

  const familyMedicalHistory = await db.familyMedicalHistory.create({
    data: {
      ...(validatedValues.data && validatedValues.data),
    },
  });

  if (!familyMedicalHistory)
    return { error: "Error. Family medical data not added!" };

  return { success: "Family medical data added!", data: familyMedicalHistory };
}
