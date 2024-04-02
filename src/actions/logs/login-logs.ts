"use server";

import { db } from "@/app/_lib/db";
import { unstable_noStore as noStore } from "next/cache";

// const ITEMS_PER_PAGE = 10;

export async function getLoginLogs({
  userId,
  query,
  page,
}: {
  query?: string;
  page?: number;
  userId?: string;
}) {
  noStore();
  console.log("quqery", query);
  const logs = await db.loginLogs.findMany({
    where: {
      ...(userId && { userId }),
      ...(query && {
        OR: [
          { id: { contains: query, mode: "insensitive" } },
          {
            userId: {
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

interface LoginLogType {
  userId: string;
  ipAddress: string;
  userAgent: string;
  errorMessage?: string;
  status: string;
}
export async function createLoginLog(logData: LoginLogType) {
  console.log("login log called");
  const { userId, ipAddress, userAgent, status } = logData;
  if (!userId || !ipAddress || !userAgent || !status)
    return { error: "Missing data!" };

  const log = await db.loginLogs.create({
    data: logData,
  });

  if (!log) return { error: "Error. Log not added!" };

  return { success: "Log added.", data: log };
}

export async function updateLoginLogStatus({
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

  const updatedLog = await db.loginLogs.update({
    where: { id: logId },
    data: { status },
  });

  if (!updatedLog) return { error: "Database error. Log not updated!" };

  return { success: "Log updated successfully!", data: updatedLog };
}
