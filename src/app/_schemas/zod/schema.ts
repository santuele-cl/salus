// import { CivilStatus } from "@prisma/client";
import * as z from "zod";

export const VisitSchema = z.object({
  accompaniedBy: z.string().optional(),
  chiefComplaint: z.string().min(1, "This field is required"),
  hpi: z.string().min(1, "This field is required"),
});

export const VitalsSchema = z.object({
  heightInCm: z.number(),
  weightInKl: z.number(),
  bodyTemperatureInCelsius: z.number(),
  hbloodPressurepi: z.string().min(1, "This field is required"),
  pulseRate: z.string().min(1, "This field is required"),
  respiratoryRate: z.string().min(1, "This field is required"),
  hpi: z.string().min(1, "This field is required"),
  oxygenSaturation: z.string().min(1, "This field is required"),
});

export const EvaluationSchema = z.object({
  heightInCm: z.number(),
  weightInKl: z.number(),
  bodyTemperatureInCelsius: z.number(),
  hbloodPressurepi: z.string().min(1, "This field is required"),
  pulseRate: z.string().min(1, "This field is required"),
  respiratoryRate: z.string().min(1, "This field is required"),
  hpi: z.string().min(1, "This field is required"),
  oxygenSaturation: z.string().min(1, "This field is required"),
});

export const SettingsSchema = z.object({
  name: z.optional(z.string().min(1, "Minimum 1 character!")),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email("Email is required."),
});

export const NewPasswordSchema = z.object({
  newPassword: z.string().min(6, "Minimum of 6 character!"),
});

export const RegisterSchema = z.object({
  // PERSONAL
  fname: z.string().min(1, "First Name is required!"),
  mname: z.string().min(1, "Middle Name is required!"),
  lname: z.string().min(1, "Last Name is required!"),
  nameSuffix: z.optional(z.string()),
  gender: z.string(),
  age: z.coerce.number(),
  bdate: z.coerce.date(),
  bplace: z.string().min(1, "Birth place is required!"),
  civilStatus: z.string().min(1, "Civil status is required"),
  occupation: z.string().min(1, "Occupation is required"),
  // CONTACT
  phone: z.string().min(1, "Phone is required"),
  // ADDRESS
  houseNumber: z.string().min(1, "House number is required"),
  street: z.string().min(1, "Street is required"),
  barangay: z.string().min(1, "Barangay is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  region: z.string().min(1, "Region is required"),
  country: z.string().min(1, "Country is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  // CONSENT
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent required!",
  }),
  // HEALTH RELATED
  isSmoking: z.coerce.boolean(),
  isCovidVaccinated: z.coerce.boolean(),
  isDengvaxiaVaccinated: z.coerce.boolean(),
  // ACCOUNT
  username: z.string().min(1, "Username is required!"),
  email: z.string().email("Email is required!"),
  password: z.string().min(1, "Password is required!"),
  confirmPassword: z.string().min(1, "Password is required!"),
});

export const LoginSchema = z.object({
  email: z.string().email("Email is required."),
  password: z.string().min(1, "Password is required."),
  code: z.optional(z.string()),
});
