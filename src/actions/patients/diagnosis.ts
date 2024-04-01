"use server";

import { db } from "@/app/_lib/db";
import { DiagnosisSchema } from "@/app/_schemas/zod/schema";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { z } from "zod";
import { createChartLog, updateChartLogStatus } from "../logs/chart-logs";
import { headers } from "next/headers";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";
import dayjs from "dayjs";
import { decryptData, encryptData } from "@/app/_lib/crypto";

const writeAllowed = ["PHYSICIAN"];
const getAllowed = [];

export async function getDiagnosesByPatientId(patientId: string) {
  noStore();
  const diagnoses = await db.diagnosis.findMany({
    where: { patientId },
    include: {
      physician: {
        select: {
          fname: true,
          lname: true,
          employeeRole: {
            select: {
              roleName: true,
            },
          },
        },
      },
    },
  });

  if (!diagnoses) return { error: "No diagnoses found!" };

  const decryptedDiagnoses = diagnoses.map((item) => {
    return {
      ...item,
      condition: JSON.parse(decryptData(item.condition)),
      treatment: JSON.parse(decryptData(item.treatment)),
    };
  });

  return { success: "Diagnoses found!", data: decryptedDiagnoses };
}

export async function getDiagnosisByDiagnosisId(diagnosisId: string) {
  noStore();
  try {
    const diagnosis = await db.diagnosis.findUnique({
      where: { id: diagnosisId },
      include: {
        physician: {
          select: {
            professionalInfo: true,
            fname: true,
            mname: true,
            lname: true,
            employeeRole: {
              select: { roleName: true },
            },
            clinicalDepartment: {
              select: {
                name: true,
              },
            },
            contactInfo: {
              select: {
                phone: true,
                address: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!diagnosis) return { error: "No diagnosis data found!" };

    const decryptedDiagnosis = {
      ...diagnosis,
      condition: JSON.parse(decryptData(diagnosis.condition)),
      treatment: JSON.parse(decryptData(diagnosis.treatment)),
    };
    return { success: "Diagnosis found!", data: decryptedDiagnosis };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function addDiagnosis(values: z.infer<typeof DiagnosisSchema>) {
  const session = await auth();

  if (
    !session ||
    !session.user.empRole ||
    !writeAllowed.includes(session.user.empRole)
  )
    return { error: "Unauthorized!" };

  const parsedValues = DiagnosisSchema.safeParse(values);

  if (!parsedValues.success) return { error: "Parse error!" };

  const headersList = headers();
  const ipAddress = headersList.get("x-forwarded-for") || "";
  const userAgent = headersList.get("user-agent") || "";

  const log = await createChartLog({
    action: "Add diagnosis",
    status: "pending",
    userAgent,
    ipAddress,
    employeeId: session?.user.empId,
    logDescription: "",
    patientId: parsedValues.data.patientId,
  });

  if (!log) return { error: "Database error. Log not saved!" };

  const encryptedData: z.infer<typeof DiagnosisSchema> = {
    ...parsedValues.data,
    condition: encryptData(parsedValues.data.condition),
    treatment: encryptData(parsedValues.data.treatment),
  };

  const diagnosis = await db.diagnosis.create({
    data: {
      ...(parsedValues.data && encryptedData),
    },
  });

  if (!diagnosis) {
    await updateChartLogStatus({
      logId: log.data?.id,
      status: "failed",
    });

    return { error: "Error. Diagnosis not added!" };
  }

  await updateChartLogStatus({
    logId: log.data?.id,
    status: "success",
  });

  // TODO: Use revalidate tag to refresh diagnosis data
  return { success: "Diagnosis added!", data: diagnosis };
}

export async function findDiagnosesByTermAndPatientId(
  term?: string,
  patientId?: string
) {
  noStore();

  if (!term) return { error: "No data found!" };

  try {
    const diagnoses = await db.diagnosis.findMany({
      where: {
        ...(patientId && { patientId }),
        OR: [
          { id: { contains: term, mode: "insensitive" } },
          {
            condition: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        physician: {
          select: {
            fname: true,
            lname: true,
            employeeRole: {
              select: {
                roleName: true,
              },
            },
          },
        },
      },
    });

    if (!diagnoses || diagnoses.length < 1) {
      return { error: "No diagnoses found!" };
    } else {
      const decryptedDiagnoses = diagnoses.map((diagnosis) => {
        return {
          ...diagnosis,
          condition: JSON.parse(decryptData(diagnosis.condition)),
          treatment: JSON.parse(decryptData(diagnosis.treatment)),
        };
      });
      return { success: "Fetch successful!", data: diagnoses };
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
