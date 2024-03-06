"use server";

import { db } from "@/app/_lib/db";
import { PrescriptionSchema } from "@/app/_schemas/zod/schema";
import { z } from "zod";

export async function getPrescriptionsByPatientId(patientId: string) {
  const prescriptions = await db.presciption.findMany({
    where: { patientId },
    include: {
      drugs: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!prescriptions) return { error: "No prescriptions data found!" };

  return { success: " found!", data: prescriptions };
  //   const chart = await db.chart.findUnique({ where: { i } });

  //   const visit = await db.visit.findFirst({ where: {} });
}

export async function addPrescription(
  values: z.infer<typeof PrescriptionSchema>
) {
  const validatedValues = PrescriptionSchema.safeParse(values);

  if (!validatedValues.success) return { error: "Parse error!" };

  return { success: "Prescription added!", data: "" };
}
