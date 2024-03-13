"use client";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DiagnosisSchema } from "@/app/_schemas/zod/schema";
import FormStatusText from "@/app/_ui/auth/FormStatusText";
import { useSession } from "next-auth/react";
import { addDiagnosis } from "@/actions/patients/diagnosis";

interface DiagnosisFieldType {
  id: keyof z.infer<typeof DiagnosisSchema>;
  label: string;
  type?: string;
}

const fields: DiagnosisFieldType[] = [
  { id: "condition", label: "Condition" },
  { id: "diagnosisDate", label: "Date diagnosed", type: "date" },
  { id: "treatment", label: "Treatment" },
];

const hiddenFields = [""];

const DiagnosisForm = ({
  visitId,
  patientId,
  setShowDiagnosisFormDrawer,
}: {
  patientId: string;
  visitId: string;
  setShowDiagnosisFormDrawer: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useSession();
  console.log(session);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const date = new Date();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(DiagnosisSchema),
    defaultValues: {
      condition: "",
      diagnosisDate: date,
      treatment: "",
      patientId,
      visitId,
      physicianId: session.data?.user.empId,
    },
  });

  const onSubmit = async (values: any) => {
    console.log("values", values);
    console.log("prescription values", values);
    const parse = DiagnosisSchema.safeParse(values);

    if (!parse.success) return setError("Parse Error");

    setError("");
    setSuccess("");

    setPending(true);

    try {
      const res = await addDiagnosis(values);
      if (res?.error) {
        reset();
        setError(res.error);
      }
      if (res?.success) {
        reset();
        setSuccess(res.success);
      }
    } catch {
      setError("Something went wrong!");
    } finally {
      setPending(false);
    }
  };

  console.log("form error", errors);

  return (
    <Box sx={{ p: 3, width: 450 }}>
      <Typography variant="h6">Diagnosis Form</Typography>
      <Divider sx={{ my: 2 }} />
      <Stack sx={{ my: 1 }}>
        {!session.data?.user.empId && (
          <FormStatusText
            message="Forbidden. Action not allowed!"
            status="error"
          />
        )}
        {error && <FormStatusText message={error} status="error" />}
        {error && <FormStatusText message={error} status="error" />}
        {success && <FormStatusText message={success} status="success" />}
      </Stack>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
        {fields.map(({ id, label, type }, index) => {
          if (type === "date") {
            return (
              <TextField
                InputLabelProps={{ shrink: true }}
                type="date"
                key={id + index}
                label={label}
                {...register(id)}
                error={errors[id] ? true : false}
                helperText={errors[id]?.message}
                disabled={pending}
              />
            );
          }
          return (
            <TextField
              key={id + index}
              label={label}
              {...register(id)}
              error={errors[id] ? true : false}
              helperText={errors[id]?.message}
              disabled={pending}
            />
          );
        })}
        <Button
          type="submit"
          variant="contained"
          disabled={pending || !session.data?.user.empId}
          sx={{ p: 2 }}
        >
          Add
        </Button>
        <Button
          variant="outlined"
          disabled={pending}
          sx={{ p: 2 }}
          onClick={() => setShowDiagnosisFormDrawer(false)}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};
export default DiagnosisForm;
