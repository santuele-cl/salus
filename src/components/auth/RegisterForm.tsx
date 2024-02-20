"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@/schemas";
import { Box, Button, Stack, TextField } from "@mui/material";
import * as yup from "yup";
import FormStatusText from "../FormStatusText";
import { login } from "@/actions/auth/login";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: { email: "", password: "", fname: "", lname: "" },
  });

  // console.log("register errors", errors);

  const onSubmit = async (data: yup.InferType<typeof RegisterSchema>) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(await res.json());
    console.log("register submitted");
    // console.log("register data", data);
    // login(data);
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

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
      <FormStatusText message="hello" status="success" />
    </Stack>
  );
};
export default RegisterForm;
