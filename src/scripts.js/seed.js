// import db from "./prismaClient.js";
import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
import { db } from "@/app/_lib/db";

const nanoid = customAlphabet("1234567890abcdef", 8);

const main = async () => {
  // const asdf = await db.
  const EMP_ROLES = await db.employeeRole.createMany({
    data: [
      { id: "R1001", roleName: "ADMIN" },
      { id: "R1002", roleName: "PHYSICIAN" },
      { id: "R1003", roleName: "NURSE" },
      { id: "R1004", roleName: "ASSISTANT" },
    ],
  });

  const SERVICE_DEPT = await db.serviceDepartment.createMany({
    data: [
      {
        id: "SD1001",
        serviceDeptName: "Emergency Department",
        serviceDeptHead: "Timoteo Neil Trinida, MD",
      },
      {
        id: "SD1002",
        serviceDeptName: "Admitting Section",
        serviceDeptHead: "Karen Glumalid",
      },
      {
        id: "SD1003",
        serviceDeptName: "Outpatient Department",
        serviceDeptHead: "Pascual Pattaui, MD",
      },
    ],
  });

  const CLINICAL_DEPT = await db.clinicalDepartment.createMany({
    data: [
      {
        id: "CD2001",
        clinicalDeptName: "Surgical Sciences",
        clinicalDeptHead: "Timoteo Neil Trinida, MD",
      },
      {
        id: "CD2002",
        clinicalDeptName: "Ob-Gyne",
        clinicalDeptHead: "Natividad Go-Anat, MD",
      },
      {
        id: "CD2003",
        clinicalDeptName: "Pedia",
        clinicalDeptHead: "Ma. Rima Apelo, MD",
      },
      {
        id: "CD2004",
        clinicalDeptName: "Internal Medicine",
        clinicalDeptHead: "Angeli Del Valle, MD",
      },
      {
        id: "CD2005",
        clinicalDeptName: "Emergency Medicine",
        clinicalDeptHead: "Mark Jeffrey Onato, MD",
      },
      {
        id: "CD2006",
        clinicalDeptName: "Dental",
        clinicalDeptHead: "Florabel Mabborang, DMD",
      },
      {
        id: "CD2007",
        clinicalDeptName: "Anesthesia",
        clinicalDeptHead: "Guillen Segador, MD",
      },
    ],
  });

  const EMP_A = await db.u;

  const clyde = await db.user.upsert({
    where: { id: "UA7CF4967" },
    update: {},
    create: {
      id: `UA7CF4967`,
      username: "clyde",
      password: await bcrypt.hash("password123", 10),
      role: { connect: { id: "R1001" } },
      userProfile: {
        create: {
          id: `UA7CF4967`,
          fname: "Lenon",
          mname: "Arr",
          lname: "San",
          bdate: "2023-12-27T10:48:22Z",
          contactNumber: "09358295738",
          email: "clyde.admin@email.com",
          address: "south",
        },
      },
    },
  });

  const ara = await db.user.upsert({
    where: { id: "UJFJ802JQ" },
    update: {},
    create: {
      id: `UJFJ802JQ`,
      username: "ara",
      password: await bcrypt.hash("password123", 10),
      role: { connect: { id: "R1002" } },
      userProfile: {
        create: {
          id: `UJFJ802JQ`,
          fname: "Ara",
          mname: "Zir",
          lname: "Buenaventura",
          bdate: "2023-12-27T10:48:22Z",
          contactNumber: "09455833435",
          email: "ara.physician@email.com",
          address: "comembo",
        },
      },
    },
  });

  const princess = await db.user.upsert({
    where: { id: "UZOPWLJ29" },
    update: {},
    create: {
      id: `UZOPWLJ29`,
      username: "princess",
      password: await bcrypt.hash("password123", 10),
      role: { connect: { id: "R1003" } },
      userProfile: {
        create: {
          id: `UZOPWLJ29`,
          fname: "Princess",
          mname: "Rich",
          lname: "Funa",
          bdate: "2023-12-27T10:48:22Z",
          contactNumber: "09985553434",
          email: "princess.nurse@email.com",
          address: "central",
        },
      },
    },
  });

  const patient = await db.patient.create({
    data: {
      id: "PKL90DKALD2",
      patientChart: { create: { id: "PPC38DA208FBA" } },
      patientProfile: {
        create: {
          id: "PPLL9K0A23KH",
          fname: "Juan",
          mname: "Batum",
          lname: "Dela Cruz",
          age: 20,
          gender: "male",
          bdate: "2024-12-27T10:48:22Z",
          bplace: "makati",
          civilStatus: "SINGLE",
          occupation: "n/a",
          contactNumber: "09561379564",
          email: "juan.delacruz@gmail.com",
          address: "BLK 28 L 1 Maya Street, Brgy. Rizal, Makati",
          isSmoking: false,
          isCovidVaccinated: false,
          isDengvaxiaVaccinated: false,
        },
      },
    },
  });

  const visit = await db.visit.create({
    data: {
      id: "V574C24726E4E3E607",
      patientChart: { connect: { id: "PPC38DA208FBA" } },
      accompaniedBy: "Angela",
      chiefComplaint: "Ear Pain",
      hpi: "Pain started 3 days. Worse 1 day ago. Now severe.",
      serviceDepartment: { connect: { id: "SD1001" } },
      evaluation: {
        create: {
          id: "EV4FFFB323AFBA26B2",
          physician: { connect: { id: "UJFJ802JQ" } },
          physicalExamination: "test",
          diagnosis: "Otitis Media",
          doctorsNote: "Empty",
          // prescription: "Co-amoxiclav 3x a day for 7 days.",
          medication: {
            createMany: {
              data: [
                {
                  id: "MED23293FBA26B2",
                  drugName: "Ibuprofen",
                  strength: "600 mg",
                  form: "tablet",
                  dosage: 1,
                  frequency: "3x daily",
                  duration: 7,
                  direction: "Every after meal",
                },
                {
                  id: "MED4323AFBA26B2",
                  drugName: "Ibuprofen",
                  strength: "600 mg",
                  form: "tablet",
                  dosage: 1,
                  frequency: "3x daily",
                  duration: 7,
                  direction: "Every after meal",
                },
              ],
            },
          },
        },
      },
      vitals: {
        create: {
          id: "VITALS1",
          nurse: { connect: { id: "UZOPWLJ29" } },
          heightInCm: 160,
          weightInKl: 55,
          bpSystolic: 120,
          bpDiastolic: 80,
          pulseRate: 75,
          respiratoryRate: 15,
          bodyTempInCelsius: 36,
          oxygenSaturation: 95,
        },
      },
    },
  });

  const labcategories = await db.labProcedureCategory.createMany({
    data: [
      { id: "LPC1001", categoryName: "hematology" },
      { id: "LPC1002", categoryName: "blood bank" },
      { id: "LPC1003", categoryName: "clinical miscroscopy" },
      { id: "LPC1004", categoryName: "blood chemistry" },
      { id: "LPC1005", categoryName: "serology" },
      { id: "LPC1006", categoryName: "hispathology" },
      { id: "LPC1007", categoryName: "bacteriology" },
    ],
  });

  const hematology = [
    "CBC",
    "platelet count",
    "RBC/WBC count",
    "Hgb Hct Only",
    "WBC difference count only",
    "differential count",
    "peripheral smear",
    "ct bt",
    "toxic granulation",
    "ESR",
    "Malarial Smear",
  ];
  const bloodbank = ["ABO typing", "Rh typing", "Cross matching"];
  const clinicmiscrocopy = [
    "Urinalysis",
    "Fecalysis",
    "Pregnancy Test",
    "Sperm Analysis",
  ];
  const bloodchem = [
    "FBS",
    "RBS/HGT",
    "OGTT",
    "OCTT",
    "BUN",
    "Createnine",
    "Uric Acid",
    "Cholesterol",
    "Triglycendes",
    "HDL LDL",
    "ALT/SGPT",
    "AST/SGOT",
    "Sodium",
    "Potassium",
    "Chlorine",
    "Calcium",
    "Magnesium",
    "Alk. Phospate",
    "Acid Phospate",
    "CPK - Total",
    "CPK-MB",
  ];

  const serology = [
    "RPR / VDRL",
    "HBs Ag",
    "Typhi Dot",
    "PAP Smear",
    "FNAB",
    "Biopsy",
  ];
  const hispathology = ["PAP Smear", "FNAB", "Biopsy"];
  const bacteriology = [
    "AFB Stain",
    "Gram Stain",
    "KOH",
    "Culture & Sensitivity",
  ];
  const labprocedures = await db.labProcedure.createMany({
    data: [
      ...hematology.map((proc, i) => ({
        id: `LPHM100${i + 1}`,
        procedureName: proc,
        labProcedureCategoryId: "LPC1001",
      })),
      ...bloodbank.map((proc, i) => ({
        id: `LPBB100${i + 1}`,
        procedureName: proc,
        labProcedureCategoryId: "LPC1002",
      })),
      ...clinicmiscrocopy.map((proc, i) => ({
        id: `LPCM100${i + 1}`,
        procedureName: proc,
        labProcedureCategoryId: "LPC1003",
      })),
      ...bloodchem.map((proc, i) => ({
        id: `LPBC100${i + 1}`,
        procedureName: proc,
        labProcedureCategoryId: "LPC1003",
      })),
      ...serology.map((proc, i) => ({
        id: `LPSR100${i + 1}`,
        procedureName: proc,
        labProcedureCategoryId: "LPC1004",
      })),
      ...hispathology.map((proc, i) => ({
        id: `LPHP100${i + 1}`,
        procedureName: proc,
        labProcedureCategoryId: "LPC1005",
      })),
      ...bacteriology.map((proc, i) => ({
        id: `LPBCT100${i + 1}`,
        procedureName: proc,
        labProcedureCategoryId: "LPC1006",
      })),
    ],
  });

  const laborderss = await db.labOrders.create({
    data: {
      id: "LO74C24726E4E3E607",
      patientChartId: "PPC38DA208FBA",
      requestingPhysicianId: "UJFJ802JQ",
      clinicName: "TPDH Clinic",
      labProcedureId: "LPCM1001",
    },
  });
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
