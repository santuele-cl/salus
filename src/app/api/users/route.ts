import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/app/_util/users";

import { RegisterSchema } from "@/schemas";
import * as yup from "yup";

export async function POST(request: Request) {
  const requestData = await request.json();

  const isRequestDataValid = await RegisterSchema.strict().isValid(requestData);

  if (!isRequestDataValid) {
    return NextResponse.json(
      { message: "Invalid request data." },
      { status: 400 }
    );
  }

  const { email, password, fname, lname } = requestData;

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
