"use server";

import { db } from "@/app/_lib/db";
import { Patient } from "@prisma/client";

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
    // console.log(patient);
    if (!patient || patient.length < 1) {
      return { error: "No patient found!" };
    } else {
      return { success: "Patient found!", data: patient };
    }
  } catch (error) {
    // console.log(error);
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

export async function getTotalPatientsCount() {
  try {
    const count = await db.patient.count();
    return { success: "Success!", data: count };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
}

export async function getPatientsIds() {
  try {
    const ids = await db.patient.findMany({select: {id: true,fname: true, lname: true}})
    if(!ids || ids.length < 1) return {error: "No patients found!"}
    return {success: "Fetch successful!", data: ids}
  } catch (error) {
    return { error: "An errors has occured. Fetch unsuccessful!"}
  }
}