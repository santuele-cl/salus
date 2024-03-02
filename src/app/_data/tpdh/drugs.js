"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAMPLE_DRUGS = exports.DRUG_FORMS = exports.DRUGS_CATEGORIES = void 0;
var SAMPLE_DRUGS_CATEGORIES = [
    {
        name: "Pain Relief",
        description: "Medications used to relieve pain, including analgesics and anti-inflammatory drugs.",
    },
    {
        name: "Antibiotic",
        description: "Medications used to treat bacterial infections by killing or inhibiting the growth of bacteria.",
    },
    {
        name: "Antihistamine",
        description: "Medications used to relieve allergy symptoms by blocking the action of histamine.",
    },
    {
        name: "Antidepressant",
        description: "Medications used to treat depression and other mood disorders by affecting neurotransmitters in the brain.",
    },
    {
        name: "Antipsychotic",
        description: "Medications used to manage symptoms of psychosis, such as hallucinations and delusions.",
    },
    {
        name: "Anticoagulant",
        description: "Medications used to prevent blood clot formation or treat existing blood clots.",
    },
    {
        name: "Antacid",
        description: "Medications used to neutralize stomach acid and relieve symptoms of acid reflux and indigestion.",
    },
    {
        name: "Laxative",
        description: "Medications used to promote bowel movements and relieve constipation.",
    },
    {
        name: "Sedative",
        description: "Medications used to induce relaxation, reduce anxiety, and promote sleep.",
    },
    {
        name: "Decongestant",
        description: "Medications used to relieve nasal congestion and sinus pressure.",
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
var SAMPLE_DRUGS_FORM = [
    {
        name: "Tablet",
        description: "Solid dosage form containing the drug substance along with suitable pharmaceutical excipients.",
    },
    {
        name: "Capsule",
        description: "Solid dosage form in which the drug is enclosed in a hard or soft gelatin shell.",
    },
    {
        name: "Liquid",
        description: "Drug formulation in a liquid state, typically for oral administration.",
    },
    {
        name: "Injection",
        description: "Drug solution or suspension intended for parenteral administration via intramuscular, intravenous, or subcutaneous route.",
    },
    {
        name: "Cream",
        description: "Semi-solid emulsion containing the drug substance for topical application.",
    },
    {
        name: "Ointment",
        description: "Semi-solid dosage form for topical application, typically containing a high concentration of drug substance.",
    },
    {
        name: "Inhaler",
        description: "Device used to deliver medications directly into the lungs through inhalation.",
    },
    {
        name: "Suppository",
        description: "Solid dosage form inserted into the rectum, vagina, or urethra, where it dissolves or melts to release the drug.",
    },
    {
        name: "Patch",
        description: "Transdermal delivery system that delivers drugs through the skin for systemic effects over an extended period.",
    },
    {
        name: "Gel",
        description: "Semi-solid dosage form containing a gelling agent, used for topical or oral administration.",
    },
];
exports.DRUGS_CATEGORIES = SAMPLE_DRUGS_CATEGORIES.map(function (item, i) { return (__assign(__assign({}, item), { id: "".concat("DC" + (i + 1) + "00000" + (i + 1)) })); });
exports.DRUG_FORMS = SAMPLE_DRUGS_FORM.map(function (item, i) { return (__assign(__assign({}, item), { id: "".concat("DF" + (i + 1) + "00000" + (i + 1)) })); });
var DRUGS = [
    {
        name: "Ibuprofen",
        strength: "200mg",
        manufacturer: "Pfizer",
        priceInCents: 599,
    },
    {
        name: "Paracetamol",
        category: "Pain Relief",
        strength: "500mg",
        manufacturer: "Johnson & Johnson",
        priceInCents: 349,
    },
    {
        name: "Amoxicillin",
        category: "Antibiotic",
        strength: "500mg",
        manufacturer: "GlaxoSmithKline",
        priceInCents: 899,
    },
    ,
    {
        name: "Aspirin",
        category: "Pain Relief",
        strength: "300mg",
        manufacturer: "Bayer",
        priceInCents: 499,
    },
    {
        name: "Loratadine",
        category: "Antihistamine",
        strength: "10mg",
        manufacturer: "Pfizer",
        priceInCents: 729,
    },
    {
        name: "Omeprazole",
        category: "Antacid",
        strength: "20mg",
        manufacturer: "AstraZeneca",
        priceInCents: 999,
    },
    {
        name: "Simvastatin",
        category: "Cholesterol Lowering",
        strength: "40mg",
        manufacturer: "Merck",
        priceInCents: 1249,
    },
    {
        name: "Metformin",
        category: "Diabetes Medication",
        strength: "500mg",
        manufacturer: "Novartis",
        priceInCents: 679,
    },
    {
        name: "Ciprofloxacin",
        category: "Antibiotic",
        strength: "250mg",
        manufacturer: "Bayer",
        priceInCents: 1199,
    },
    {
        name: "Albuterol",
        category: "Bronchodilator",
        strength: "2mg",
        manufacturer: "GSK",
        priceInCents: 1599,
    },
];
exports.SAMPLE_DRUGS = DRUGS.map(function (item, i) {
    return __assign(__assign({}, item), { id: "".concat("DR" + (i + 1) + "0000000" + (i + 1)), drugCategoryId: "".concat("DC" + (i + 1) + "00000" + (i + 1)), drugFormId: "".concat("DF" + (i + 1) + "00000" + (i + 1)) });
});
console.log(exports.SAMPLE_DRUGS);
