import { db } from "@/app/_lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import * as z from "zod";
import { RegisterSchema } from "../../_schemas/zod/schema";
import { getUserByEmail } from "@/app/_data/user";

export async function POST(request: Request) {
  const requestData = await request.json();

  const validatedData = RegisterSchema.safeParse(request);

  if (!validatedData.success) {
    return NextResponse.json(
      { message: "Invalid request data." },
      { status: 400 }
    );
  }

  const { email, password, fname, lname } = validatedData.data;

  const isEmailTaken = await getUserByEmail(email);

  if (isEmailTaken) {
    return NextResponse.json(
      { message: "Email already taken" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send verification email

  if (!user) {
    return NextResponse.json(
      { message: "An error has occured. User not created. Try again." },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "User created", user }, { status: 200 });
}

export async function GET(request: Request) {
  const users = await db.user.findMany();

  return NextResponse.json(users);
}
