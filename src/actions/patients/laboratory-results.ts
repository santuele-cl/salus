"use server";

import { db } from "@/app/_lib/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getLaboratoryResultsByPatientId(patientId: string) {
  noStore();
  try {
    const laboratoryResults = await db.laboratoryResults.findMany({
      where: { patientId },
    });

    if (!laboratoryResults)
      return { error: "No laboratory results data found!" };

    return { success: " found!", data: laboratoryResults };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}