import { CivilStatus } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z.object({
  name: z.optional(z.string().min(1, "Minimum 1 character!")),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email("Email is required."),
});

export const NewPasswordSchema = z.object({
  newPassword: z.string().min(6, "Minimum of 6 character!"),
});

// export const RegisterSchema = z.object({
//   fname: z.string().min(1, "First Name is required"),
//   lname: z.string().min(1, "Last Name is required"),
//   email: z.string().email("Email is required."),
//   password: z.string().min(1, "Password is required."),
// });

export const RegisterSchema = z.object({
  fname: z.string().min(1, "First Name is required!"),
  mname: z.string().min(1, "Middle Name is required!"),
  lname: z.string().min(1, "Last Name is required!"),
  nameSuffix: z.optional(z.string()),
  bdate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  bplace: z.string().min(1, "Birth place is required!"),
  civilStatus: z.string().min(1, "Civil status is required"),
  occupation: z.string().min(1, "Occupation is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  address: z.string().min(1, "Address is required"),
  alertMedication: z.string().min(1, "Alert medication is required"),
  allergies: z.string().min(1, "Allergies is required"),
  isSmoking: z.string().min(1, "Smoking status is required"),
  isCovidVaccinated: z.string().min(1, "Covid vaccination status is required"),
  isDengvaxiaVaccinated: z
    .string()
    .min(1, "Dengvaxia vaccination status is required"),

  email: z.string().email("Email is required!"),
  password: z.string().min(1, "Password is required!"),

  // nameSuffix            String?
  // bdate                 DateTime
  // bplace                String
  // civilStatus           CivilStatus
  // occupation            String?
  // contactNumber         String
  // email                 String      @unique
  // address               String
  // alertMedication       String?
  // allergies             String? // TODO: Create Allergies Table
  // isSmoking             Boolean     @default(false)
  // isCovidVaccinated     Boolean     @default(false)
  // isDengvaxiaVaccinated Boolean     @default(false)
  // createdAt             DateTime    @default(now())
  // updatedAt             DateTime    @updatedAt
});

export const LoginSchema = z.object({
  email: z.string().email("Email is required."),
  password: z.string().min(1, "Password is required."),
  code: z.optional(z.string()),
});
