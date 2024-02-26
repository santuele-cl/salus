"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import FormStatusText from "./FormStatusText";
import { createUser } from "@/actions/auth";
import { useState } from "react";
import { RegisterSchema } from "../../_schemas/zod/schema";
import MultiStepForm from "./register/MultiStepForm";

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

  console.log("register errors", errors);

  const onSubmit = async (data: any) => {
    setError("");
    setSuccess("");

    setPending(true);

    const { error, success } = await createUser(data);
    if (error) setError(error);
    if (success) setSuccess(success);

    setPending(false);
  };

  return (
    <Box
      sx={{
        // display: "flex",
        // alignContent: "stretch",
        // justifySelf: "stretch",

        // border: "1px solid green",
        // alignItems: "center",
        // justifyContent: "center",
        height: "100%",
        // width: "100%",
      }}
    >
      <MultiStepForm />
    </Box>
  );
};
export default RegisterForm;
