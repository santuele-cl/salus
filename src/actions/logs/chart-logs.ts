"use server";

import { db } from "@/app/_lib/db";
import { ChartLogs } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

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

export async function createChartLog(logData: ChartLogs) {
  const {
    logTime,
    ipAddress,
    userAgent,
    action,
    employeeId,
    logDescription,
    patientId,
  } = logData;
  if (
    !logTime ||
    !ipAddress ||
    !userAgent ||
    !action ||
    !employeeId ||
    !logDescription ||
    !patientId
  )
    return { error: "Missing data!" };

  const log = await db.chartLogs.create({
    data: logData,
  });

  if (!log) return { error: "Error. Log not added!" };

  return { success: "Log added.", data: log };
}
