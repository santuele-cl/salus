"use server";

import { db } from "@/app/_lib/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getLaboratoryRequestsByPatientId(patientId: string) {
  noStore();
  try {
    const laboratoryRequests = await db.laboratoryRequest.findMany({
      where: { patientId },
      include: {
        laboratoryProcedure: {
          select: {
            procedureName: true,
          },
        },
      },
    });

    if (!laboratoryRequests)
      return { error: "No laboratory requests data found!" };

    return { success: " found!", data: laboratoryRequests };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function getLaboratoryRequestByLaboratoryRequestId(
  laboratoryRequestId: string
) {
  noStore();
  try {
    const laboratoryRequest = await db.laboratoryRequest.findUnique({
      where: { id: laboratoryRequestId },
      include: {
        laboratoryProcedure: {
          include: { laboratoryProcedureCategory: true },
        },
        requestingPhysician: {
          include: {
            profile: {
              include: { employee: true },
            },
          },
        },
        LaboratoryResults: {
          include: {
            testResults: true,
          },
        },
      },
    });

    if (!laboratoryRequest) return { error: "Laboratory request not found!" };

    return { success: " found!", data: laboratoryRequest };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
