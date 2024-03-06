"use server";

import { db } from "@/app/_lib/db";
import { unstable_noStore as noStore } from "next/cache";

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

export async function getVaccinationsByVaccinationsId(allergyId: string) {
  noStore();
  try {
    const allergy = await db.vaccination.findUnique({
      where: { id: allergyId },
    });

    if (!allergy) return { error: "No allergy data found!" };

    return { success: "Allergy found!", data: allergy };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
