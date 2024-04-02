"use server";

import { db } from "@/app/_lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getServiceDeparments = async () => {
  noStore();

  const res = await db.serviceDepartment.findMany();

  if (!res) return { error: "Fetch unsuccesful!" };
  if (!res.length) return { error: "No service department(s) found!" };

  return { success: "Success!", data: res };
};
