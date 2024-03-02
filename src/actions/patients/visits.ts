"use server";

import { db } from "@/app/_lib/db";

export async function getVisitsByProfileId(profileId: string) {
  const visit = await db.patient.findUnique({
    where: { id: profileId },
    select: { id: true, visits: true },
  });

  if (!visit) return { error: "No visits found!" };

  return { success: "Visits found!", data: visit };
}
