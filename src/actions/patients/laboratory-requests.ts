"use server";

import { db } from "@/app/_lib/db";
import { LaboratoryRequestSchema } from "@/app/_schemas/zod/schema";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

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

export async function postLaboratoryRequest(
  values: z.infer<typeof LaboratoryRequestSchema>
) {
  const parse = LaboratoryRequestSchema.safeParse(values);

  if (!parse.success) return { error: "Parse error. Invalid input!" };

  const laboratoryRequest = await db.laboratoryRequest.create({
    data: {
      ...(parse.data && parse.data),
    },
  });

  if (!laboratoryRequest)
    return { error: "Error. Laboratory request not added!" };

  return { success: "Laboratory request added!", data: laboratoryRequest };
}

export async function findLaboratoryRequestsByTermAndPatientId(
  term?: string,
  patientId?: string
) {
  noStore();

  if (!term) return { error: "No data found!" };

  try {
    const laboratoryRequests = await db.laboratoryRequest.findMany({
      where: {
        ...(patientId && { patientId }),
        OR: [
          { id: { contains: term, mode: "insensitive" } },
          {
            laboratoryProcedure: {
              procedureName: {
                contains: term,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        laboratoryProcedure: {
          select: {
            procedureName: true,
          },
        },
      },
    });

    if (!laboratoryRequests || laboratoryRequests.length < 1) {
      return { error: "No laboratoryRequests found!" };
    } else {
      return { success: "Fetch successful!", data: laboratoryRequests };
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
