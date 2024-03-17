"use server";

import { db } from "@/app/_lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getClinicalDepartments = async () => {
  noStore();

  console.log("getclinical");
  const res = await db.clinicalDepartment.findMany();

  if (!res) return { error: "Fetch unsuccesful!" };
  if (!res.length) return { error: "No clinical department(s) found!" };

  return { success: "Success!", data: res };
};
