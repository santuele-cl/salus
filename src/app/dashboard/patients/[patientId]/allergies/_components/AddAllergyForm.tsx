"use client";

import { addAllergy } from "@/actions/patients/allergies";
import { AllergySchema } from "@/app/_schemas/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AllergySeverity } from "@prisma/client";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const AddAllergyForm = ({
  patientId,
  setShowAddAllergyForm,
}: {
  patientId: string;
  setShowAddAllergyForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<z.infer<typeof AllergySchema>>({
    resolver: zodResolver(AllergySchema),
    defaultValues: {
      name: "",
      description: "",
      severity: AllergySeverity.MEDIUM,
      //   dateDiagnosed: dayjs().format("YYYY-MM-DD").toString(),
      patientId,
    },
  });

  console.log(dayjs().format("YYYY-MM-DD").toString());
  console.log(errors);

  const onSubmit = async (data: z.infer<typeof AllergySchema>) => {
    setPending(true);
    setError("");
    setSuccess("");
    try {
      const res = await addAllergy(data);
      console.log("res", res);
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
  return (
    <Box sx={{ p: 3, width: 450 }}>
      <Typography variant="h6">Checkup Information</Typography>
      <Divider sx={{ my: 2 }} />
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{}}
      >
        <TextField
          label="Name"
          {...register("name")}
          error={errors.name ? true : false}
          helperText={errors.name?.message}
          disabled={pending}
        />
        <TextField
          label="Description"
          {...register("description")}
          error={errors.description ? true : false}
          helperText={errors.description?.message}
          disabled={pending}
        />
        <TextField
          label="Severity"
          {...register("severity")}
          error={errors.severity ? true : false}
          helperText={errors.severity?.message}
          disabled={pending}
        />
        <TextField
          label="Date diagnosed"
          type="date"
          defaultValue={dayjs().format("YYYY-MM-DD").toString()}
          {...register("dateDiagnosed", { valueAsDate: true })}
          error={errors.dateDiagnosed ? true : false}
          helperText={errors.dateDiagnosed?.message}
          disabled={pending}
        />
        <TextField
          label="Patient ID"
          {...register("patientId")}
          defaultValue={patientId}
          InputProps={{ disabled: true }}
          hidden
          error={errors.patientId ? true : false}
          helperText={errors.patientId?.message}
          disabled={pending}
        />
        <Button
          variant="outlined"
          disabled={pending}
          sx={{ p: 2 }}
          onClick={() => setShowAddAllergyForm(false)}
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

export default AddAllergyForm;
