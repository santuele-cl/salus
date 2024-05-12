import { RegisterSchema } from "../_schemas/zod/schema";
import { RegisterEmployeeStep, Step } from "./types";

export const EXPIRES_IN_ONE_HOUR = new Date(
  new Date().getTime() + 60 * 60 * 1000
);
export const EXPIRES_IN_15_MIN = new Date(
  new Date().getTime() + 15 * 60 * 1000
);

export const STEPS: Step[] = [
  {
    id: 0,
    label: "Personal Information",
    description: "Input the information needed to identity you",
    fields: [
      { id: "fname", label: "First Name" },
      { id: "mname", label: "Middle Name" },
      { id: "lname", label: "Last Name" },
      { id: "nameSuffix", label: "Suffix" },
      {
        id: "gender",
        label: "Gender",
        type: "select",
        options: [
          { value: "MALE", label: "Male" },
          { value: "FEMALE", label: "Female" },
        ],
      },
      { id: "bdate", label: "Birthdate", type: "date" },
      { id: "bplace", label: "Birthplace" },
      { id: "civilStatus", label: "Civil Status" },
      { id: "occupation", label: "Occupation" },
    ],
  },
  {
    id: 1,
    label: "Contact Information",
    description: "Input the information needed to contact and reach you",
    fields: [
      { id: "phone", label: "Phone" },
      { id: "houseNumber", label: "House Number" },
      { id: "street", label: "Street" },
      { id: "barangay", label: "Barangay" },
      { id: "city", label: "City" },
      { id: "province", label: "Province" },
      { id: "region", label: "Region" },
      { id: "country", label: "Country" },
      { id: "zipCode", label: "Zip Code" },
    ],
  },
  {
    id: 2,
    label: "Account Details",
    description: "Input the information needed to create an account",
    fields: [
      { id: "username", label: "Username" },
      { id: "email", label: "Email" },
      { id: "password", label: "Password", type: "password" },
      { id: "confirmPassword", label: "Confirm Password", type: "password" },
    ],
  },
  {
    id: 3,
    label: "Consent",
    fields: [
      {
        id: "consent",
        label:
          "I confirm that I have read and understood the Salus Privacy and Consent Form, and I voluntarily consent to the collection, use, and disclosure of my personal health information as described herein.",
        type: "checkbox",
      },
    ],
  },
];

export const EMP_STEPS: RegisterEmployeeStep[] = [
  {
    id: 0,
    label: "Personal Information",
    description: "Input the personal information of the user",
    fields: [
      { id: "fname", label: "First Name" },
      { id: "mname", label: "Middle Name" },
      { id: "lname", label: "Last Name" },
      {
        id: "gender",
        label: "Gender",
        type: "select",
        options: [
          { value: "MALE", label: "Male" },
          { value: "FEMALE", label: "Female" },
        ],
      },
      { id: "bdate", label: "Birthdate", type: "date" },
    ],
  },
  {
    id: 1,
    label: "Contact Information",
    description: "Input the information needed to contact and reach you",
    fields: [
      { id: "phone", label: "Phone" },
      { id: "houseNumber", label: "House Number" },
      { id: "street", label: "Street" },
      { id: "barangay", label: "Barangay" },
      { id: "city", label: "City" },
      { id: "province", label: "Province" },
      { id: "region", label: "Region" },
      { id: "country", label: "Country" },
      { id: "zipCode", label: "Zip Code" },
    ],
  },
  {
    id: 2,
    label: "Employment Information",
    description: "Input the role and department assignment of the employee",
    fields: [
      {
        id: "clinicalDepartmentId",
        label: "Clinical Department",
        type: "select",
      },
      {
        id: "serviceDepartmentId",
        label: "Service Department",
        type: "select",
      },
      { id: "employeeRoleId", label: "Role", type: "select" },
    ],
  },
  {
    id: 3,
    label: "Account Details",
    description: "Input the information needed to create an account",
    fields: [
      { id: "username", label: "Username" },
      { id: "email", label: "Email" },
      { id: "password", label: "Password", type: "password" },
      { id: "confirmPassword", label: "Confirm Password", type: "password" },
    ],
  },
];
