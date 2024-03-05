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
import { PrescriptionSchema } from "@/app/_schemas/zod/schema";
import { camelCaseToWords } from "@/app/_utils/utils";
import { addVitals } from "@/actions/patients/vitals";
import FormStatusText from "@/app/_ui/auth/FormStatusText";

const fields = Object.keys(PrescriptionSchema.shape) as Array<
  keyof z.infer<typeof PrescriptionSchema>
>;

const PrescriptionForm = ({
  visitId,
  setShowPrescriptionFormDrawer,
}: {
  visitId: string;
  setShowPrescriptionFormDrawer: Dispatch<SetStateAction<boolean>>;
}) => {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(PrescriptionSchema),
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
    // setError("");
    // setSuccess("");

    // setPending(true);

    // try {
    //   const res = await addVitals(visitId, data);
    //   if (res?.error) {
    //     reset();
    //     setError(res.error);
    //   }
    //   if (res?.success) {
    //     reset();
    //     setSuccess(res.success);
    //   }
    // } catch {
    //   setError("Something went asd wrong!");
    // } finally {
    //   setPending(false);
    // }
  };

  return (
    <Box sx={{ p: 3, width: 450 }}>
      <Typography variant="h6">Vital Signs</Typography>
      <Divider sx={{ my: 2 }} />
      <Stack sx={{ my: 1 }}>
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
          variant="contained"
          disabled={pending}
          sx={{ p: 2 }}
        >
          Add
        </Button>
        <Button
          variant="outlined"
          disabled={pending}
          sx={{ p: 2 }}
          onClick={() => setShowPrescriptionFormDrawer(false)}
        >
          Canceld
        </Button>
      </Stack>
    </Box>
  );
};
export default PrescriptionForm;
