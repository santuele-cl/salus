import { RegisterSchema } from "../_schemas/zod/schema";
import { Step } from "./types";

export const EXPIRES_IN_ONE_HOUR = new Date(
  new Date().getTime() + 60 * 60 * 1000
);
export const EXPIRES_IN_15_MIN = new Date(
  new Date().getTime() + 15 * 60 * 1000
);

export const STEPS: Step[] = [
  {
    id: 0,
    label: "Personal Info",
    description: "Description here",
    fields: [
      { id: "fname", label: "First Name" },
      { id: "mname", label: "Middle Name" },
      { id: "lname", label: "Last Name" },
      { id: "nameSuffix", label: "Name Suffix" },
      { id: "bdate", label: "Birthdate", type: "date" },
      { id: "bplace", label: "Birthplace" },
      { id: "civilStatus", label: "Civil Status" },
      { id: "contactNumber", label: "Contact Number" },
      { id: "address", label: "Address" },
      // { id: "lname", label: "Last Name" },
      // { id: "lname", label: "Last Name" },
    ],
  },
  {
    id: 1,
    label: "Account Details",
    description: "Description here",
    fields: [{ id: "fname", label: "First Name" }],
  },
  {
    id: 2,
    label: "Consent",
    description: "Description here",
    fields: [{ id: "fname", label: "First Name" }],
  },
];
