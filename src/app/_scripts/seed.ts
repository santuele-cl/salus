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

  const EMP_DOC_1 = await db.user.upsert({
    where: { id: "USER2" },
    update: {},
    create: {
      id: "USER2",
      username: "ara03",
      email: "kabi678goo@gmail.com",
      password: "$2a$10$ib5/DxaL4moUGxl66UXdw.2E5QxVktgSvLy6qAihoBg.Fle3waMhy",
      role: "EMPLOYEE",
      consent: true,
      emailVerified: "2024-03-07T11:08:20.692Z",
      profile: {
        create: {
          id: "PROFILE2",
          isEmployee: true,
          isPatient: false,
          employee: {
            create: {
              id: "EMP1",
              fname: "ara",
              mname: "zirt",
              lname: "buenaventura",
              gender: "FEMALE",
              bdate: "2023-12-27T10:48:22Z",
              age: 23,
              contactInfo: {
                create: {
                  email: "kabi678goo@gmail.com",
                  phone: "09888888888",
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
                      id: "ADDR2",
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

  const PATIENT_0 = await db.user.upsert({
    where: { id: "USER1" },
    update: {},
    create: {
      id: "USER1",
      username: "clyde03",
      email: "lemon256san@gmail.com",
      password: "$2a$10$ib5/DxaL4moUGxl66UXdw.2E5QxVktgSvLy6qAihoBg.Fle3waMhy",
      role: "PATIENT",
      consent: true,
      emailVerified: "2024-03-07T11:08:20.692Z",
      profile: {
        create: {
          id: "PROFILE1",
          isEmployee: false,
          isPatient: true,
          patient: {
            create: {
              familyMedicalHistory: {
                createMany: {
                  data: [
                    {
                      condition: "Cancer",
                      relationship: "Sibling",
                      ageOfOnset: 40,
                    },
                    {
                      condition: "Hypertension",
                      relationship: "Grandparent",
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
              id: "PATIENT2",
              fname: "clyde",
              mname: "arrogante",
              lname: "santuele",
              gender: "MALE",
              age: 23,
              bdate: "2023-12-27T10:48:22Z",
              bplace: "makati",
              civilStatus: "SINGLE",
              occupation: "Software engineer",
              contactInfo: {
                create: {
                  id: "CONTACT1",
                  phone: "09999999999",
                  email: "lemon256san@gmail.com",
                  address: {
                    create: {
                      id: "ADDR1",
                      houseNumber: "1",
                      street: "seagull",
                      barangay: "rizal",
                      city: "taguig",
                      region: "ncr",
                      province: "metro manila",
                      country: "philippines",
                      zipCode: "1234",
                    },
                  },
                },
              },
              allergies: {
                createMany: {
                  data: [
                    {
                      name: "Peanut Allergy",
                      description: "Allergic reaction to peanuts",
                      severity: "HIGH",
                      dateDiagnosed: "2024-03-01T10:00:00Z",
                    },
                    {
                      name: "Penicillin Allergy",
                      description:
                        "Allergic reaction to penicillin antibiotics",
                      severity: "MEDIUM",
                      dateDiagnosed: "2024-03-01T10:00:00Z",
                    },
                    {
                      name: "Dust Allergy",
                      description: "Allergic reaction to dust mites",
                      severity: "LOW",
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
                        checkedById: "EMP1",
                      },
                    },
                    physicalExamination: {
                      create: {
                        patientId: "PATIENT2",
                        physicalPart: "HEAD_AND_NECK",
                        isNormal: true,
                        remarks: "No abnormalities observed.",
                      },
                    },
                    diagnosis: {
                      create: {
                        patientId: "PATIENT2",
                        condition: "Upper Respiratory Tract Infection",
                        diagnosisDate: "2024-03-01T10:00:00Z",
                        treatment: "Prescribed antibiotics and rest.",
                        physicianId: "EMP1",
                      },
                    },
                    prescriptions: {
                      create: {
                        patientId: "PATIENT2",
                        dosage: 500,
                        frequencyPerDay: 3,
                        durationInDays: 7,
                        notes: "Take with food.",
                        physicianId: "EMP1",
                        drugsId: "DR100000001",
                        startDate: "2024-03-01T10:00:00Z",
                        endDate: "2024-03-01T10:00:00Z",
                      },
                    },
                    laboratoryRequest: {
                      create: {
                        id: "1bea286b-6ee1-42b7-8895-64683305ac43",
                        patientId: "PATIENT2",
                        labProcedureId: "LP2100001",
                        requestingPhysicianId: "EMP1",
                        LaboratoryResults: {
                          create: {
                            patientId: "PATIENT2",
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
                        checkedById: "EMP1",
                      },
                    },
                    physicalExamination: {
                      create: {
                        patientId: "PATIENT2",
                        physicalPart: "ABDOMEN",
                        isNormal: false,
                        remarks: "Tenderness in the right lower quadrant.",
                      },
                    },
                    diagnosis: {
                      create: {
                        patientId: "PATIENT2",
                        condition: "Appendicitis",
                        diagnosisDate: "2024-03-01T11:30:00Z",
                        treatment: "Emergency surgery required.",
                        physicianId: "EMP1",
                      },
                    },
                    prescriptions: {
                      create: {
                        patientId: "PATIENT2",
                        dosage: 10,
                        frequencyPerDay: 1,
                        durationInDays: 1,
                        notes: "Pain relief for surgery.",
                        physicianId: "EMP1",
                        drugsId: "DR100000001",
                        startDate: "2024-03-01T10:00:00Z",
                        endDate: "2024-03-01T10:00:00Z",
                      },
                    },
                    laboratoryRequest: {
                      create: {
                        id: "1bea286b-6ee1-42b7-8895-64683305ac44",
                        patientId: "PATIENT2",
                        labProcedureId: "LP2100001",
                        requestingPhysicianId: "EMP1",
                        LaboratoryResults: {
                          create: {
                            patientId: "PATIENT2",
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
                        checkedById: "EMP1",
                      },
                    },
                    physicalExamination: {
                      create: {
                        patientId: "PATIENT2",
                        physicalPart: "MOUTH_AND_THROAT",
                        isNormal: true,
                        remarks:
                          "Mild inflammation, likely due to viral infection.",
                      },
                    },
                    diagnosis: {
                      create: {
                        patientId: "PATIENT2",
                        condition: "Pharyngitis",
                        diagnosisDate: "2024-03-01T13:45:00Z",
                        treatment: "Prescribed analgesics and throat lozenges.",
                        physicianId: "EMP1",
                      },
                    },
                    prescriptions: {
                      create: {
                        patientId: "PATIENT2",
                        dosage: 500,
                        frequencyPerDay: 3,
                        durationInDays: 5,
                        notes: "For relief of sore throat pain.",
                        physicianId: "EMP1",
                        drugsId: "DR100000001",
                        startDate: "2024-03-01T10:00:00Z",
                        endDate: "2024-03-01T10:00:00Z",
                      },
                    },
                    laboratoryRequest: {
                      create: {
                        id: "1bea286b-6ee1-42b7-8895-64683305ac45",
                        patientId: "PATIENT2",
                        labProcedureId: "LP2100001",
                        requestingPhysicianId: "EMP1",
                        LaboratoryResults: {
                          create: {
                            patientId: "PATIENT2",
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
    where: { id: "USER3" },
    update: {},
    create: {
      id: "USER3",
      username: "ara03",
      email: "jeme610walker@gmail.com",
      password: "$2a$10$ib5/DxaL4moUGxl66UXdw.2E5QxVktgSvLy6qAihoBg.Fle3waMhy",
      role: "PATIENT",
      consent: true,
      emailVerified: "2024-03-07T11:08:20.692Z",
      profile: {
        create: {
          id: "PROFILE3",
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
              id: "PATIENT3",
              fname: "ara",
              mname: "buenaventura",
              lname: "mina",
              gender: "FEMALE",
              age: 23,
              bdate: "2023-12-27T10:48:22Z",
              bplace: "makati",
              civilStatus: "SINGLE",
              occupation: "Software engineer",
              contactInfo: {
                create: {
                  id: "CONTACT3",
                  phone: "09999999999",
                  email: "jeme610walker@gmail.com",
                  address: {
                    create: {
                      id: "ADDR3",
                      houseNumber: "1",
                      street: "seagull",
                      barangay: "rizal",
                      city: "taguig",
                      region: "ncr",
                      province: "metro manila",
                      country: "philippines",
                      zipCode: "1234",
                    },
                  },
                },
              },
              allergies: {
                createMany: {
                  data: [
                    {
                      name: "Peanut Allergy",
                      description: "Allergic reaction to peanuts",
                      severity: "HIGH",
                      dateDiagnosed: "2024-03-01T10:00:00Z",
                    },
                    {
                      name: "Penicillin Allergy",
                      description:
                        "Allergic reaction to penicillin antibiotics",
                      severity: "MEDIUM",
                      dateDiagnosed: "2024-03-01T10:00:00Z",
                    },
                    {
                      name: "Dust Allergy",
                      description: "Allergic reaction to dust mites",
                      severity: "LOW",
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
                        checkedById: "EMP1",
                      },
                    },
                    physicalExamination: {
                      create: {
                        patientId: "PATIENT3",
                        physicalPart: "HEAD_AND_NECK",
                        isNormal: true,
                        remarks: "No abnormalities observed.",
                      },
                    },
                    diagnosis: {
                      create: {
                        patientId: "PATIENT3",
                        condition: "Upper Respiratory Tract Infection",
                        diagnosisDate: "2024-03-01T10:00:00Z",
                        treatment: "Prescribed antibiotics and rest.",
                        physicianId: "EMP1",
                      },
                    },
                    prescriptions: {
                      create: {
                        patientId: "PATIENT3",
                        dosage: 500,
                        frequencyPerDay: 3,
                        durationInDays: 7,
                        notes: "Take with food.",
                        physicianId: "EMP1",
                        drugsId: "DR100000001",
                        startDate: "2024-03-01T10:00:00Z",
                        endDate: "2024-03-01T10:00:00Z",
                      },
                    },
                    laboratoryRequest: {
                      create: {
                        id: "1bea286b-6ee1-42b7-8895-64683305ac46",
                        patientId: "PATIENT3",
                        labProcedureId: "LP2100001",
                        requestingPhysicianId: "EMP1",
                        LaboratoryResults: {
                          create: {
                            patientId: "PATIENT2",
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
                        checkedById: "EMP1",
                      },
                    },
                    physicalExamination: {
                      create: {
                        patientId: "PATIENT3",
                        physicalPart: "ABDOMEN",
                        isNormal: false,
                        remarks: "Tenderness in the right lower quadrant.",
                      },
                    },
                    diagnosis: {
                      create: {
                        patientId: "PATIENT3",
                        condition: "Appendicitis",
                        diagnosisDate: "2024-03-01T11:30:00Z",
                        treatment: "Emergency surgery required.",
                        physicianId: "EMP1",
                      },
                    },
                    prescriptions: {
                      create: {
                        patientId: "PATIENT3",
                        dosage: 10,
                        frequencyPerDay: 1,
                        durationInDays: 1,
                        notes: "Pain relief for surgery.",
                        physicianId: "EMP1",
                        drugsId: "DR100000001",
                        startDate: "2024-03-01T10:00:00Z",
                        endDate: "2024-03-01T10:00:00Z",
                      },
                    },
                    laboratoryRequest: {
                      create: {
                        id: "1bea286b-6ee1-42b7-8895-64683305ac47",
                        patientId: "PATIENT3",
                        labProcedureId: "LP2100001",
                        requestingPhysicianId: "EMP1",
                        LaboratoryResults: {
                          create: {
                            patientId: "PATIENT2",
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
                        checkedById: "EMP1",
                      },
                    },
                    physicalExamination: {
                      create: {
                        patientId: "PATIENT3",
                        physicalPart: "MOUTH_AND_THROAT",
                        isNormal: true,
                        remarks:
                          "Mild inflammation, likely due to viral infection.",
                      },
                    },
                    diagnosis: {
                      create: {
                        patientId: "PATIENT3",
                        condition: "Pharyngitis",
                        diagnosisDate: "2024-03-01T13:45:00Z",
                        treatment: "Prescribed analgesics and throat lozenges.",
                        physicianId: "EMP1",
                      },
                    },
                    prescriptions: {
                      create: {
                        patientId: "PATIENT3",
                        dosage: 500,
                        frequencyPerDay: 3,
                        durationInDays: 5,
                        notes: "For relief of sore throat pain.",
                        physicianId: "EMP1",
                        drugsId: "DR100000001",
                        startDate: "2024-03-01T10:00:00Z",
                        endDate: "2024-03-01T10:00:00Z",
                      },
                    },
                    laboratoryRequest: {
                      create: {
                        id: "1bea286b-6ee1-42b7-8895-64683305ac48",
                        patientId: "PATIENT3",
                        labProcedureId: "LP2100001",
                        requestingPhysicianId: "EMP1",
                        LaboratoryResults: {
                          create: {
                            patientId: "PATIENT2",
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
        id: "APPOINTMENT_1",
        patientId: "PATIENT3",
        title: "Appointment 1",
        status: "SCHEDULED",
        reason: "reason",
        room: "123",
        employeeId: "EMP1",
        endDate: new Date(2024, 2, 15, 12, 0, 0),
        startDate: new Date(2024, 2, 15, 11, 0, 0),
      },
      {
        id: "APPOINTMENT_2",
        patientId: "PATIENT2",
        title: "Appointment 2",
        status: "SCHEDULED",
        reason: "reason",
        room: "123",
        employeeId: "EMP1",
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
