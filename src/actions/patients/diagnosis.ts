"use server";

import { db } from "@/app/_lib/db";
import { DiagnosisSchema } from "@/app/_schemas/zod/schema";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

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

  return { success: "Diagnoses found!", data: diagnoses };
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

    return { success: "Diagnosis found!", data: diagnosis };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function addDiagnosis(values: z.infer<typeof DiagnosisSchema>) {
  const parsedValues = DiagnosisSchema.safeParse(values);

  if (!parsedValues.success) return { error: "Parse error!" };

  const diagnosis = await db.diagnosis.create({
    data: {
      ...(parsedValues.data && parsedValues.data),
    },
  });

  if (!diagnosis) return { error: "Error. Diagnosis not added!" };

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
      return { success: "Fetch successful!", data: diagnoses };
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
