"use server";

import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/app/_lib/db";

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
