"use client";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FamilyMedicalHistorySchema } from "@/app/_schemas/zod/schema";
import FormStatusText from "@/app/_ui/auth/FormStatusText";
import { useSession } from "next-auth/react";
import { addFamilyMedicalHistory } from "@/actions/patients/family-medical-history";

interface FamilyMedicalHistoryFieldType {
  id: keyof z.infer<typeof FamilyMedicalHistorySchema>;
  label: string;
  type?: string;
}

const fields: FamilyMedicalHistoryFieldType[] = [
  { id: "condition", label: "Condition" },
  { id: "relationship", label: "Relationship" },
  { id: "ageOfOnset", label: "Age of Onset", type: "number" },
];

const FamilyMedicalHistoryForm = ({
  patientId,
  setShow,
}: {
  patientId: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useSession();

  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof FamilyMedicalHistorySchema>>({
    resolver: zodResolver(FamilyMedicalHistorySchema),
    defaultValues: {
      condition: "",
      relationship: "",
      ageOfOnset: 0,
      patientId,
    },
  });

  const onSubmit = async (values: any) => {
    const parse = FamilyMedicalHistorySchema.safeParse(values);

    if (!parse.success) console.log("parse error");
    else console.log("parse data", parse.data);

    setError("");
    setSuccess("");

    setPending(true);

    try {
      const res = await addFamilyMedicalHistory(values);
      if (res?.error) {
        reset();
        setError(res.error);
      }
      if (res?.success) {
        reset();
        setSuccess(res.success);
      }
    } catch {
      setError("Something went asd wrong!");
    } finally {
      setPending(false);
    }
  };

  console.log("form error", errors);

  return (
    <Box sx={{ p: 3, width: 450 }}>
      <Typography variant="h6">Family Medical History Form</Typography>
      <Divider sx={{ my: 2 }} />
      <Stack sx={{ my: 1 }}>
        {!session.data?.user.empId && (
          <FormStatusText
            message="Forbidden. Action not allowed!"
            status="error"
          />
        )}
        {error && <FormStatusText message={error} status="error" />}
        {success && <FormStatusText message={success} status="success" />}
      </Stack>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{}}
      >
        {fields.map(({ id, label, type = "" }, index) => {
          if (type === "number") {
            return (
              <TextField
                type="number"
                key={id + index}
                label={label}
                {...register(id)}
                error={errors[id] ? true : false}
                helperText={errors[id]?.message}
                disabled={pending}
              />
            );
          } else if (type === "date") {
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
        <TextField
          label="Patient ID"
          {...register("patientId")}
          error={errors["patientId"] ? true : false}
          helperText={errors["patientId"]?.message}
          InputProps={{ readOnly: true, disabled: true }}
        />
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
          onClick={() => setShow(false)}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};
export default FamilyMedicalHistoryForm;
