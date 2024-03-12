"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";

import FormStatusText from "./FormStatusText";
import { ResetPasswordSchema } from "../../_schemas/zod/schema";
import { login, resetPassword } from "@/actions/auth";
import Link from "next/link";

const ResetPasswordForm = () => {
  const [pending, setPending] = useState(false);
  // const [isPending, startTransistion] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    setPending(true);
    setError("");
    setSuccess("");

    const res = await resetPassword(data);
    if (res?.error) setError(res.error);
    if (res?.success) setSuccess(res.success);

    setPending(false);
  };

  return (
    <Stack gap={2}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="email"
          label="Email"
          {...register("email")}
          error={errors.email ? true : false}
          helperText={errors.email?.message}
          placeholder="example@email.com"
        />

        <Button type="submit" variant="contained" disabled={pending}>
          Send reset email
        </Button>
        <Button>
          <Link href="/auth/login">Login</Link>
        </Button>
      </Box>
      {success && <FormStatusText message={success} status="success" />}
      {error && <FormStatusText message={error} status="error" />}
    </Stack>
  );
};
export default ResetPasswordForm;
