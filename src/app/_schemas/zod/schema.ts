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

export const RegisterSchema = z.object({
  fname: z.string().min(1, "First Name is required"),
  lname: z.string().min(1, "Last Name is required"),
  email: z.string().email("Email is required."),
  password: z.string().min(1, "Password is required."),
});

export const LoginSchema = z.object({
  email: z.string().email("Email is required."),
  password: z.string().min(1, "Password is required."),
  code: z.optional(z.string()),
});
