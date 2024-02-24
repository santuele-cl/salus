import { RegisterSchema } from "../_schemas/zod/schema";
import * as z from "zod";

interface Field {
  id: keyof z.infer<typeof RegisterSchema>;
  label: string;
  placeholder?: string;
  type?: string;
}

interface Step {
  id: number;
  label: string;
  description: string;
  fields: Field[];
}
