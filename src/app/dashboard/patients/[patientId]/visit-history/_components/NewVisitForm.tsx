"use client";

import { VisitSchema } from "@/app/_schemas/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const NewVisitForm = () => {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showTwoFactorInput, setShowTwoFactorInput] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(VisitSchema),
    defaultValues: { accompaniedBy: "", chiefComplaint: "", hpi: "" },
  });

  const onSubmit = async (data: z.infer<typeof VisitSchema>) => {
    // setPending(true);
    // setError("");
    // setSuccess("");

    // try {
    //   const res = await login(data, callbackUrl);
    //   console.log("res", res);

    //   if (res?.error) {
    //     reset();
    //     setError(res.error);
    //   }

    //   if (res?.success) {
    //     reset();
    //     setSuccess(res.success);
    //   }

    //   if (res.twoFactor) setShowTwoFactorInput(true);
    // } catch {
    //   setError("Something went asd wrong!");
    // }

    // setPending(false);
    console.log("New visit form submitted");
  };
  return (
    <Box sx={{ p: 3, width: 450 }}>
      <Typography variant="h6">Visit Form</Typography>
      <hr />
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{}}
      >
        <TextField
          label="Accompanied by"
          {...register("accompaniedBy")}
          error={errors.accompaniedBy ? true : false}
          helperText={errors.accompaniedBy?.message}
          // placeholder="123456"
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
          label="Chief Complaint"
          {...register("chiefComplaint")}
          error={errors.chiefComplaint ? true : false}
          helperText={errors.chiefComplaint?.message}
          placeholder="123456"
          disabled={pending}
        />
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
export default NewVisitForm;
