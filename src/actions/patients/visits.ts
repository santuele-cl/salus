"use server";

import { decryptData } from "@/app/_lib/crypto";
import { db } from "@/app/_lib/db";
import { VisitSchema } from "@/app/_schemas/zod/schema";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

export async function getVisitsByProfileId(profileId: string) {
  noStore();
  const visit = await db.patient.findUnique({
    where: { id: profileId },
    select: { id: true, visits: true },
  });

  if (!visit) return { error: "No visits found!" };

  return { success: "Visits found!", data: visit };
}

export async function getVisityByVisitId(visitId: string) {
  noStore();
  try {
    const visit = await db.visit.findUnique({
      where: { id: visitId },
      include: {
        patient: true,
        vitals: { include: { checkedBy: true } },
        diagnosis: {
          include: {
            physician: true,
          },
        },
        prescriptions: {
          include: { drugs: true, physician: true },
        },
        laboratoryRequest: {
          include: {
            laboratoryProcedure: true,
            requestingPhysician: {
              include: {
                profile: {
                  select: {
                    employee: {
                      select: {
                        fname: true,
                        lname: true,
                        employeeRole: { select: { roleName: true } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        physicalExamination: true,
        serviceDepartment: true,
      },
    });

    if (!visit) return { error: "Visit not found!" };

    const decryptVisit = {
      ...visit,
      prescriptions: visit.prescriptions.map((item) => ({
        ...item,
        dosage: JSON.parse(decryptData(item.dosage)),
        frequencyPerDay: JSON.parse(decryptData(item.frequencyPerDay)),
        takenEveryHour: JSON.parse(decryptData(item.takenEveryHour)),
        durationInDays: JSON.parse(decryptData(item.durationInDays)),
        notes: JSON.parse(decryptData(item.notes)),
      })),
      diagnosis: visit.diagnosis.map((item) => ({
        ...item,
        condition: JSON.parse(decryptData(item.condition)),
        treatment: JSON.parse(decryptData(item.treatment)),
      })),
    };
    return { success: "Visit found!", data: decryptVisit };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function createVisit(
  patientId: string,
  values: z.infer<typeof VisitSchema>
) {
  const validatedFields = VisitSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid data!" };

  const { hpi, accompaniedBy, chiefComplaint } = validatedFields.data;

  const visit = await db.visit.create({
    data: {
      patientId,
      hpi,
      chiefComplaint,
      accompaniedBy,
    },
  });

  if (!visit) return { error: "An error has occured. Visit data not added!" };

  return { success: "Visit data has added!", data: visit };
}
