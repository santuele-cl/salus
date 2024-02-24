import { Children, useState } from "react";

import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Stack,
  Box,
  Container,
  StepContent,
  TextField,
} from "@mui/material";
import PersonalInfoStep from "./PersonalInfoStep";
import AccountDetailsStep from "./AccountDetailsStep";
import ConfirmStep from "./ConfirmStep";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/app/_schemas/zod/schema";
import * as z from "zod";

interface StepFormType {
  id: number;
  label: keyof Partial<z.infer<typeof RegisterSchema>>;
}

interface STEPSType {
  id: number;
  label: string;
  form: () => React.ReactNode;
  fields: StepFormType[];
}

const STEPS: STEPSType[] = [
  {
    id: 0,
    label: "Personal Info",
    form: () => <PersonalInfoStep />,
    fields: [
      { id: 1, label: "fname" },
      { id: 2, label: "mname" },
      { id: 3, label: "lname" },
    ],
  },
  {
    id: 1,
    label: "Account Details",
    form: () => <AccountDetailsStep />,
    fields: [{ id: 1, label: "fname" }],
  },
  {
    id: 2,
    label: "Consent",
    form: () => <ConfirmStep />,
    fields: [{ id: 1, label: "fname" }],
  },
];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const totalSteps = STEPS.length;
  const isLastStep = activeStep === STEPS.length - 1;

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", fname: "", lname: "" },
  });

  const next = async () => {
    if (activeStep === 0) {
      const activeFields = STEPS[activeStep].fields.map((field) => field.label);
      const output = await trigger(activeFields);

      if (!output) return;
    }

    if (activeStep < totalSteps - 1) setActiveStep((prevStep) => prevStep + 1);
  };

  const previous = () => {
    if (activeStep > 0) setActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  console.log(errors);
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
        Register
      </Typography>
      <Box sx={{ border: "1px solid red", p: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {STEPS.map(({ label, form: Form, id }) => (
            <Step key={id}>
              <StepLabel>{label}</StepLabel>
              {/* <Form /> */}
            </Step>
          ))}
        </Stepper>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/**
           *  Personal Information
           */}
          {activeStep === 0 && (
            <>
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
            </>
          )}
          {/**
           *  Account details
           */}
          {activeStep === 1 && (
            <>
              <TextField
                label="Email"
                {...register("email")}
                error={errors.fname ? true : false}
                helperText={errors.fname?.message}
                placeholder="Juan"
              />
              <TextField
                label="Password"
                {...register("password")}
                error={errors.lname ? true : false}
                helperText={errors.lname?.message}
                placeholder="Dela Cruz"
              />
            </>
          )}
          {/**
           *  Personal Information
           */}
          {activeStep === 2 && (
            <>
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
            </>
          )}
          {/* <Button type="submit">Submit</Button> */}
        </Box>

        <Button onClick={previous} disabled={activeStep === 0}>
          Previous
        </Button>
        {isLastStep ? (
          <Button>Confirm</Button>
        ) : (
          <Button onClick={next}>Next</Button>
        )}
      </Box>
    </Container>
  );
};
export default MultiStepForm;
