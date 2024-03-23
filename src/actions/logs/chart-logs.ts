"use server";

import { db } from "@/app/_lib/db";
import { ChartLogs } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";

// const ITEMS_PER_PAGE = 10;

export async function getChartLogs({
  userId,
  patientId,
  query,
  page,
}: {
  patientId?: string;
  query?: string;
  page?: number;
  userId?: string;
}) {
  noStore();
  const logs = await db.chartLogs.findMany({
    where: {
      ...(userId && { userId }),
      ...(patientId && { patientId }),
      ...(query && {
        OR: [
          { id: { contains: query, mode: "insensitive" } },
          {
            employeeId: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            ipAddress: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      }),
    },
    // take: ITEMS_PER_PAGE,
    // skip: (Number(page) - 1) * ITEMS_PER_PAGE,
    orderBy: [{ logTime: "desc" }],
  });

  if (!logs) return { error: "Database error!" };

  return { success: "Fetch successful!+", data: logs };
}

interface LogDataType {
  ipAddress: string;
  userAgent: string;
  action: string;
  status: string;
  employeeId: string;
  logDescription: string;
  patientId: string;
}
export async function createChartLog(logData: LogDataType) {
  const { ipAddress, userAgent, action, status, employeeId, patientId } =
    logData;
  if (
    !ipAddress ||
    !userAgent ||
    !action ||
    !employeeId ||
    !patientId ||
    !status
  )
    return { error: "Missing data!" };

  const log = await db.chartLogs.create({
    data: logData,
  });

  if (!log) return { error: "Error. Log not added!" };

  return { success: "Log added.", data: log };
}

export async function updateChartLogStatus({
  logId,
  status,
}: {
  logId?: string;
  status?: string;
}) {
  if (!logId) return { error: "Missing log id!" };
  if (!status) return { error: "Missing log status!" };

  const isExisting = await db.chartLogs.findUnique({
    where: { id: logId },
  });

  if (!isExisting) return { error: "Log does not exist!" };

  const updatedLog = await db.chartLogs.update({
    where: { id: logId },
    data: { status },
  });

  if (!updatedLog) return { error: "Database error. Log not updated!" };

  return { success: "Log updated successfully!", data: updatedLog };
}
