"use server";

import { db } from "@/app/_lib/db";
import { ServiceDepartmentSchema } from "@/app/_schemas/zod/schema";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { z } from "zod";

export const getServiceDepartments = async () => {
  noStore();

  const res = await db.serviceDepartment.findMany();

  if (!res) return { error: "Fetch unsuccesful!" };
  if (!res.length) return { error: "No service department(s) found!" };

  return { success: "Success!", data: res };
};

export const addServiceDepartment = async (
  values: z.infer<typeof ServiceDepartmentSchema>
) => {
  if (!values) return { error: "Missing data!" };

  const parse = ServiceDepartmentSchema.safeParse(values);

  if (!parse.success) return { error: "Invalid data!" };

  const newServiceDepartment = await db.serviceDepartment.create({
    data: values,
  });

  if (!newServiceDepartment) return { error: "Database error" };

  revalidatePath("/dashboard/service-departments");

  return {
    success: `${newServiceDepartment.name} department added!`,
    data: newServiceDepartment,
  };
};

export async function updateServiceDepartment(
  serviceDepartmentId: string,
  values: Partial<z.infer<typeof ServiceDepartmentSchema>>
) {
  if (!values) return { error: "Missing data!" };

  const parse = ServiceDepartmentSchema.safeParse(values);

  if (!parse.success) return { error: "Invalid data!" };

  const isExisting = await db.serviceDepartment.findUnique({
    where: { id: serviceDepartmentId },
  });

  if (!isExisting) return { error: "Service department does not exist!" };

  const updatedServiceDepartment = await db.serviceDepartment.update({
    where: { id: serviceDepartmentId },
    data: { ...parse.data },
  });

  if (!updatedServiceDepartment)
    return { error: "Database error. Update failed!" };

  revalidatePath("/dashboard/service-departments");
  return {
    success: `${updatedServiceDepartment.name} updated!`,
    data: updatedServiceDepartment,
  };
}

export async function deleteServiceDepartment(serviceDepartmentId: string) {
  if (!serviceDepartmentId) return { error: "Service department ID missing!" };

  const existingServiceDepartment = await db.serviceDepartment.findUnique({
    where: { id: serviceDepartmentId },
  });

  if (!existingServiceDepartment)
    return { error: "Service department does not exist!" };

  const deletedServiceDepartment = await db.serviceDepartment.delete({
    where: { id: serviceDepartmentId },
  });
  if (!deletedServiceDepartment)
    return { error: "Database error. Service department not deleted!" };

  revalidatePath("/dashboard/service-departments");

  return {
    success: `${deletedServiceDepartment.name} service department deleted!`,
    data: deletedServiceDepartment,
  };
}
