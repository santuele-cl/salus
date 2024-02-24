"use server";
import * as z from "zod";
import { SettingsSchema } from "@/app/_schemas/zod/schema";
import { getUserById } from "@/app/_data/user";
import { currentUser } from "@/app/_lib/session";
import { db } from "@/app/_lib/db";

export const updateSettings = async (
  data: Partial<z.infer<typeof SettingsSchema>>
) => {
  if (!data) return { error: "Missing data!" };

  const user = await currentUser();

  if (!user) return { error: "Unauthorized!" };

  const existingUser = await getUserById(user.id);

  if (!existingUser) return { error: "Unauthorized" };

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      ...data,
    },
  });

  return { success: "Settings updated!" };
};
