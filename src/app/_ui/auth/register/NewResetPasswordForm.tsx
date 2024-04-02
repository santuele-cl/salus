"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState, useTransition } from "react";

import { resetPassword, updatePassword } from "@/actions/auth";
import {
  NewPasswordSchema,
  ResetPasswordSchema,
} from "@/app/_schemas/zod/schema";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "../../dashboard/Logo";
import FormStatusText from "../FormStatusText";

const NewResetPasswordForm = () => {
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
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, borderRadius: "8px" }}>
        <Stack spacing={3}>
          {/* HEADER */}
          <Stack spacing={3}>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              justifyContent="center"
            >
              <Link
                href="/"
                style={{ lineHeight: 0, transition: "all 2s ease" }}
              >
                <Logo size={45} />
              </Link>
              <Typography
                component={Link}
                href="/"
                mt="4px"
                variant="h4"
                textTransform="capitalize"
                sx={{ textDecoration: "none", color: "common.black" }}
                fontWeight={900}
              >
                Salus
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h4">Password Recovery</Typography>
              <Typography variant="subtitle1">
                Please input your registerd email
              </Typography>
            </Stack>
          </Stack>
          {/* FORM */}
          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={2}
            sx={{}}
          >
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
          </Stack>

          {success && (
            <FormStatusText message={success || "Success"} status="success" />
          )}
          {error && (
            <FormStatusText message={error || "Error"} status="error" />
          )}
        </Stack>
      </Paper>
    </Container>
  );
};
export default NewResetPasswordForm;
