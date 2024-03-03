"use server";

import { db } from "@/app/_lib/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getVisitsByProfileId(profileId: string) {
  noStore();
  const visit = await db.patient.findUnique({
    where: { id: profileId },
    select: { id: true, visits: true },
  });

  if (!visit) return { error: "No visits found!" };

  return { success: "Visits found!", data: visit };
}

export async function getVisityByVisitId(visitId: string) {
  try {
    const visit = await db.visit.findUnique({
      where: { id: visitId },
      include: {
        vitals: true,
        diagnosis: true,
        prescriptions: true,
        laboratoryRequest: true,
        physicalExamination: true,
        serviceDepartment: true,
      },
    });

    if (!visit) return { error: "Visit not found!" };

    return { success: "Visit found!", data: visit };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
