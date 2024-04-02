import { Patient } from "@prisma/client";
import { RegisterEmployeeSchema, RegisterSchema } from "../_schemas/zod/schema";
import * as z from "zod";

export interface Field {
  id: keyof z.infer<typeof RegisterSchema>;
  label: string;
  placeholder?: string;
  type?: string;
  options?: { value: string; label: string }[];
}

export interface Step {
  id: number;
  label?: string;
  description?: string;
  fields: Field[];
}

export interface RegisterEmployeeField {
  id: keyof z.infer<typeof RegisterEmployeeSchema>;
  label: string;
  placeholder?: string;
  type?: string;
  options?: { value: string; label: string }[];
}

export interface RegisterEmployeeStep {
  id: number;
  label?: string;
  description?: string;
  fields: RegisterEmployeeField[];
}

export interface TabTypeObjectKeyType {
  [key: string]: any;
}

export interface TabType {
  label: string;
  Content: (props: TabTypeObjectKeyType) => JSX.Element;
}

export interface CategoryType {
  categoryName: string;
  procedures: string[];
}
