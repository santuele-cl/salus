import { CategoryType } from "../types";

export const TPDH_LAB_PROCEDURE_HEMATOLOGY = [
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

export const TPDH_LAB_PROCEDURE_BLOODBANK = [
  "ABO typing",
  "Rh typing",
  "Cross matching",
];

export const TPDH_LAB_PROCEDURE_CLINIC_MICROSCOPY = [
  "Urinalysis",
  "Fecalysis",
  "Pregnancy Test",
  "Sperm Analysis",
];

export const TPDH_LAB_PROCEDURE_BLOOD_CHEMISTRY = [
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

export const TPDH_LAB_PROCEDURE_SEROLOGY = [
  "RPR / VDRL",
  "HBs Ag",
  "Typhi Dot",
  "PAP Smear",
  "FNAB",
  "Biopsy",
];

export const TPDH_LAB_PROCEDURE_HISPATHOLOGY = ["PAP Smear", "FNAB", "Biopsy"];

export const TPDH_LAB_PROCEDURE_BACTERIOLOGY = [
  "AFB Stain",
  "Gram Stain",
  "KOH",
  "Culture & Sensitivity",
];

export const TPDH_LAB_PROCEDURE_CATEGORY = [
  {
    categoryName: "hematology",
    procedures: TPDH_LAB_PROCEDURE_HEMATOLOGY,
  },
  {
    categoryName: "blood bank",
    procedures: TPDH_LAB_PROCEDURE_BLOODBANK,
  },
  {
    categoryName: "clinical miscroscopy",
    procedures: TPDH_LAB_PROCEDURE_CLINIC_MICROSCOPY,
  },
  {
    categoryName: "blood chemistry",
    procedures: TPDH_LAB_PROCEDURE_BLOOD_CHEMISTRY,
  },
  {
    categoryName: "serology",
    procedures: TPDH_LAB_PROCEDURE_SEROLOGY,
  },
  {
    categoryName: "hispathology",
    procedures: TPDH_LAB_PROCEDURE_HISPATHOLOGY,
  },
  {
    categoryName: "bacteriology",
    procedures: TPDH_LAB_PROCEDURE_BACTERIOLOGY,
  },
];
