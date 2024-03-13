"use server";

import { db } from "@/app/_lib/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getLaboratoryResultsByPatientId(patientId: string) {
  noStore();
  try {
    const laboratoryResults = await db.laboratoryResults.findMany({
      where: { patientId },
    });

    if (!laboratoryResults) return { error: "Laboratory results not found!" };

    return { success: "Fetch successful!", data: laboratoryResults };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function findLaboratoryResultsByTermAndPatientId(
  term?: string,
  patientId?: string
) {
  noStore();

  if (!term) return { error: "No data found!" };

  try {
    const laboratoryRequests = await db.laboratoryResults.findMany({
      where: {
        ...(patientId && { patientId }),
        OR: [
          { id: { contains: term, mode: "insensitive" } },
          {
            laboratoryRequest: {
              laboratoryProcedure: {
                procedureName: {
                  contains: term,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            testName: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (!laboratoryRequests || laboratoryRequests.length < 1) {
      return { error: "No laboratory results found!" };
    } else {
      return { success: "Fetch successful!", data: laboratoryRequests };
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
