"use server";

import { db } from "@/app/_lib/db";

export async function getDrugs() {
  const drugs = await db.drugs.findMany();

  if (!drugs) return { error: "Error. Cannot fetch drugs!" };
  if (!drugs.length) return { error: "There is no drugs in database!" };

  return {
    success: "Fetch successful",
    data: drugs,
  };
}
