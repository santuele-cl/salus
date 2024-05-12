"use server";

import { db } from "@/app/_lib/db";
import { PhysicalExaminationSchema } from "@/app/_schemas/zod/schema";
import { auth } from "@/auth";
import { unstable_noStore } from "next/cache";
import { z } from "zod";

const writeAllowed = ["PHYSICIAN"];
const getAllowed = [];

export async function addPhysicalExamination(
  values: z.infer<typeof PhysicalExaminationSchema>
) {
  unstable_noStore();
  const session = await auth();

  if (
    !session ||
    !session.user.empRole ||
    !writeAllowed.includes(session.user.empRole)
  )
    return { error: "Unauthorized!" };

  const parsedValue = PhysicalExaminationSchema.safeParse(values);

  if (!parsedValue.success) return { error: "Parse error!" };

  try {
    const physicalExamination = await db.physicalExamination.create({
      data: {
        ...(parsedValue.data && parsedValue.data),
      },
    });

    if (!physicalExamination) {
      return { error: "Error. Physical Examination not added!" };
    }

    return {
      success: "Physical Examination added!",
      data: physicalExamination,
    };
  } catch (error) {
    console.log(error);

    return { error: JSON.stringify(error) };
  }
}
