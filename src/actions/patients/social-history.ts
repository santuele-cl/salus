"use server";

import { db } from "@/app/_lib/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getSocialHistoriesByPatientId(patientId: string) {
  noStore();
  try {
    const familyMedicalHistories = await db.socialHistory.findUnique({
      where: { patientId },
    });

    if (!familyMedicalHistories) return { error: "No social histories found!" };

    return {
      success: "Social historiess found!",
      data: familyMedicalHistories,
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
}

export async function getSocialHistoryByFamilyMedicalHistoryId(
  socialHistoryId: string
) {
  if (!socialHistoryId) return { error: "Missing ID!" };

  try {
    const socialHistory = await db.socialHistory.findUnique({
      where: { id: socialHistoryId },
    });

    if (!socialHistory) return { error: "Missing social history!" };

    return {
      success: "Social history found!",
      data: socialHistory,
    };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
