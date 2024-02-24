"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";

import FormStatusText from "./FormStatusText";
import { LoginSchema } from "../../_schemas/zod/schema";
import { login } from "@/actions/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl");
  // const [isPending, startTransistion] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showTwoFactorInput, setShowTwoFactorInput] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", code: "" },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setPending(true);
    setError("");
    setSuccess("");

    try {
      const res = await login(data, callbackUrl);
      console.log("res", res);

      if (res?.error) {
        reset();
        setError(res.error);
      }

      if (res?.success) {
        reset();
        setSuccess(res.success);
      }

      if (res.twoFactor) setShowTwoFactorInput(true);
    } catch {
      setError("Something went asd wrong!");
    }

    setPending(false);
  };

  return (
    <Stack gap={2}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {showTwoFactorInput && (
          <TextField
            label="Two Factor Code"
            {...register("code")}
            error={errors.code ? true : false}
            helperText={errors.code?.message}
            placeholder="123456"
            disabled={pending}
          />
        )}
        {!showTwoFactorInput && (
          <>
            <TextField
              type="email"
              label="Email"
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email?.message}
              placeholder="example@email.com"
              disabled={pending}
            />
            <TextField
              label="Password"
              {...register("password")}
              error={errors.password ? true : false}
              helperText={errors.password?.message}
              placeholder="********"
              disabled={pending}
            />
          </>
        )}
        <Button>
          <Link href="/auth/reset-password">Forgot Password</Link>
        </Button>
        <Button type="submit" variant="contained" disabled={pending}>
          {showTwoFactorInput ? "Confirm" : "Login"}
        </Button>
      </Box>
      {success && <FormStatusText message={success} status="success" />}
      {error && <FormStatusText message={error} status="error" />}
    </Stack>
  );
};
export default LoginForm;
