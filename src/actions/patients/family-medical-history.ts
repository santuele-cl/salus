"use server";

import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/app/_lib/db";
import { z } from "zod";
import { FamilyMedicalHistorySchema } from "@/app/_schemas/zod/schema";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { createChartLog, updateChartLogStatus } from "../logs/chart-logs";
import { decryptData, encryptData } from "@/app/_lib/crypto";

const writeAllowed = ["PHYSICIAN", "NURSE"];
const getAllowed = [];

export async function getFamilyMedicalHistoriesByPatientID(patientId: string) {
  noStore();
  try {
    const familyMedicalHistories = await db.familyMedicalHistory.findMany({
      where: { patientId },
    });

    if (!familyMedicalHistories)
      return { error: "No family medical histories found!" };

      const decryptedFamilyMedicalHistories = familyMedicalHistories.map((familyMedicalHistories) => {
        return {
          ...familyMedicalHistories,
          condition: JSON.parse(decryptData(familyMedicalHistories.condition)),
          relationship: JSON.parse(decryptData(familyMedicalHistories.relationship)),
          }
      });
  
      return { success: " found!", data: decryptedFamilyMedicalHistories };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
}

export async function getFamilyMedicalHistoryByFamilyMedicalHistoryId(
  familyMedicalHistoryId: string
) {
  if (!familyMedicalHistoryId) return { error: "Missing ID!" };

  try {
    const familyMedicalHistory = await db.familyMedicalHistory.findUnique({
      where: { id: familyMedicalHistoryId },
    });

    if (!familyMedicalHistory)
      return { error: "Missing family medical history!" };

    return {
      success: "Family edical history found!",
      data: familyMedicalHistory,
    };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function findFamilyMedicalHistoryByTermAndPatientId(
  term?: string,
  patientId?: string
) {
  noStore();

  if (!term) return { error: "No data found!" };

  try {
    const familyMedicalHistories = await db.familyMedicalHistory.findMany({
      where: {
        ...(patientId && { patientId }),
        OR: [
          { id: { contains: term, mode: "insensitive" } },
          { condition: { contains: term, mode: "insensitive" } },
          { relationship: { contains: term, mode: "insensitive" } },
        ],
      },
    });

    if (!familyMedicalHistories || familyMedicalHistories.length < 1) {
      return { error: "No data found!" };
    } else {
      return { success: "Fetch successful!", data: familyMedicalHistories };
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function addFamilyMedicalHistory(
  values: z.infer<typeof FamilyMedicalHistorySchema>
) {
  const session = await auth();

  if (
    !session ||
    !session.user.empRole ||
    !writeAllowed.includes(session.user.empRole)
  )
    return { error: "Unauthorized" };

  const validatedValues = FamilyMedicalHistorySchema.safeParse(values);

  if (!validatedValues.success) return { error: "Parse error!" };

  const headersList = headers();
  const ipAddress = headersList.get("x-forwarded-for") || "";
  const userAgent = headersList.get("user-agent") || "";

  const log = await createChartLog({
    action: "Add family medical history",
    status: "pending",
    userAgent,
    ipAddress,
    employeeId: session?.user.empId,
    logDescription: "",
    patientId: validatedValues.data.patientId,
  });

  if (!log) return { error: "Database error Log not saved!" };

  const encryptedData: z.infer<typeof FamilyMedicalHistorySchema> = {
    ...validatedValues.data,
    condition: encryptData(validatedValues.data.condition),
    relationship: encryptData(validatedValues.data.relationship),
  };

  const familyMedicalHistory = await db.familyMedicalHistory.create({
    data: {
      ...(validatedValues.data && encryptedData),
    },
  });

  if (!familyMedicalHistory) {
    await updateChartLogStatus({
      logId: log.data?.id,
      status: "failed",
    });

    return { error: "Error. Family Medical History not added!" };
  }

  await updateChartLogStatus({
    logId: log.data?.id,
    status: "success",
  });

  return { success: "Family medical data added!", data: familyMedicalHistory };
}
