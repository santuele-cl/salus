"use server";

import { db } from "@/app/_lib/db";
import { DrugSchema } from "@/app/_schemas/zod/schema";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

export async function getDrugCatergories() {
  const drugCategories = await db.drugCategory.findMany({});

  if (!drugCategories || !drugCategories.length)
    return { error: "No data found!" };

  return { success: "Fetch successful", data: drugCategories };
}
