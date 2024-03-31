"use client";
import {
  Autocomplete,
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
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { VaccinationSchema } from "@/app/_schemas/zod/schema";
import { camelCaseToWords } from "@/app/_utils/utils";
import { addVitals } from "@/actions/patients/vitals";
import FormStatusText from "@/app/_ui/auth/FormStatusText";
import { useSession } from "next-auth/react";
import { postVaccinations } from "@/actions/patients/vaccinations";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface VaccinationFieldType {
  id: keyof z.infer<typeof VaccinationSchema>;
  label: string;
  type?: string;
}

const fields: VaccinationFieldType[] = [
  { id: "vaccineName", label: "Vaccine Name" },
  { id: "dosage", label: "Dosage" },
  { id: "administeredAt", label: "Administered At", type: "date" },
  { id: "administeredBy", label: "Administered By" },
  { id: "nextDueDate", label: "Next appointment", type: "date" },
];

const hiddenFields = [""];

const VaccinationForm = ({
  visitId,
  patientId,
  setShow,
}: {
  patientId: string;
  visitId?: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useSession();
  console.log(session);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<z.infer<typeof VaccinationSchema>>({
    resolver: zodResolver(VaccinationSchema),
    defaultValues: {
      vaccineName: "",
      dosage: "",
      administeredAt: dayjs().toDate(),
      administeredBy: "",
      nextDueDate: dayjs().toDate(),
      patientId,
    },
  });

  const onSubmit = async (values: any) => {
    // console.log("values", values);
    console.log("vaccination values", values);
    const parse = VaccinationSchema.safeParse(values);

    if (!parse.success) console.log("parse error");
    else console.log("parse data", parse.data);

    setError("");
    setSuccess("");

    setPending(true);

    try {
      const res = await postVaccinations(values);
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
      <Typography variant="h6">Vaccination</Typography>
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
              <Controller
                key={id + index}
                control={control}
                name={id}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <DatePicker
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: errors[id] ? true : false,
                          helperText: errors[id]?.message,
                        },
                      }}
                      label={label}
                      value={dayjs(field.value)}
                      inputRef={field.ref}
                      onChange={(date) => {
                        field.onChange(date?.toDate());
                      }}
                    />
                  );
                }}
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
          onClick={() => setShow(false)}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};
export default VaccinationForm;
