"use server";

import { getUserByEmail } from "@/app/_util/users";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/app/_lib/db";
import { LoginSchema, RegisterSchema } from "../../../prisma/schema";

export async function login(credentials: z.infer<typeof LoginSchema>) {
  const validatedCredentials = LoginSchema.safeParse(credentials);

  if (!validatedCredentials.success) {
    return { error: "Invalid data." };
  }

  const { email, password } = validatedCredentials.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
  return { success: "Login successful." };
}

export async function createUser(registerData: z.infer<typeof RegisterSchema>) {
  const validatedData = RegisterSchema.safeParse(registerData);

  if (!validatedData.success) {
    return { error: "Invalid register data." };
  }

  const { email, password, fname, lname } = validatedData.data;

  const isEmailTaken = await getUserByEmail(email);

  if (isEmailTaken) {
    return { error: "Email already taken." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return { success: "User created successfully." };
}
