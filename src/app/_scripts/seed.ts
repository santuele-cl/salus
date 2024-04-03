import { PrismaClient } from "@prisma/client";
import {
  LAB_CATEGORY_SEED_DATA,
  PROCEDURE_SEED_DATA_FLATTEN,
} from "../_data/tpdh";
import { CLINICAL_DEPT } from "../_data/tpdh/clinical-department";
import { SERVICE_DEPT } from "../_data/tpdh/service-department";
import { EMPLOYEE_ROLES } from "../_data/tpdh/employee-role";
import {
  DRUGS_CATEGORIES,
  DRUG_FORMS,
  SAMPLE_DRUGS,
} from "../_data/tpdh/drugs";
import { SAMPLE_LOGIN_LOGS } from "../_data/tpdh/sample-login-logs";
import { SAMPLE_CHART_LOGS } from "../_data/tpdh/sample-chart-logs";
import { encryptData } from "../_lib/crypto";
import dayjs from "dayjs";

const db = new PrismaClient();

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
      data: LAB_CATEGORY_SEED_DATA,
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

  const EMP_ADMIN_1 = await db.user.upsert({
    where: { id: "U00000001" },
    update: {},
    create: {
      id: "U00000001",
      username: "clyde03",
      email: "lemon256san@gmail.com",
      password: "$2a$10$ib5/DxaL4moUGxl66UXdw.2E5QxVktgSvLy6qAihoBg.Fle3waMhy",
      role: "EMPLOYEE",
      consent: true,
      // emailVerified: dayjs().toDate(),
      profile: {
        create: {
          id: "P00000001",
          isEmployee: true,
          isPatient: false,
          employee: {
            create: {
              id: "P00000001",
              fname: "clyde",
              mname: "arrogante",
              lname: "santuele",
              gender: "MALE",
              bdate: "2000-11-03T10:48:22Z",
              age: 23,
              contactInfo: {
                create: {
                  email: "lemon256san@gmail.com",
                  phone: "09777775346",
                  address: {
                    create: {
                      houseNumber: "43",
                      street: "Abbot",
                      barangay: "Post Proper Southside",
                      city: "Taguig",
                      province: "Metro manila",
                      region: "NCR",
                      country: "Philippines",
                      zipCode: "1207",
                      id: "ADDR00000001",
                    },
                  },
                },
              },
              clinicalDepartmentId: "CD2001",
              serviceDepartmentId: "SD1003",
              employeeRoleId: "R1001",
            },
          },
        },
      },
    },
  });

  const EMP_DOC_1 = await db.user.upsert({
    where: { id: "U00000002" },
    update: {},
    create: {
      id: "U00000002",
      username: "ara03",
      email: "kabi678goo@gmail.com",
      password: "$2a$10$ib5/DxaL4moUGxl66UXdw.2E5QxVktgSvLy6qAihoBg.Fle3waMhy",
      role: "EMPLOYEE",
      consent: true,
      // emailVerified: "2024-03-07T11:08:20.692Z",
      profile: {
        create: {
          id: "P00000002",
          isEmployee: true,
          isPatient: false,
          employee: {
            create: {
              id: "E00000002",
              fname: "ara",
              mname: "zirt",
              lname: "buenaventura",
              gender: "FEMALE",
              bdate: "2023-12-27T10:48:22Z",
              age: 23,
              contactInfo: {
                create: {
                  email: "kabi678goo@gmail.com",
                  phone: "09365497626",
                  address: {
                    create: {
                      houseNumber: "2",
                      street: "aguho",
                      barangay: "comembo",
                      city: "taguig",
                      province: "metro manila",
                      region: "ncr",
                      country: "philippines",
                      zipCode: "4567",
                      id: "ADDR00000002",
                    },
                  },
                },
              },
              clinicalDepartmentId: "CD2001",
              serviceDepartmentId: "SD1003",
              employeeRoleId: "R1002",
            },
          },
        },
      },
    },
  });

  const EMP_NURSE_1 = await db.user.upsert({
    where: { id: "U00000003" },
    update: {},
    create: {
      id: "U00000003",
      username: "francisga2000",
      email: "imba256rubio@gmail.com",
      password: "$2a$10$ib5/DxaL4moUGxl66UXdw.2E5QxVktgSvLy6qAihoBg.Fle3waMhy",
      role: "EMPLOYEE",
      consent: true,
      // emailVerified: dayjs().toDate(),
      profile: {
        create: {
          id: "P00000003",
          isEmployee: true,
          isPatient: false,
          employee: {
            create: {
              id: "E00000003",
              fname: "Francis",
              mname: "Dela Cruz",
              lname: "Ga",
              gender: "MALE",
              bdate: "2002-08-11T10:48:22Z",
              age: 22,
              contactInfo: {
                create: {
                  email: "imba256rubio@gmail.com",
                  phone: "09888888888",
                  address: {
                    create: {
                      houseNumber: "2",
                      street: "Jose Rizal",
                      barangay: "Katuparan",
                      city: "Taguig",
                      province: "Metro manila",
                      region: "NCR",
                      country: "Philippines",
                      zipCode: "4567",
                      id: "ADDR00000003",
                    },
                  },
                },
              },
              clinicalDepartmentId: "CD2001",
              serviceDepartmentId: "SD1003",
              employeeRoleId: "R1003",
            },
          },
        },
      },
    },
  });

  const PATIENT_0 = await db.user.upsert({
    where: { id: "U10000004" },
    update: {},
    create: {
      id: "U10000004",
      username: "ranzel12",
      email: "jeme610walker@gmail.com",
      password: "$2a$10$ib5/DxaL4moUGxl66UXdw.2E5QxVktgSvLy6qAihoBg.Fle3waMhy",
      role: "PATIENT",
      consent: true,
      // emailVerified: "2024-03-07T11:08:20.692Z",
      profile: {
        create: {
          id: "P10000004",
          isEmployee: false,
          isPatient: true,
          patient: {
            create: {
              familyMedicalHistory: {
                createMany: {
                  data: [
                    {
                      condition: encryptData("Cancer"),
                      relationship: encryptData("Sibling"),
                      ageOfOnset: 40,
                    },
                    {
                      condition: encryptData("Hypertension"),
                      relationship: encryptData("Grandparent"),
                      ageOfOnset: 70,
                    },
                  ],
                },
              },
              socialHistory: {
                create: {
                  alcoholUse: "NONE",
                  dietHabits: "BALANCED",
                  drugUse: "NONE",
                  exerciseHabits: "LIGHT",
                  livingConditions: "URBAN",
                  tobaccoUse: "NEVER",
                  occupation: "software engineer",
                },
              },
              id: "PP10000004",
              fname: "Ranzel",
              mname: "Juan",
              lname: "Mongado",
              gender: "MALE",
              age: 21,
              bdate: "2002-12-27T10:48:22Z",
              bplace: "Taguig",
              civilStatus: "SINGLE",
              occupation: "Network engineer",
              contactInfo: {
                create: {
                  id: "C00000004",
                  phone: "09485687241",
                  email: "jeme610walker@gmail.com",
                  address: {
                    create: {
                      id: "ADDR00000004",
                      houseNumber: "1122",
                      street: "Ladia",
                      barangay: "Katuparan",
                      city: "Taguig",
                      region: "NCR",
                      province: "Metro manila",
                      country: "Philippines",
                      zipCode: "1234",
                    },
                  },
                },
              },
              allergies: {
                createMany: {
                  data: [
                    {
                      name: encryptData("Peanut Allergy"),
                      description: encryptData("Allergic reaction to peanuts"),
                      severity: encryptData("HIGH"),
                      dateDiagnosed: "2024-03-01T10:00:00Z",
                    },
                    {
                      name: encryptData("Penicillin Allergy"),
                      description: encryptData(
                        "Allergic reaction to penicillin antibiotics"
                      ),
                      severity: encryptData("MEDIUM"),
                      dateDiagnosed: "2024-03-01T10:00:00Z",
                    },
                    {
                      name: encryptData("Dust Allergy"),
                      description: encryptData(
                        "Allergic reaction to dust mites"
                      ),
                      severity: encryptData("LOW"),
                      dateDiagnosed: "2024-03-01T10:00:00Z",
                    },
                  ],
                },
              },
              visits: {
                create: [
                  {
                    accompaniedBy: "Parent",
                    chiefComplaint: "Fever and Cough",
                    hpi: "Patient has been experiencing fever and cough for the past three days. No improvement with over-the-counter medications.",
                    vitals: {
                      create: {
                        heightInCm: 170,
                        weightInKg: 70,
                        bloodPressure: "120/80",
                        pulseRate: "90",
                        respiratoryRate: "20",
                        bodyTemperatureInCelsius: 38.5,
                        oxygenSaturation: "98%",
                        checkedById: "E00000003",
                      },
                    },
                    physicalExamination: {
                      create: {
                        patientId: "PP10000004",
                        physicalPart: "HEAD_AND_NECK",
                        isNormal: true,
                        remarks: "No abnormalities observed.",
                      },
                    },
                    diagnosis: {
                      create: {
                        patientId: "PP10000004",
                        condition: encryptData(
                          "Upper Respiratory Tract Infection"
                        ),
                        diagnosisDate: "2024-03-01T10:00:00Z",
                        treatment: encryptData(
                          "Prescribed antibiotics and rest."
                        ),
                        physicianId: "E00000002",
                      },
                    },
                    prescriptions: {
                      create: {
                        patientId: "PP10000004",
                        dosage: encryptData("500"),
                        frequencyPerDay: encryptData("3"),
                        takenEveryHour: encryptData("8"),
                        durationInDays: encryptData("7"),
                        notes: encryptData("Take with food."),
                        physicianId: "E00000002",
                        drugsId: "DR100000001",
                        startDate: "2024-03-01T10:00:00Z",
                        endDate: "2024-03-01T10:00:00Z",
                      },
                    },
                    laboratoryRequest: {
                      create: {
                        id: "1bea286b-6ee1-42b7-8895-64683305ac43",
                        patientId: "PP10000004",
                        labProcedureId: "LP2100001",
                        requestingPhysicianId: "E00000002",
                        LaboratoryResults: {
                          create: {
                            patientId: "PP10000004",
                            testDate: "2024-03-07T11:04:27.869Z",
                            testName: "Fecalysis Test A",
                            testResults: {
                              create: {
                                parameter: "PARAMS",
                                unit: "UNIT",
                                value: "VAL",
                                referenceRange: "REF",
                              },
                            },
                          },
                        },
                      },
                    },
                    serviceDepartmentId: "SD1003",
                  },
                  {
                    accompaniedBy: "Spouse",
                    chiefComplaint: "Abdominal Pain",
                    hpi: "Patient presents with severe abdominal pain localized to the right lower quadrant. Pain started two days ago and has been progressively worsening.",
                    vitals: {
                      create: {
                        heightInCm: 165,
                        weightInKg: 60,
                        bloodPressure: "110/70",
                        pulseRate: "80",
                        respiratoryRate: "18",
                        bodyTemperatureInCelsius: 37.0,
                        oxygenSaturation: "99%",
                        checkedById: "E00000003",
                      },
                    },
                    physicalExamination: {
                      create: {
                        patientId: "PP10000004",
                        physicalPart: "ABDOMEN",
                        isNormal: false,
                        remarks: "Tenderness in the right lower quadrant.",
                      },
                    },
                    diagnosis: {
                      create: {
                        patientId: "PP10000004",
                        condition: encryptData("Appendicitis"),
                        diagnosisDate: "2024-03-01T11:30:00Z",
                        treatment: encryptData("Emergency surgery required."),
                        physicianId: "E00000002",
                      },
                    },
                    prescriptions: {
                      create: {
                        patientId: "PP10000004",
                        dosage: encryptData("10"),
                        frequencyPerDay: encryptData("1"),
                        takenEveryHour: encryptData("24"),
                        durationInDays: encryptData("1"),
                        notes: encryptData("Pain relief for surgery."),
                        physicianId: "E00000002",
                        drugsId: "DR100000001",
                        startDate: "2024-03-01T10:00:00Z",
                        endDate: "2024-03-01T10:00:00Z",
                      },
                    },
                    laboratoryRequest: {
                      create: {
                        id: "1bea286b-6ee1-42b7-8895-64683305ac44",
                        patientId: "PP10000004",
                        labProcedureId: "LP2100001",
                        requestingPhysicianId: "E00000002",
                        LaboratoryResults: {
                          create: {
                            patientId: "PP10000004",
                            testDate: "2024-03-07T11:04:27.869Z",
                            testName: "Fecalysis Test A",
                            testResults: {
                              create: {
                                parameter: "PARAMS",
                                unit: "UNIT",
                                value: "VAL",
                                referenceRange: "REF",
                              },
                            },
                          },
                        },
                      },
                    },
                    serviceDepartmentId: "SD1003",
                  },
                  {
                    accompaniedBy: "Sibling",
                    chiefComplaint: "Sore Throat",
                    hpi: "Patient complains of a sore throat with difficulty swallowing. No fever or cough reported.",
                    vitals: {
                      create: {
                        heightInCm: 175,
                        weightInKg: 65,
                        bloodPressure: "115/75",
                        pulseRate: "75",
                        respiratoryRate: "16",
                        bodyTemperatureInCelsius: 36.5,
                        oxygenSaturation: "97%",
                        checkedById: "E00000003",
                      },
                    },
                    physicalExamination: {
                      create: {
                        patientId: "PP10000004",
                        physicalPart: "MOUTH_AND_THROAT",
                        isNormal: true,
                        remarks:
                          "Mild inflammation, likely due to viral infection.",
                      },
                    },
                    diagnosis: {
                      create: {
                        patientId: "PP10000004",
                        condition: encryptData("Pharyngitis"),
                        diagnosisDate: "2024-03-01T13:45:00Z",
                        treatment: encryptData(
                          "Prescribed analgesics and throat lozenges."
                        ),
                        physicianId: "E00000002",
                      },
                    },
                    prescriptions: {
                      create: {
                        patientId: "PP10000004",
                        dosage: encryptData("500"),
                        frequencyPerDay: encryptData("3"),
                        takenEveryHour: encryptData("8"),
                        durationInDays: encryptData("5"),
                        notes: encryptData("For relief of sore throat pain."),
                        physicianId: "E00000002",
                        drugsId: "DR100000001",
                        startDate: "2024-03-01T10:00:00Z",
                        endDate: "2024-03-01T10:00:00Z",
                      },
                    },
                    laboratoryRequest: {
                      create: {
                        id: "1bea286b-6ee1-42b7-8895-64683305ac45",
                        patientId: "PP10000004",
                        labProcedureId: "LP2100001",
                        requestingPhysicianId: "E00000002",
                        LaboratoryResults: {
                          create: {
                            patientId: "PP10000004",
                            testDate: "2024-03-07T11:04:27.869Z",
                            testName: "Fecalysis Test A",
                            testResults: {
                              create: {
                                parameter: "PARAMS",
                                unit: "UNIT",
                                value: "VAL",
                                referenceRange: "REF",
                              },
                            },
                          },
                        },
                      },
                    },
                    serviceDepartmentId: "SD1003",
                  },
                ],
              },
            },
          },
        },
      },
    },
  });

  const PATIENT_1 = await db.user.upsert({
    where: { id: "U10000005" },
    update: {},
    create: {
      id: "U10000005",
      username: "ara03",
      email: "shaya098walker@gmail.com",
      password: "$2a$10$ib5/DxaL4moUGxl66UXdw.2E5QxVktgSvLy6qAihoBg.Fle3waMhy",
      role: "PATIENT",
      consent: true,
      // emailVerified: "2024-03-07T11:08:20.692Z",
      profile: {
        create: {
          id: "P10000005",
          isEmployee: false,
          isPatient: true,
          patient: {
            create: {
              familyMedicalHistory: {
                createMany: {
                  data: [
                    {
                      condition: "Diabetes",
                      relationship: "Mother",
                      ageOfOnset: 50,
                    },
                    {
                      condition: "Heart Disease",
                      relationship: "Father",
                      ageOfOnset: 55,
                    },
                  ],
                },
              },
              socialHistory: {
                create: {
                  alcoholUse: "NONE",
                  dietHabits: "BALANCED",
                  drugUse: "NONE",
                  exerciseHabits: "LIGHT",
                  livingConditions: "URBAN",
                  tobaccoUse: "NEVER",
                  occupation: "software engineer",
                },
              },
              id: "PP10000005",
              fname: "Dave",
              mname: "buenaventura",
              lname: "Mendoza",
              gender: "MALE",
              age: 22,
              bdate: "2023-03-22T10:48:22Z",
              bplace: "taguig",
              civilStatus: "SINGLE",
              occupation: "Network Engineer",
              contactInfo: {
                create: {
                  id: "C00000005",
                  phone: "09463258713",
                  email: "shaya098walker@gmail.com",
                  address: {
                    create: {
                      id: "ADDR00000005",
                      houseNumber: "1",
                      street: "Bonifacio",
                      barangay: "hagonoy",
                      city: "taguig",
                      region: "ncr",
                      province: "metro manila",
                      country: "philippines",
                      zipCode: "1204",
                    },
                  },
                },
              },
              allergies: {
                createMany: {
                  data: [
                    {
                      name: encryptData("Peanut Allergy"),
                      description: encryptData("Allergic reaction to peanuts"),
                      severity: encryptData("HIGH"),
                      dateDiagnosed: "2024-03-01T10:00:00Z",
                    },
                    {
                      name: encryptData("Penicillin Allergy"),
                      description: encryptData(
                        "Allergic reaction to penicillin antibiotics"
                      ),
                      severity: encryptData("MEDIUM"),
                      dateDiagnosed: "2024-03-01T10:00:00Z",
                    },
                    {
                      name: encryptData("Dust Allergy"),
                      description: encryptData(
                        "Allergic reaction to dust mites"
                      ),
                      severity: encryptData("LOW"),
                      dateDiagnosed: "2024-03-01T10:00:00Z",
                    },
                  ],
                },
              },
              visits: {
                create: [
                  {
                    accompaniedBy: "Parent",
                    chiefComplaint: "Fever and Cough",
                    hpi: "Patient has been experiencing fever and cough for the past three days. No improvement with over-the-counter medications.",
                    vitals: {
                      create: {
                        heightInCm: 170,
                        weightInKg: 70,
                        bloodPressure: "120/80",
                        pulseRate: "90",
                        respiratoryRate: "20",
                        bodyTemperatureInCelsius: 38.5,
                        oxygenSaturation: "98%",
                        checkedById: "E00000003",
                      },
                    },
                    physicalExamination: {
                      create: {
                        patientId: "PP10000005",
                        physicalPart: "HEAD_AND_NECK",
                        isNormal: true,
                        remarks: "No abnormalities observed.",
                      },
                    },
                    diagnosis: {
                      create: {
                        patientId: "PP10000005",
                        condition: encryptData(
                          "Upper Respiratory Tract Infection"
                        ),
                        diagnosisDate: "2024-03-01T10:00:00Z",
                        treatment: encryptData(
                          "Prescribed antibiotics and rest."
                        ),
                        physicianId: "E00000002",
                      },
                    },
                    prescriptions: {
                      create: {
                        patientId: "PP10000005",
                        dosage: encryptData("500"),
                        frequencyPerDay: encryptData("3"),
                        takenEveryHour: encryptData("8"),
                        durationInDays: encryptData("7"),
                        notes: encryptData("Take with food."),
                        physicianId: "E00000002",
                        drugsId: "DR100000001",
                        startDate: "2024-03-01T10:00:00Z",
                        endDate: "2024-03-01T10:00:00Z",
                      },
                    },
                    laboratoryRequest: {
                      create: {
                        id: "1bea286b-6ee1-42b7-8895-64683305ac46",
                        patientId: "PP10000005",
                        labProcedureId: "LP2100001",
                        requestingPhysicianId: "E00000002",
                        LaboratoryResults: {
                          create: {
                            patientId: "PP10000005",
                            testDate: "2024-03-07T11:04:27.869Z",
                            testName: "Fecalysis Test A",
                            testResults: {
                              create: {
                                parameter: "PARAMS",
                                unit: "UNIT",
                                value: "VAL",
                                referenceRange: "REF",
                              },
                            },
                          },
                        },
                      },
                    },
                    serviceDepartmentId: "SD1003",
                  },
                  {
                    accompaniedBy: "Spouse",
                    chiefComplaint: "Abdominal Pain",
                    hpi: "Patient presents with severe abdominal pain localized to the right lower quadrant. Pain started two days ago and has been progressively worsening.",
                    vitals: {
                      create: {
                        heightInCm: 165,
                        weightInKg: 60,
                        bloodPressure: "110/70",
                        pulseRate: "80",
                        respiratoryRate: "18",
                        bodyTemperatureInCelsius: 37.0,
                        oxygenSaturation: "99%",
                        checkedById: "E00000003",
                      },
                    },
                    physicalExamination: {
                      create: {
                        patientId: "PP10000005",
                        physicalPart: "ABDOMEN",
                        isNormal: false,
                        remarks: "Tenderness in the right lower quadrant.",
                      },
                    },
                    diagnosis: {
                      create: {
                        patientId: "PP10000005",
                        condition: encryptData("Appendicitis"),
                        diagnosisDate: "2024-03-01T11:30:00Z",
                        treatment: encryptData("Emergency surgery required."),
                        physicianId: "E00000002",
                      },
                    },
                    prescriptions: {
                      create: {
                        patientId: "PP10000005",
                        dosage: encryptData("10"),
                        frequencyPerDay: encryptData("1"),
                        takenEveryHour: encryptData("24"),
                        durationInDays: encryptData("1"),
                        notes: encryptData("Pain relief for surgery."),
                        physicianId: "E00000002",
                        drugsId: "DR100000001",
                        startDate: "2024-03-01T10:00:00Z",
                        endDate: "2024-03-01T10:00:00Z",
                      },
                    },
                    laboratoryRequest: {
                      create: {
                        id: "1bea286b-6ee1-42b7-8895-64683305ac47",
                        patientId: "PP10000005",
                        labProcedureId: "LP2100001",
                        requestingPhysicianId: "E00000002",
                        LaboratoryResults: {
                          create: {
                            patientId: "PP10000005",
                            testDate: "2024-03-07T11:04:27.869Z",
                            testName: "Fecalysis Test A",
                            testResults: {
                              create: {
                                parameter: "PARAMS",
                                unit: "UNIT",
                                value: "VAL",
                                referenceRange: "REF",
                              },
                            },
                          },
                        },
                      },
                    },
                    serviceDepartmentId: "SD1003",
                  },
                  {
                    accompaniedBy: "Sibling",
                    chiefComplaint: "Sore Throat",
                    hpi: "Patient complains of a sore throat with difficulty swallowing. No fever or cough reported.",
                    vitals: {
                      create: {
                        heightInCm: 175,
                        weightInKg: 65,
                        bloodPressure: "115/75",
                        pulseRate: "75",
                        respiratoryRate: "16",
                        bodyTemperatureInCelsius: 36.5,
                        oxygenSaturation: "97%",
                        checkedById: "E00000003",
                      },
                    },
                    physicalExamination: {
                      create: {
                        patientId: "PP10000005",
                        physicalPart: "MOUTH_AND_THROAT",
                        isNormal: true,
                        remarks:
                          "Mild inflammation, likely due to viral infection.",
                      },
                    },
                    diagnosis: {
                      create: {
                        patientId: "PP10000005",
                        condition: encryptData("Pharyngitis"),
                        diagnosisDate: "2024-03-01T13:45:00Z",
                        treatment: encryptData(
                          "Prescribed analgesics and throat lozenges."
                        ),
                        physicianId: "E00000002",
                      },
                    },
                    prescriptions: {
                      create: {
                        patientId: "PP10000005",
                        dosage: encryptData("500"),
                        frequencyPerDay: encryptData("3"),
                        takenEveryHour: encryptData("8"),
                        durationInDays: encryptData("5"),
                        notes: encryptData("For relief of sore throat pain."),
                        physicianId: "E00000002",
                        drugsId: "DR100000001",
                        startDate: "2024-03-01T10:00:00Z",
                        endDate: "2024-03-01T10:00:00Z",
                      },
                    },
                    laboratoryRequest: {
                      create: {
                        id: "1bea286b-6ee1-42b7-8895-64683305ac48",
                        patientId: "PP10000005",
                        labProcedureId: "LP2100001",
                        requestingPhysicianId: "E00000002",
                        LaboratoryResults: {
                          create: {
                            patientId: "PP10000005",
                            testDate: "2024-03-07T11:04:27.869Z",
                            testName: "Fecalysis Test A",
                            testResults: {
                              create: {
                                parameter: "PARAMS",
                                unit: "UNIT",
                                value: "VAL",
                                referenceRange: "REF",
                              },
                            },
                          },
                        },
                      },
                    },
                    serviceDepartmentId: "SD1003",
                  },
                ],
              },
            },
          },
        },
      },
    },
  });

  const APPOINTMENTS = await db.appointments.createMany({
    data: [
      {
        id: "APP10000001",
        patientId: "PP10000004",
        title: "Checkup",
        status: "SCHEDULED",
        reason: "reason",
        room: "123",
        employeeId: "E00000002",
        endDate: new Date(2024, 2, 15, 12, 0, 0),
        startDate: new Date(2024, 2, 15, 11, 0, 0),
      },
      {
        id: "APP10000002",
        patientId: "PP10000005",
        title: "Checkup",
        status: "SCHEDULED",
        reason: "reason",
        room: "123",
        employeeId: "E00000002",
        endDate: new Date(2024, 2, 15, 16, 30, 0),
        startDate: new Date(2024, 2, 15, 14, 0, 0),
      },
    ],
  });

  const SEEDED_CHART_LOGS = await db.chartLogs.createMany({
    data: SAMPLE_CHART_LOGS,
  });

  const SEEDED_LOGIN_LOGS = await db.loginLogs.createMany({
    data: SAMPLE_LOGIN_LOGS,
  });
};

seed()
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
