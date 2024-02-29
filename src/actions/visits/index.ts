"use server";

import { db } from "@/app/_lib/db";

export async function getVisitsByProfileId(profileId: string) {
  const visit = await db.patient.findUnique({
    where: { id: profileId },
    select: { chart: { select: { visits: true } } },
  });

  console.log("visit", visit);
  if (!visit) return { error: "No visits found!" };

  return { success: "Visits found!", data: visit };
  //   const chart = await db.chart.findUnique({ where: { i } });

  //   const visit = await db.visit.findFirst({ where: {} });
}
