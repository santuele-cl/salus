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

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { VitalsSchema } from "@/app/_schemas/zod/schema";
import { camelCaseToWords } from "@/app/_utils/utils";
import { addVitals } from "@/actions/patients/vitals";
import FormStatusText from "@/app/_ui/auth/FormStatusText";
const fields = Object.keys(VitalsSchema.shape) as Array<
  keyof z.infer<typeof VitalsSchema>
>;

const VitalSignsForm = ({ visitId }: { visitId: string }) => {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(VitalsSchema),
    defaultValues: {
      heightInCm: "",
      weightInKg: "",
      bodyTemperatureInCelsius: "",
      bloodPressure: "",
      pulseRate: "",
      respiratoryRate: "",
      hpi: "",
      oxygenSaturation: "",
      checkedById: "",
    },
  });

  // console.log("register errors", errors);

  const onSubmit = async (data: any) => {
    console.log(data);
    setError("");
    setSuccess("");

    setPending(true);

    try {
      const res = await addVitals(visitId, data);
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

  return (
    <Box sx={{ p: 3, width: 450 }}>
      <Typography variant="h6">Vital Signs</Typography>
      <Divider sx={{ my: 2 }} />
      <Stack>
        {error && <FormStatusText message={error} status="error" />}
        {success && <FormStatusText message={success} status="success" />}
      </Stack>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{}}
      >
        {fields.map((field, index) => {
          return (
            <TextField
              key={field + index}
              label={camelCaseToWords(field)}
              {...register(field)}
              error={errors[field] ? true : false}
              helperText={errors[field]?.message}
              disabled={pending}
            />
          );
        })}

        <Button
          type="submit"
          variant="outlined"
          disabled={pending}
          sx={{ p: 2 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={pending}
          sx={{ p: 2 }}
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};
export default VitalSignsForm;
