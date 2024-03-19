"use server";

import { db } from "@/app/_lib/db";
import { ClinicalDepartmentSchema } from "@/app/_schemas/zod/schema";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { z } from "zod";

export const getClinicalDepartments = async () => {
  noStore();

  console.log("getclinical");
  const res = await db.clinicalDepartment.findMany();

  if (!res) return { error: "Fetch unsuccesful!" };
  if (!res.length) return { error: "No clinical department(s) found!" };

  return { success: "Success!", data: res };
};

export const addClinicalDepartment = async (
  values: z.infer<typeof ClinicalDepartmentSchema>
) => {
  if (!values) return { error: "Missing data!" };

  const parse = ClinicalDepartmentSchema.safeParse(values);

  if (!parse.success) return { error: "Invalid data!" };

  const newClinicalDepartment = await db.clinicalDepartment.create({
    data: values,
  });

  if (!newClinicalDepartment) return { error: "Database error" };

  revalidatePath("/dashboard/clinical-departments");
  return {
    success: `${newClinicalDepartment.name} department added!`,
    data: newClinicalDepartment,
  };
};

export async function updateClinicalDepartment(
  clinicalDepartmentId: string,
  values: Partial<z.infer<typeof ClinicalDepartmentSchema>>
) {
  if (!values) return { error: "Missing data!" };

  const parse = ClinicalDepartmentSchema.safeParse(values);

  if (!parse.success) return { error: "Invalid data!" };

  const isExisting = await db.clinicalDepartment.findUnique({
    where: { id: clinicalDepartmentId },
  });

  if (!isExisting) return { error: "Clinical department does not exist!" };

  const updatedClinicalDepartment = await db.clinicalDepartment.update({
    where: { id: clinicalDepartmentId },
    data: { ...parse.data },
  });

  if (!updatedClinicalDepartment)
    return { error: "Database error. Update failed!" };

  revalidatePath("/dashboard/clinical-departments");
  return {
    success: `${updatedClinicalDepartment.name} updated!`,
    data: updatedClinicalDepartment,
  };
}

export async function deleteClinicalDepartment(clinicalDepartmentId: string) {
  if (!clinicalDepartmentId) return { error: "Clinical deparment ID missing!" };

  const existingClinicalDepartment = await db.clinicalDepartment.findUnique({
    where: { id: clinicalDepartmentId },
  });

  if (!existingClinicalDepartment)
    return { error: "Clinical department does not exist!" };

  const deletedClinicalDepartment = await db.clinicalDepartment.delete({
    where: { id: clinicalDepartmentId },
  });
  if (!deletedClinicalDepartment)
    return { error: "Database error. Clinical department not deleted!" };

  revalidatePath("/dashboard/clinical-departments");

  return {
    success: `${deletedClinicalDepartment.name} clinical department deleted!`,
    data: deletedClinicalDepartment,
  };
}
