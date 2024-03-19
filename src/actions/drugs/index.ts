"use server";

import { db } from "@/app/_lib/db";
import { DrugSchema } from "@/app/_schemas/zod/schema";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

export async function getDrugs() {
  noStore();
  const drugs = await db.drugs.findMany({
    include: { drugForm: true, drugCategory: true },
  });

  if (!drugs) return { error: "Error. Cannot fetch drugs!" };
  if (!drugs.length) return { error: "There is no drugs in database!" };

  return {
    success: "Fetch successful",
    data: drugs,
  };
}

export async function getFiltedDrugs(term: string) {
  noStore();
  const drugs = await db.drugs.findMany({
    include: { drugForm: true, drugCategory: true },
  });

  if (!drugs) return { error: "Error. Cannot fetch drugs!" };
  if (!drugs.length) return { error: "There is no drugs in database!" };

  return {
    success: "Fetch successful",
    data: drugs,
  };
}

export const addDrug = async (values: z.infer<typeof DrugSchema>) => {
  if (!values) return { error: "Missing data!" };

  const parse = DrugSchema.safeParse(values);

  if (!parse.success) return { error: "Invalid data!" };

  const newDrug = await db.drugs.create({
    data: parse.data,
  });

  if (!newDrug) return { error: "Database error" };

  revalidatePath("/dashboard/drugs");

  return {
    success: `${newDrug.name} drug added!`,
    data: newDrug,
  };
};

export async function updateDrug(
  drugId: string,
  values: Partial<z.infer<typeof DrugSchema>>
) {
  if (!values) return { error: "Missing data!" };

  const parse = DrugSchema.safeParse(values);

  if (!parse.success) return { error: "Invalid data!" };

  const isExisting = await db.drugs.findUnique({
    where: { id: drugId },
  });

  if (!isExisting) return { error: "Drug does not exist!" };

  const updatedDrug = await db.drugs.update({
    where: { id: drugId },
    data: { ...parse.data },
  });

  if (!updatedDrug) return { error: "Database error. Update failed!" };

  revalidatePath("/dashboard/drugs");

  return {
    success: `${updatedDrug.name} updated!`,
    data: updatedDrug,
  };
}

export async function deleteDrug(drugId: string) {
  if (!drugId) return { error: "Drug ID missing!" };

  const existingDrug = await db.drugs.findUnique({
    where: { id: drugId },
  });

  if (!existingDrug) return { error: "Drug does not exist!" };

  const deletedDrug = await db.drugs.delete({
    where: { id: drugId },
  });
  if (!deletedDrug) return { error: "Database error. Drug not deleted!" };

  revalidatePath("/dashboard/drugs");

  return {
    success: `${deletedDrug.name} drug deleted!`,
    data: deletedDrug,
  };
}
