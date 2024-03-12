"use client";

import { verify } from "@/actions/auth";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FormStatusText from "./FormStatusText";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Logo from "../dashboard/Logo";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = useCallback(async () => {
    setError("");
    setSuccess("");

    if (!token) {
      setError("Missing token!");
      return;
    }

    try {
      const data = await verify(token);

      if (data.success) setSuccess(data.success);
      if (data.error) setError(data.error);
    } catch (error) {
      setError("Something went wrong!");
    }

    // console.log(token);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, borderRadius: "8px" }}>
        <Stack spacing={3} sx={{ textAlign: "center" }}>
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
              <Typography variant="h4">Email Verification</Typography>
            </Stack>
          </Stack>
          {/* FORM */}
          {!success && !error && <p>Loading...</p>}

          {success && (
            <FormStatusText message={success || "Success"} status="success" />
          )}
          {error && (
            <FormStatusText message={error || "Error"} status="error" />
          )}
          {(success || error) && (
            <Button
              LinkComponent={Link}
              href="/auth/login"
              variant="contained"
              size="large"
            >
              Login
            </Button>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};
export default NewVerificationForm;
