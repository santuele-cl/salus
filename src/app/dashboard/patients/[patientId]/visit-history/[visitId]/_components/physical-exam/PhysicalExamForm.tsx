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
import { PhysicalExaminationSchema } from "@/app/_schemas/zod/schema";
import FormStatusText from "@/app/_ui/auth/FormStatusText";
import { useSession } from "next-auth/react";
import { addPhysicalExamination } from "@/actions/patients/physical-examinations";
import { PhysicalPart } from "@prisma/client";

interface PhysicalExaminationFormFieldType {
  id: keyof z.infer<typeof PhysicalExaminationSchema>;
  label: string;
  type?: string;
}

const physicalParts = Object.keys(PhysicalPart) as Array<PhysicalPart>;

const fields: PhysicalExaminationFormFieldType[] = [
  { id: "specifyIfOther", label: "Specify (if not on the list)" },
  { id: "remarks", label: "Remarks" },
];

const PhysicalExamForm = ({
  visitId,
  patientId,
  setShowPhysicalExamDrawer,
}: {
  visitId: string;
  patientId: string;
  setShowPhysicalExamDrawer: Dispatch<SetStateAction<boolean>>;
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
  } = useForm({
    resolver: zodResolver(PhysicalExaminationSchema),
    defaultValues: {
      physicalPart: "",
      specifyIfOther: "",
      remarks: "",
      isNormal: "",
      visitId,
      patientId,
    },
  });

  console.log("physical exam errors", errors);

  const onSubmit = async (data: any) => {
    // console.log(data);
    setError("");
    setSuccess("");

    setPending(true);

    try {
      const res = await addPhysicalExamination(data);
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
      <Typography variant="h6">Physical Examination</Typography>
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
        <TextField
          select
          label="Physical Parts"
          error={errors["physicalPart"] ? true : false}
          helperText={errors["physicalPart"]?.message}
          {...register("physicalPart")}
        >
          {physicalParts.map((physicalPart) => (
            <MenuItem key={physicalPart} value={physicalPart}>
              {physicalPart}
            </MenuItem>
          ))}
        </TextField>
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
          select
          label="Is normal"
          error={errors["isNormal"] ? true : false}
          helperText={errors["isNormal"]?.message}
          {...register("isNormal")}
        >
          <MenuItem value="true">Normal</MenuItem>
          <MenuItem value="false">Not normal</MenuItem>
        </TextField>
        {/* {fields.map((field, index) => {
          if (excludedFields.includes(field)) return;
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
        })} */}

        <Button
          onClick={() => setShowPhysicalExamDrawer(false)}
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
export default PhysicalExamForm;
