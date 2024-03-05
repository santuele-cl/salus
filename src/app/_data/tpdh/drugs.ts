import { Drugs } from "@prisma/client";

const SAMPLE_DRUGS_CATEGORIES = [
  {
    name: "Pain Relief",
    description:
      "Medications used to relieve pain, including analgesics and anti-inflammatory drugs.",
  },

  {
    name: "Antibiotic",
    description:
      "Medications used to treat bacterial infections by killing or inhibiting the growth of bacteria.",
  },

  {
    name: "Antihistamine",
    description:
      "Medications used to relieve allergy symptoms by blocking the action of histamine.",
  },

  {
    name: "Antidepressant",
    description:
      "Medications used to treat depression and other mood disorders by affecting neurotransmitters in the brain.",
  },

  {
    name: "Antipsychotic",
    description:
      "Medications used to manage symptoms of psychosis, such as hallucinations and delusions.",
  },

  {
    name: "Anticoagulant",
    description:
      "Medications used to prevent blood clot formation or treat existing blood clots.",
  },

  {
    name: "Antacid",
    description:
      "Medications used to neutralize stomach acid and relieve symptoms of acid reflux and indigestion.",
  },

  {
    name: "Laxative",
    description:
      "Medications used to promote bowel movements and relieve constipation.",
  },

  {
    name: "Sedative",
    description:
      "Medications used to induce relaxation, reduce anxiety, and promote sleep.",
  },
  {
    name: "Decongestant",
    description:
      "Medications used to relieve nasal congestion and sinus pressure.",
  },
  {
    name: "Samp1",
    description: "samp",
  },
  {
    name: "Samp2",
    description: "samp",
  },
];

const SAMPLE_DRUGS_FORM = [
  {
    name: "Tablet",
    description:
      "Solid dosage form containing the drug substance along with suitable pharmaceutical excipients.",
  },
  {
    name: "Capsule",
    description:
      "Solid dosage form in which the drug is enclosed in a hard or soft gelatin shell.",
  },
  {
    name: "Liquid",
    description:
      "Drug formulation in a liquid state, typically for oral administration.",
  },
  {
    name: "Injection",
    description:
      "Drug solution or suspension intended for parenteral administration via intramuscular, intravenous, or subcutaneous route.",
  },
  {
    name: "Cream",
    description:
      "Semi-solid emulsion containing the drug substance for topical application.",
  },
  {
    name: "Ointment",
    description:
      "Semi-solid dosage form for topical application, typically containing a high concentration of drug substance.",
  },
  {
    name: "Inhaler",
    description:
      "Device used to deliver medications directly into the lungs through inhalation.",
  },
  {
    name: "Suppository",
    description:
      "Solid dosage form inserted into the rectum, vagina, or urethra, where it dissolves or melts to release the drug.",
  },
  {
    name: "Patch",
    description:
      "Transdermal delivery system that delivers drugs through the skin for systemic effects over an extended period.",
  },
  {
    name: "Gel",
    description:
      "Semi-solid dosage form containing a gelling agent, used for topical or oral administration.",
  },
];

export const DRUGS_CATEGORIES = SAMPLE_DRUGS_CATEGORIES.map((item, i) => ({
  ...item,
  id: `${"DC" + (i + 1) + "00000" + (i + 1)}`,
}));

export const DRUG_FORMS = SAMPLE_DRUGS_FORM.map((item, i) => ({
  ...item,
  id: `${"DF" + (i + 1) + "00000" + (i + 1)}`,
}));

const DRUGS = [
  {
    name: "Paracetamol",
    strength: "500mg",
    manufacturer: "Johnson & Johnson",
    priceInCents: 349,
  },
  {
    name: "Amoxicillin",
    strength: "500mg",
    manufacturer: "GlaxoSmithKline",
    priceInCents: 899,
  },
  {
    name: "Aspirin",
    strength: "300mg",
    manufacturer: "Bayer",
    priceInCents: 499,
  },
  {
    name: "Loratadine",
    strength: "10mg",
    manufacturer: "Pfizer",
    priceInCents: 729,
  },
  {
    name: "Omeprazole",
    strength: "20mg",
    manufacturer: "AstraZeneca",
    priceInCents: 999,
  },
  {
    name: "Simvastatin",
    strength: "40mg",
    manufacturer: "Merck",
    priceInCents: 1249,
  },
  {
    name: "Metformin",
    strength: "500mg",
    manufacturer: "Novartis",
    priceInCents: 679,
  },
  {
    name: "Ciprofloxacin",
    strength: "250mg",
    manufacturer: "Bayer",
    priceInCents: 1199,
  },
  {
    name: "Albuterol",
    strength: "2mg",
    manufacturer: "GSK",
    priceInCents: 1599,
  },
  {
    name: "Ibuprofen",
    strength: "200mg",
    manufacturer: "Pfizer",
    priceInCents: 599,
  },
];

export const SAMPLE_DRUGS = DRUGS.map((item, i) => {
  return {
    ...item,
    id: `${"DR" + (i + 1) + "0000000" + (i + 1)}`,
    drugCategoryId: `${"DC" + (i + 1) + "00000" + (i + 1)}`,
    drugFormId: `${"DF" + (i + 1) + "00000" + (i + 1)}`,
  };
});
