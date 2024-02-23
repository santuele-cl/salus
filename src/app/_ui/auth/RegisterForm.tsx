"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField } from "@mui/material";

import FormStatusText from "./FormStatusText";
import { createUser } from "@/actions/auth";
import { useState } from "react";
import { RegisterSchema } from "../../_schemas/zod/schema";

const RegisterForm = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", fname: "", lname: "" },
  });

  // console.log("register errors", errors);

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    setPending(true);

    const { error, success } = await createUser(data);
    if (error) setError(error);
    if (success) setSuccess(success);

    setPending(false);
  };

  return (
    <Stack gap={2}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="First Name"
          {...register("fname")}
          error={errors.fname ? true : false}
          helperText={errors.fname?.message}
          placeholder="Juan"
        />
        <TextField
          label="Last Name"
          {...register("lname")}
          error={errors.lname ? true : false}
          helperText={errors.lname?.message}
          placeholder="Dela Cruz"
        />
        <TextField
          type="email"
          label="Email"
          {...register("email")}
          error={errors.email ? true : false}
          helperText={errors.email?.message}
          placeholder="example@email.com"
        />
        <TextField
          label="Password"
          {...register("password")}
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          placeholder="********"
        />

        <Button type="submit" variant="contained" disabled={pending}>
          Submit
        </Button>
      </Box>
      {(error || success) && (
        <FormStatusText
          message={error ? error : success}
          status={error ? "error" : "success"}
        />
      )}
    </Stack>
  );
};
export default RegisterForm;
