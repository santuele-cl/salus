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
import { VitalsSchema } from "@/app/_schemas/zod/schema";
import { camelCaseToWords } from "@/app/_utils/utils";
import { addVitals } from "@/actions/patients/vitals";
import FormStatusText from "@/app/_ui/auth/FormStatusText";
import { useSession } from "next-auth/react";

// const fields = Object.keys(VitalsSchema.shape) as Array<
//   keyof z.infer<typeof VitalsSchema>
// >;

interface VitalSignsFieldType {
  id: keyof z.infer<typeof VitalsSchema>;
  label: string;
  type?: string;
}

const fields: VitalSignsFieldType[] = [
  { id: "heightInCm", label: "Height", type: "number" },
  { id: "weightInKg", label: "Weigth", type: "number" },
  { id: "bodyTemperatureInCelsius", label: "Body Temperature" },
  { id: "bloodPressure", label: "Blood Pressure" },
  { id: "pulseRate", label: "Pulse Rate" },
  { id: "respiratoryRate", label: "Respitartory Rate" },
  { id: "oxygenSaturation", label: "Oxygen Saturation" },
];

const excludedFields: Array<keyof z.infer<typeof VitalsSchema>> = [
  "checkedById",
];

const VitalSignsForm = ({
  visitId,
  setShowVitalSignsForm,
}: {
  visitId: string;
  setShowVitalSignsForm: Dispatch<SetStateAction<boolean>>;
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
      checkedById: session.data?.user.empId,
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
          onClick={() => setShowVitalSignsForm(false)}
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
