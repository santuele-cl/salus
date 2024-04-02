"use server";

import { db } from "@/app/_lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getEmployeeRoles = async () => {
  noStore();
  const res = await db.employeeRole.findMany();

  if (!res) return { error: "Fetch unsuccesful!" };
  if (!res.length) return { error: "No employee role(s) found!" };

  return { success: "Success!", data: res };
};
