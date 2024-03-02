"use server";

import { db } from "@/app/_lib/db";

export async function getAllergiesByPatientId(patientId: string) {
  const allergies = await db.allergies.findMany({
    where: { patientId },
  });

  if (!allergies) return { error: "No allergies data found!" };

  return { success: " found!", data: allergies };
  //   const chart = await db.chart.findUnique({ where: { i } });

  //   const visit = await db.visit.findFirst({ where: {} });
}
