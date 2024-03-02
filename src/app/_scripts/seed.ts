// import db f
import { db } from "@/app/_lib/db";
import { CATEGORY_SEED_DATA, PROCEDURE_SEED_DATA_FLATTEN } from "../_data/tpdh";
import { CLINICAL_DEPT } from "../_data/tpdh/clinical-department";
import { SERVICE_DEPT } from "../_data/tpdh/service-department";
import { EMPLOYEE_ROLES } from "../_data/tpdh/employee-role";
import {
  DRUGS_CATEGORIES,
  DRUG_FORMS,
  SAMPLE_DRUGS,
} from "../_data/tpdh/drugs";

const seed = async () => {
  const SEEDED_EMP_ROLES = await db.employeeRole.createMany({
    data: EMPLOYEE_ROLES,
  });

  const SEEDED_SERVICE_DEPT = await db.serviceDepartment.createMany({
    data: SERVICE_DEPT,
  });

  const SEEDED_CLINICAL_DEPT = await db.clinicalDepartment.createMany({
    data: CLINICAL_DEPT,
  });

  const SEEDED_LAB_PROCEDURES_CAT =
    await db.laboratoryProcedureCategory.createMany({
      data: CATEGORY_SEED_DATA,
    });

  const SEEDED_LAB_PROCEDURES = await db.laboratoryProcedures.createMany({
    data: PROCEDURE_SEED_DATA_FLATTEN,
  });

  const SEEDED_DRUG_CATEGORIES = await db.drugCategory.createMany({
    data: DRUGS_CATEGORIES,
  });

  const SEEDED_DRUG_FORMS = await db.drugForm.createMany({
    data: DRUG_FORMS,
  });

  const SEEDED_DRUGS = await db.drugs.createMany({
    data: SAMPLE_DRUGS,
  });

  // const PATIENT_0 = await db.user.create({
  //   data: {
  //     id: "emp1",
  //     username: "clyde03",
  //     email: "lemon256san@gmail.com",
  //     password: "password123",
  //     role: "PATIENT",
  //     consent: true,
  //     profile: {
  //       create: {
  //         id: "profile1",
  //         patient: {
  //           create: {
  //             id: "patient1",
  //             fname: "clyde",
  //             mname: "arrogante",
  //             lname: "santuele",
  //             gender: "male",
  //             age: 23,
  //             bdate: "2023-12-27T10:48:22Z",
  //             bplace: "makati",
  //             civilStatus: "takens",
  //             prescriptions: {
  //               create: {
  //                 id: "prescription1",
  //                 drugName: "Amoxicillin",
  //                 strength: "?",
  //                 form: "tablet",
  //                 dosage: "500mg",
  //                 frequencyPerDay: 3,
  //                 takenEveryHour: 8,
  //                 durationInDays: 7,
  //                 notes: "none",
  //               },
  //             },
  //             allergies: {
  //               create: {
  //                 id: "allergies1",
  //                 name: "bee",
  //                 description: "aklsdjf",
  //                 severity: "severe",
  //               },
  //             },
  //             contactInfo: {
  //               create: {
  //                 id: "contactinfo1",
  //                 phone: "09999999999",
  //                 email: "lemon256san@gmail.com",
  //                 address: {
  //                   create: {
  //                     id: "address1",
  //                     houseNumber: "1",
  //                     street: "seagull",
  //                     barangay: "rizal",
  //                     city: "taguig",
  //                     region: "ncr",
  //                     province: "metro manila",
  //                     country: "philippines",
  //                     zipCode: "1234",
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
};

seed()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
