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

  if (!existingRole) return { error: "Role not found!" };

  const deletedRole = await db.employeeRole.delete({ where: { id: roleId } });
  if (!deletedRole) return { error: "Database error. Role not deleted!" };

  revalidatePath("/dashboard/roles-and-permissions");

  return { success: "Role added!", data: deletedRole };
}
