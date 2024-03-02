"use server";

import { db } from "@/app/_lib/db";

export async function getPrescriptionsByPatientId(patientId: string) {
  const prescriptions = await db.presciption.findMany({
    where: { patientId },
  });

  if (!prescriptions) return { error: "No prescriptions data found!" };

  return { success: " found!", data: prescriptions };
  //   const chart = await db.chart.findUnique({ where: { i } });

  //   const visit = await db.visit.findFirst({ where: {} });
}
