"use server";

import { db } from "@/app/_lib/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getAllergiesByPatientId(patientId: string) {
  noStore();
  try {
    const allergies = await db.allergies.findMany({
      where: { patientId },
    });

    if (!allergies) return { error: "No allergies data found!" };

    return { success: " found!", data: allergies };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function getAllergyByAllergyId(allergyId: string) {
  noStore();
  try {
    const allergy = await db.allergies.findUnique({
      where: { id: allergyId },
    });

    if (!allergy) return { error: "No allergy data found!" };

    return { success: "Allergy found!", data: allergy };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
