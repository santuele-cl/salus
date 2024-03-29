"use server";

import { db } from "@/app/_lib/db";
import { LaboratoryRequestSchema } from "@/app/_schemas/zod/schema";
import { auth } from "@/auth";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { createChartLog, updateChartLogStatus } from "../logs/chart-logs";
import { log } from "console";

const writeAllowed = ["PHYSICIAN"];
const getAllowed = [];

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
  const session = await auth();

  if (
    !session ||
    !session.user.empRole ||
    !writeAllowed.includes(session.user.empRole)
  )
    return { error: "Unauthorized!" };
  const parse = LaboratoryRequestSchema.safeParse(values);

  if (!parse.success) return { error: "Parse error. Invalid input!" };

  const headersList = headers();
  const ipAddress = headersList.get("x-forwarded-for") || "";
  const userAgent = headersList.get("user-agent") || "";

  const log = await createChartLog({
    action: "Add laboratory request",
    status: "pending",
    userAgent,
    ipAddress,
    employeeId: session?.user.empId,
    logDescription: "Add laboratory request",
    patientId: parse.data.patientId,
  });

  if (!log) return { error: "Database error. Log not saved!" };

  const laboratoryRequest = await db.laboratoryRequest.create({
    data: {
      ...(parse.data && parse.data),
    },
  });

  if (!laboratoryRequest) {
    await updateChartLogStatus({
      logId: log.data?.id,
      status: "failed",
    });

    return { error: "Error. Laboratory Request not added!" };
  }

  await updateChartLogStatus({
    logId: log.data?.id,
    status: "success",
  });

  // TODO: Use revalidate tag to refresh diagnosis data
  return { success: "Laboratory Request added!", data: laboratoryRequest };
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
