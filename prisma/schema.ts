import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Email is required."),
  password: z.string().min(1, "Password is required."),
});

export const RegisterSchema = z.object({
  fname: z.string().min(1, "First Name is required"),
  lname: z.string().min(1, "Last Name is required"),
  email: z.string().email("Email is required."),
  password: z.string().min(1, "Password is required."),
});
