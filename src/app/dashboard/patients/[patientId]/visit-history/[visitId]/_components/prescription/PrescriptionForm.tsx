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
import { PrescriptionSchema } from "@/app/_schemas/zod/schema";
import { camelCaseToWords } from "@/app/_utils/utils";
import { addVitals } from "@/actions/patients/vitals";
import FormStatusText from "@/app/_ui/auth/FormStatusText";
import { addPrescription } from "@/actions/patients/prescriptions";
import { Drugs } from "@prisma/client";
import DrugsOptions from "../DrugsOptions";
import { useSession } from "next-auth/react";
import { getDrugs } from "@/actions/drugs";

interface PrescriptionFieldType {
  id: keyof z.infer<typeof PrescriptionSchema>;
  label: string;
  type?: string;
}

const fields: PrescriptionFieldType[] = [
  { id: "dosage", label: "Dosage", type: "number" },
  { id: "frequencyPerDay", label: "Frequency", type: "number" },
  { id: "takenEveryHour", label: "Taken every", type: "number" },
  { id: "notes", label: "Notes" },
  { id: "durationInDays", label: "Duration", type: "number" },
  { id: "startDate", label: "Start Date", type: "date" },
  { id: "endDate", label: "End Date", type: "date" },
];

const hiddenFields = [""];

const PrescriptionForm = ({
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
  const [drugs, setDrugs] = useState<Drugs[] | undefined>([]);

  const [options, setOptions] = useState<string[] | []>([]);
  console.log("drugs", drugs);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(PrescriptionSchema),
    defaultValues: {
      drugsId: "",
      dosage: null,
      durationInDays: null,
      endDate: "",
      frequencyPerDay: null,
      notes: "",
      startDate: "",
      takenEveryHour: null,
      physicianId: session.data?.user.empId,
      patientId,
      ...(visitId && { visitId }),
    },
  });

  const onSubmit = async (values: any) => {
    // console.log("values", values);
    console.log("prescription values", values);
    const parse = PrescriptionSchema.safeParse(values);

    if (!parse.success) console.log("parse error");
    else console.log("parse data", parse.data);

    setError("");
    setSuccess("");

    setPending(true);

    try {
      const res = await addPrescription(values);
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

  useEffect(() => {
    async function generateDrugs() {
      const res = await getDrugs();
      if (res.success) {
        const filteredData = res.data.map((datum) => datum.name);
        setOptions(filteredData);
        setDrugs(res.data);
      }
    }

    generateDrugs();
  }, []);

  console.log("form error", errors);

  return (
    <Box sx={{ p: 3, width: 450 }}>
      <Typography variant="h6">Prescription</Typography>
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
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{}}
      >
        {drugs && drugs.length ? (
          <TextField
            select
            label="Drug"
            defaultValue={drugs[0].id}
            error={errors["drugsId"] ? true : false}
            helperText={errors["drugsId"]?.message}
            {...register("drugsId")}
          >
            {drugs.map((drug) => (
              <MenuItem key={drug.id} value={drug.id}>
                {drug.name}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <Typography>Loading</Typography>
        )}
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
export default PrescriptionForm;
