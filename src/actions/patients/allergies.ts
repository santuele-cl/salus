"use server";

import { db } from "@/app/_lib/db";
import { AllergySchema } from "@/app/_schemas/zod/schema";
import { auth } from "@/auth";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { createChartLog, updateChartLogStatus } from "../logs/chart-logs";
import { decryptData, encryptData } from "@/app/_lib/crypto";

const writeAllowed = ["PHYSICIAN"];
const getAllowed = [];

export async function getAllergiesByPatientId(patientId: string) {
  noStore();
  try {
    const allergies = await db.allergies.findMany({
      where: { patientId },
    });

    if (!allergies) return { error: "No allergies data found!" };

    const decryptedAllergies = allergies.map((allergy) => {
      return {
        ...allergy,
        name: JSON.parse(decryptData(allergy.name)),
        severity: JSON.parse(decryptData(allergy.severity)),
        ...(allergy.description && {
          description: JSON.parse(decryptData(allergy.description)),
        }),
      };
    });

    return { success: " found!", data: decryptedAllergies };
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

    const decryptedAllergy = {
      ...allergy,
      name: JSON.parse(decryptData(allergy.name)),
      severity: JSON.parse(decryptData(allergy.severity)),
      ...(allergy.description && {
        description: JSON.parse(decryptData(allergy.description)),
      }),
    };

    return { success: "Allergy found!", data: decryptedAllergy };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function addAllergy(values: z.infer<typeof AllergySchema>) {
  const session = await auth();

  if (
    !session ||
    !session.user.empRole ||
    !writeAllowed.includes(session.user.empRole)
  )
    return { error: "Unauthorized!" };

  const validatedValues = AllergySchema.safeParse(values);

  if (!validatedValues.success) return { error: "Parse error!" };

  const headersList = headers();
  const ipAddress = headersList.get("x-forwarded-for") || "";
  const userAgent = headersList.get("user-agent") || "";

  const log = await createChartLog({
    action: "Add allergies",
    status: "pending",
    userAgent,
    ipAddress,
    employeeId: session?.user.empId,
    logDescription: "",
    patientId: validatedValues.data.patientId,
  });

  if (!log) return { error: "Database error. Log not saved!" };

  const encryptedData: z.infer<typeof AllergySchema> = {
    ...validatedValues.data,
    name: encryptData(validatedValues.data.name),
    severity: encryptData(validatedValues.data.severity),
    ...(validatedValues.data.description && {
      description: encryptData(validatedValues.data.description),
    }),
  };

  const allergy = await db.allergies.create({
    data: {
      ...(validatedValues.data && encryptedData),
    },
  });

  if (!allergy) return { error: "Error. allergy not added!" };

  await updateChartLogStatus({
    logId: log.data?.id,
    status: "success",
  });

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
      const decryptedAllergies = allergies.map((allergy) => {
        return {
          ...allergy,
          name: JSON.parse(decryptData(allergy.name)),
          severity: JSON.parse(decryptData(allergy.severity)),
          ...(allergy.description && {
            description: JSON.parse(decryptData(allergy.description)),
          }),
        };
      });
      return { success: "Fetch successful!", data: decryptedAllergies };
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
