"use server";

import { db } from "@/app/_lib/db";
import { RoleSchema } from "@/app/_schemas/zod/schema";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

export async function getRoles() {
  noStore();

  const roles = await db.employeeRole.findMany();

  if (!roles) return { error: "Not found!" };

  return { success: "Success!", data: roles };
}

export async function addRole(roleData: z.infer<typeof RoleSchema>) {
  if (!roleData) return { error: "Missing data!" };

  const parse = RoleSchema.safeParse(roleData);

  if (!parse.success) return { error: "Invalid data!" };

  const isExisting = await db.employeeRole.findUnique({
    where: { id: parse.data.id },
  });

  if (isExisting) return { error: "Role ID taken!" };

  const newRole = await db.employeeRole.create({ data: roleData });
  if (!newRole) return { error: "Database error" };

  revalidatePath("/dashboard/roles-and-permissions");

  return { success: "Role added!", data: newRole };
}

export async function deleteRole(roleId: string) {
  if (!roleId) return { error: "Role ID missing!" };

  const existingRole = await db.employeeRole.findUnique({
    where: { id: roleId },
  });

  if (!existingRole) return { error: "Role does not exist!" };

  const deletedRole = await db.employeeRole.delete({ where: { id: roleId } });
  if (!deletedRole) return { error: "Database error. Role not deleted!" };

  revalidatePath("/dashboard/roles-and-permissions");

  return { success: "Role added!", data: deletedRole };
}

export async function updateRole(
  roleId: string,
  values: Partial<z.infer<typeof RoleSchema>>
) {
  if (!values) return { error: "Missing data!" };

  const parse = RoleSchema.safeParse(values);

  if (!parse.success) return { error: "Invalid data!" };

  const isExisting = await db.employeeRole.findUnique({
    where: { id: roleId },
  });

  if (!isExisting) return { error: "Role does not exist!" };

  const updatedRole = await db.employeeRole.update({
    where: { id: roleId },
    data: { ...parse.data },
  });

  if (!updatedRole) return { error: "Database error. Update failed!" };

  revalidatePath("/dashboard/roles-and-permissions");
  return { success: "Update successful!", data: updatedRole };
}
