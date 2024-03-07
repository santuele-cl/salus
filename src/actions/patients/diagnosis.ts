"use server";

import { db } from "@/app/_lib/db";
import { unstable_noStore as noStore } from "next/cache";

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
