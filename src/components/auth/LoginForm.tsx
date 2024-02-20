"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@/schemas";
import { Box, Button, Stack, TextField } from "@mui/material";
import * as yup from "yup";
import FormStatusText from "../FormStatusText";
import { login } from "@/actions/auth/login";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { AuthError } from "next-auth";

const LoginForm = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  console.log(success);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  // console.log("errors", errors);

  const onSubmit = async (data: yup.InferType<typeof LoginSchema>) => {
    console.log(data);
    try {
      await signIn("credentials", data);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin": {
            return { error: "Invalid credentials" };
          }
          default:
            return { error: "Something went wrong" };
        }
      }
      throw error;
    }
    // try {
    //   const res = await fetch("/api/login");
    //   console.log("login res", res);
    //   setSuccess(res.statusText);
    // } catch (err) {
    //   console.log("error", error);
    //   setSuccess(JSON.stringify(error));
    // }
    // console.log("submitted");
    // console.log("data", data);
    // login(data);
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
        <TextField
          label="Password"
          {...register("password")}
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          placeholder="********"
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
      {success && <FormStatusText message={success} status="success" />}
    </Stack>
  );
};
export default LoginForm;
