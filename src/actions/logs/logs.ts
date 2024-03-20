"use server";

import { db } from "@/app/_lib/db";
import { LogType } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 10;

export async function getLogs({
  type,
  userId,
  query,
  page,
}: {
  query?: string;
  page?: number;
  type?: LogType;
  userId?: string;
}) {
  noStore();
  console.log("quqery", query);
  const logs = await db.log.findMany({
    where: {
      ...(type && { type }),
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
    take: ITEMS_PER_PAGE,
    skip: (Number(page) - 1) * ITEMS_PER_PAGE,
  });

  if (!logs) return { error: "Database error!" };

  return { success: "Fetch successful!+", data: logs };
}
