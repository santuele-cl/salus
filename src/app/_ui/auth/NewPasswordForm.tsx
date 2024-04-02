"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useState, useTransition } from "react";

import FormStatusText from "./FormStatusText";
import { NewPasswordSchema } from "../../_schemas/zod/schema";
import { updatePassword } from "@/actions/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [pending, setPending] = useState(false);
  // const [isPending, startTransistion] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { newPassword: "" },
  });

  const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
    setPending(true);
    setError("");
    setSuccess("");

    const res = await updatePassword(data, token);
    if (res?.error) setError(res.error);
    if (res?.success) setSuccess(res.success);

    setPending(false);
  };

  return (
    <Stack gap={2}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="New Password"
          {...register("newPassword")}
          error={errors.newPassword ? true : false}
          helperText={errors.newPassword?.message}
          placeholder="********"
        />

        <Button>
          <Link href="/auth/login">Login</Link>
        </Button>
        <Button type="submit" variant="contained" disabled={pending}>
          Update password
        </Button>
      </Box>
      {success && <FormStatusText message={success} status="success" />}
      {error && <FormStatusText message={error} status="error" />}
    </Stack>
  );
};
export default NewPasswordForm;
