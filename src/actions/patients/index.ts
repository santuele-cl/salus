"use server";

import { db } from "@/app/_lib/db";

export async function findPatient(term: string) {
  if (!term) return { error: "No search term found!" };

  try {
    const patient = await db.patient.findMany({
      where: {
        OR: [
          { id: { contains: term, mode: "insensitive" } },
          {
            fname: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            mname: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            lname: {
              contains: term,
            },
          },
        ],
      },
    });
    console.log(patient);
    if (!patient || patient.length < 1) {
      return { error: "No patient found!" };
    } else {
      return { success: "Patient found!", data: patient };
    }
  } catch (error) {
    console.log(error);
    return { error: "Patient not found!" };
  }
}

export async function getPatientByid(id: string) {
  if (!id) return { error: "Missing ID!" };

  const patient = await db.patient.findUnique({
    where: { id },
    include: { contactInfo: true },
  });

  if (!patient) return { error: "Patient not found!" };

  return { success: "Patient data fetched!", data: patient };
}