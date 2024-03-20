"use client";

import { ClinicalDepartmentSchema } from "@/app/_schemas/zod/schema";
import FormStatusText from "@/app/_ui/auth/FormStatusText";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ClinicalDepartment } from "@prisma/client";
import { updateClinicalDepartment } from "@/actions/departments/clinical-departments";

export default function EditClinicalDeparmentForm({
  setOpen,
  clinicalDepartment,
}: {
  clinicalDepartment: ClinicalDepartment;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof ClinicalDepartmentSchema>>({
    resolver: zodResolver(ClinicalDepartmentSchema),
    defaultValues: {
      id: clinicalDepartment.id,
      name: clinicalDepartment.name,
      head: clinicalDepartment.head,
      description: clinicalDepartment.description || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ClinicalDepartmentSchema>) => {
    setPending(true);
    setError("");
    setSuccess("");
    try {
      const res = await updateClinicalDepartment(clinicalDepartment.id, data);
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
    <Paper sx={{ p: 3, width: 450 }}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h6">Edit Clinical Department</Typography>
        <IconButton onClick={() => setOpen(false)} color="error" size="small">
          <CloseOutlinedIcon fontSize="medium" />
        </IconButton>
      </Stack>

      <Divider sx={{ my: 2 }} />
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
        <TextField
          label="Department ID"
          {...register("id")}
          error={errors.id ? true : false}
          helperText={errors.id?.message}
          disabled={isSubmitting}
        />
        <TextField
          label="Department Name"
          {...register("name")}
          error={errors.name ? true : false}
          helperText={errors.name?.message}
          disabled={isSubmitting}
        />
        <TextField
          label="Department Head"
          {...register("head")}
          error={errors.head ? true : false}
          helperText={errors.head?.message}
          disabled={isSubmitting}
        />
        <TextField
          label="Description"
          {...register("description")}
          error={errors.description ? true : false}
          helperText={errors.description?.message}
          disabled={isSubmitting}
        />

        {error && <FormStatusText message={error} status="error" />}
        {success && <FormStatusText message={success} status="success" />}
        <Button
          variant="outlined"
          disabled={isSubmitting}
          sx={{ p: 2 }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ p: 2 }}
        >
          Update
        </Button>
      </Stack>
    </Paper>
  );
}
