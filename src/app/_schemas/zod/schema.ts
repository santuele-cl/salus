import * as z from "zod";
import {
  AppointmentStatus,
  CivilStatus,
  Gender,
  PhysicalPart,
} from "@prisma/client";

export const AppointmentSchema = z.object({
  title: z.string().min(1, "This field is required"),
  status: z.nativeEnum(AppointmentStatus),
  room: z.string().min(1, "This field is required"),
  reason: z.string().min(1, "This field is required"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  patientId: z.string().min(1, "This field is required"),
  employeeId: z.string().min(1, "This field is required"),
});

export const PhysicalExaminationSchema = z.object({
  physicalPart: z.nativeEnum(PhysicalPart),
  specifyIfOther: z.string().optional(),
  isNormal: z.coerce.boolean(),
  remarks: z.string().min(1, "This field is required"),
  visitId: z.string(),
  patientId: z.string(),
});

export const LaboratoryRequestSchema = z.object({
  labProcedureId: z.string().min(1, "This field is required"),
  requestingPhysicianId: z.string().min(1, "This field is required"),
  visitId: z.string().min(1, "This field is required"),
  patientId: z.string().min(1, "This field is required"),
});

export const PrescriptionSchema = z.object({
  drugsId: z.string().min(1, "This field is required"),
  dosage: z.coerce.number().refine((value) => value !== 0),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  durationInDays: z.coerce.number().refine((value) => value !== 0),
  takenEveryHour: z.coerce
    .number()
    .refine((value) => value !== 0)
    .optional(),
  frequencyPerDay: z.coerce
    .number()
    .refine((value) => value !== 0)
    .optional(),
  notes: z.string().optional(),
  physicianId: z.string().min(1, "This field is required"),
  patientId: z.string().min(1, "This field is required"),
  visitId: z.string().min(1, "This field is required"),
});

export const VisitSchema = z.object({
  accompaniedBy: z.string().optional(),
  chiefComplaint: z.string().min(1, "This field is required"),
  hpi: z.string().min(1, "This field is required"),
});

export const VitalsSchema = z.object({
  heightInCm: z.coerce.number().refine((value) => value !== 0),
  weightInKg: z.coerce.number().refine((value) => value !== 0),
  bodyTemperatureInCelsius: z.coerce.number().refine((value) => value !== 0),
  bloodPressure: z.string().min(1, "This field is required"),
  pulseRate: z.string().min(1, "This field is required"),
  respiratoryRate: z.string().min(1, "This field is required"),
  oxygenSaturation: z.string().min(1, "This field is required"),
  checkedById: z.string().min(1, "Requred fields"),
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
  fname: z
    .string()
    .min(1, "First Name is required!")
    .regex(new RegExp(/^[a-zA-Z .]+$/), "Invalid input"),
  mname: z.string().optional(),
  lname: z
    .string()
    .min(1, "Last Name is required!")
    .regex(new RegExp(/^[a-zA-Z .]+$/), "Invalid input"),
  nameSuffix: z.optional(z.string()),
  gender: z.nativeEnum(Gender),
  age: z.coerce.number(),
  bdate: z.coerce.date(),
  bplace: z
    .string()
    .min(1, "Birth place is required!")
    .regex(new RegExp(/^[a-zA-Z ,]+$/), "Invalid input"),
  civilStatus: z.nativeEnum(CivilStatus),
  occupation: z
    .string()
    .min(1, "Occupation is required")
    .regex(new RegExp(/^[a-zA-Z\s]+$/)),
  // CONTACT
  phone: z
    .string()
    .regex(new RegExp(/^(09|\+639)\d{9}$/), "Invalid phone format"),
  // ADDRESS
  houseNumber: z.string().min(1, "House number is required"),
  street: z.string().min(1, "Street is required"),
  barangay: z.string().min(1, "Barangay is required"),
  city: z
    .string()
    .min(1, "City is required")
    .regex(new RegExp(/^[a-zA-Z\s]+$/)),
  province: z
    .string()
    .min(1, "Province is required")
    .regex(new RegExp(/^[a-zA-Z\s]+$/)),
  region: z
    .string()
    .min(1, "Region is required")
    .regex(new RegExp(/^[a-zA-Z\s]+$/)),
  country: z
    .string()
    .min(1, "Country is required")
    .regex(new RegExp(/^[a-zA-Z\s]+$/)),
  zipCode: z.string().regex(new RegExp(/^\d{4}$/), "Invalid format"),
  // CONSENT
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent required!",
  }),

  // ACCOUNT
  username: z
    .string()
    .min(1, "Username is required!")
    .regex(
      new RegExp(/^[^\d]\w*$/),
      "Username must contain letters and numbers only and must not start with number."
    ),
  email: z.string().email("Email is required!"),
  password: z.string().min(1, "Password is required!"),
  confirmPassword: z.string().min(1, "Password is required!"),
});

export const LoginSchema = z.object({
  email: z.string().email("Email is required."),
  password: z.string().min(1, "Password is required."),
  code: z.optional(z.string()),
});
