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
import { LaboratoryRequestSchema } from "@/app/_schemas/zod/schema";
import FormStatusText from "@/app/_ui/auth/FormStatusText";
import { Drugs, LaboratoryProcedures, LaboratoryRequest } from "@prisma/client";
import { getDrugs } from "@/actions/patients/drugs";
import { useSession } from "next-auth/react";
import { getLaboratoryProcedures } from "@/actions/patients/laboratory-procedures";
import { postLaboratoryRequest } from "@/actions/patients/laboratory-requests";

interface LaboratoryRequestFieldType {
  id: keyof z.infer<typeof LaboratoryRequestSchema>;
  label: string;
  type?: string;
}

const fields: LaboratoryRequestFieldType[] = [
  { id: "labProcedureId", label: "Dosage" },
  { id: "requestingPhysicianId", label: "Frequency" },
];

const hiddenFields = [""];

const LaboratoryRequestForm = ({
  visitId,
  patientId,
  setShowLaoratoryRequestFormDrawer,
}: {
  patientId: string;
  visitId: string;
  setShowLaoratoryRequestFormDrawer: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useSession();
  console.log(session);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [labProcedures, setLabProcedures] = useState<
    LaboratoryProcedures[] | undefined
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(LaboratoryRequestSchema),
    defaultValues: {
      labProcedureId: "",
      takenEveryHour: null,
      requestingPhysicianId: session.data?.user.empId,
      patientId,
      visitId,
    },
  });

  const onSubmit = async (values: any) => {
    // console.log("values", values);
    // console.log("prescription values", values);
    const parse = LaboratoryRequestSchema.safeParse(values);

    if (!parse.success) return setError("Parse Error");

    setError("");
    setSuccess("");

    setPending(true);

    try {
      const res = await postLaboratoryRequest(values);
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

  useEffect(() => {
    async function fetchLaboratoryProcedures() {
      const res = await getLaboratoryProcedures();
      if (res.success) {
        setLabProcedures(res.data);
      }
    }

    fetchLaboratoryProcedures();
  }, []);

  console.log("form error", errors);
  console.log(labProcedures);

  return (
    <Box sx={{ p: 3, width: 450 }}>
      <Typography variant="h6">Laboratory Request Form</Typography>
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
        {labProcedures && labProcedures.length ? (
          <TextField
            select
            label="Procedure"
            defaultValue={labProcedures[0].id}
            error={errors["labProcedureId"] ? true : false}
            helperText={errors["labProcedureId"]?.message}
            {...register("labProcedureId")}
          >
            {labProcedures.map((labProcedure) => (
              <MenuItem key={labProcedure.id} value={labProcedure.id}>
                {labProcedure.procedureName}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <Typography>Loading</Typography>
        )}

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
          onClick={() => setShowLaoratoryRequestFormDrawer(false)}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};
export default LaboratoryRequestForm;