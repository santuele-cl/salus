"use server";

import { db } from "@/app/_lib/db";
import { AllergySchema } from "@/app/_schemas/zod/schema";
import { AllergySeverity } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

export async function getAllergiesByPatientId(patientId: string) {
  noStore();
  try {
    const allergies = await db.allergies.findMany({
      where: { patientId },
    });

    if (!allergies) return { error: "No allergies data found!" };

    return { success: " found!", data: allergies };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function getAllergyByAllergyId(allergyId: string) {
  noStore();
  try {
    const allergy = await db.allergies.findUnique({
      where: { id: allergyId },
    });

    if (!allergy) return { error: "No allergy data found!" };

    return { success: "Allergy found!", data: allergy };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function addAllergy(values: z.infer<typeof AllergySchema>) {
  const validatedValues = AllergySchema.safeParse(values);

  if (!validatedValues.success) return { error: "Parse error!" };

  const allergy = await db.allergies.create({
    data: {
      ...(validatedValues.data && validatedValues.data),
    },
  });

  if (!allergy) return { error: "Error. allergy not added!" };

  return { success: "Allergy added!", data: allergy };
}

export async function findAllergiesByTermAndPatientId(
  term?: string,
  patientId?: string
) {
  noStore();

  if (!term) return { error: "No data found!" };

  try {
    const allergies = await db.allergies.findMany({
      where: {
        ...(patientId && { patientId }),
        OR: [
          { id: { contains: term, mode: "insensitive" } },
          {
            name: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (!allergies || allergies.length < 1) {
      return { error: "No presciptions found!" };
    } else {
      return { success: "Fetch successful!", data: allergies };
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
