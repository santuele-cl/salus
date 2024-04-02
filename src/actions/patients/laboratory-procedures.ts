"use server";

import { db } from "@/app/_lib/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getLaboratoryProcedures() {
  noStore();

  try {
    const laboratoryProcedures = await db.laboratoryProcedures.findMany({});

    if (!laboratoryProcedures)
      return { error: "Laboratory procedures not found!" };

    return {
      success: "Laboratory procedures found!",
      data: laboratoryProcedures,
    };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
