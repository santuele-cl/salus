"use client";

import { createVisit } from "@/actions/patients/visits";
import { getPhysicianIds } from "@/actions/users/users";
import { VisitSchema } from "@/app/_schemas/zod/schema";
import AutoComplete from "@/app/_ui/AutoComplete";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const NewVisitForm = ({
  patientId,
  setShowVisitForm,
}: {
  patientId: string;
  setShowVisitForm: Dispatch<SetStateAction<boolean>>;
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
    control,
  } = useForm({
    resolver: zodResolver(VisitSchema),
    defaultValues: {
      accompaniedBy: "",
      chiefComplaint: "",
      hpi: "",
      physicianId: "",
      nurseId: session.data?.user.empId!,
    },
  });

  const onSubmit = async (data: z.infer<typeof VisitSchema>) => {
    // console.log("form data : ", data);

    setPending(true);
    setError("");
    setSuccess("");
    try {
      const res = await createVisit(patientId, data);
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

  const [employees, setEmployees] = useState<{ name: string; id: string }[]>(
    []
  );

  useEffect(() => {
    async function fetchEmployees() {
      const res = await getPhysicianIds();
      if (res?.data) setEmployees(res.data);
    }
    fetchEmployees();
  }, []);
  console.log("form errors : ", errors);

  return (
    <Box sx={{ p: 3, width: 450 }}>
      <Typography variant="h6">Checkup Information</Typography>
      <Divider sx={{ my: 2 }} />
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{}}
      >
        <TextField
          label="Chief Complaint"
          {...register("chiefComplaint")}
          error={errors.chiefComplaint ? true : false}
          helperText={errors.chiefComplaint?.message}
          placeholder="123456"
          disabled={pending}
        />
        <TextField
          label="History of Present Illness"
          {...register("hpi")}
          error={errors.hpi ? true : false}
          helperText={errors.hpi?.message}
          disabled={pending}
        />
        <TextField
          label="Accompanied by"
          {...register("accompaniedBy")}
          error={errors.accompaniedBy ? true : false}
          helperText={errors.accompaniedBy?.message}
          disabled={pending}
        />
        {/* <TextField
          label="Assign to"
          {...register("physicianId")}
          error={errors.physicianId ? true : false}
          helperText={errors.physicianId?.message}
          disabled={pending}
        /> */}
        <AutoComplete
          // required={required}
          control={control}
          name="physicianId"
          options={employees}
          labelIdentifier="name"
          valueIdentifier="id"
          fieldLabel="Assign to"
        />
        <Button
          variant="outlined"
          disabled={pending}
          sx={{ p: 2 }}
          onClick={() => setShowVisitForm(false)}
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
export default NewVisitForm;
