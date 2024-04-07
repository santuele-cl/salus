import { db } from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const drugs = await db.drugs.findMany();
  if (!drugs) throw new Error("Failed to fetch drugs.");

  return NextResponse.json(drugs);
}
