import { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Stack,
  Box,
  Container,
  TextField,
  Paper,
  MenuItem,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/app/_schemas/zod/schema";
import { STEPS } from "@/app/_data/constant";
import * as z from "zod";
import { createUser } from "@/actions/auth";
import FormStatusText from "../FormStatusText";

const MultiStepForm = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [activeStep, setActiveStep] = useState(0);
  const currentStepDetails = STEPS[activeStep];

  const totalSteps = STEPS.length;
  const isLastStep = activeStep === totalSteps - 1;

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const next = async () => {
    const activeFields = currentStepDetails.fields.map((field) => field.id);
    const output = await trigger(activeFields, {
      shouldFocus: true,
    });

    if (!output) return;

    if (activeStep < totalSteps - 1) setActiveStep((prevStep) => prevStep + 1);
  };

  const previous = () => {
    if (activeStep > 0) setActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (data: any) => {
    // const val = RegisterSchema.safeParse(data);
    // console.log(val);
    // // console.log("data", data);
    setError("");
    setSuccess("");

    setPending(true);

    const { error, success } = await createUser(data);
    if (error) setError(error);
    if (success) setSuccess(success);

    setPending(false);
    if (success) {
      reset();
      setActiveStep(0);
    }
  };

  console.log(errors);
  // console.log(getValues());
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
        Register
      </Typography>
      <Stack sx={{ border: "1px solid red", p: 4 }} spacing={2}>
        {/* STEPPER NAV */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {STEPS.map(({ label, id }) => (
            <Step key={id}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* FORM */}
        <Paper elevation={2}>
          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            p={3}
            spacing={4}
          >
            <Box>
              <Stack gap={4}>
                <Stack>
                  <Typography variant="h5">
                    {currentStepDetails.label}
                  </Typography>
                  <Typography color="gray.main">
                    {currentStepDetails.description}
                  </Typography>
                </Stack>
                <Grid2 container direction="row" spacing={3}>
                  {currentStepDetails.fields.map(
                    ({ label, id, placeholder, type, options }) => {
                      if (type === "select") {
                        return (
                          <Grid2 xs={12} md={6} key={id}>
                            <TextField
                              select
                              label={label}
                              {...register(id)}
                              error={errors[id] ? true : false}
                              helperText={errors[id]?.message as string}
                              placeholder={placeholder}
                              fullWidth
                            >
                              {options &&
                                options?.map(({ label, value }, i) => (
                                  <MenuItem
                                    value={value}
                                    key={i}
                                    defaultChecked={i === 0}
                                  >
                                    {label}
                                  </MenuItem>
                                ))}
                            </TextField>
                          </Grid2>
                        );
                      } else if (type === "date") {
                        return (
                          <Grid2 xs={12} md={6} key={id}>
                            <TextField
                              type="date"
                              label={label}
                              {...register(id)}
                              error={errors[id] ? true : false}
                              helperText={errors[id]?.message as string}
                              placeholder={placeholder}
                              fullWidth
                            />
                          </Grid2>
                        );
                      } else if (type === "number") {
                        return (
                          <Grid2 xs={12} md={6} key={id}>
                            <TextField
                              type="number"
                              label={label}
                              {...register(id)}
                              error={errors[id] ? true : false}
                              helperText={errors[id]?.message as string}
                              placeholder={placeholder}
                              fullWidth
                            />
                          </Grid2>
                        );
                      }

                      return (
                        <Grid2 xs={12} md={6} key={id}>
                          <TextField
                            label={label}
                            {...register(id)}
                            error={errors[id] ? true : false}
                            helperText={errors[id]?.message as string}
                            placeholder={placeholder}
                            fullWidth
                          />
                        </Grid2>
                      );
                    }
                  )}
                </Grid2>
              </Stack>
            </Box>
            {/* STEP NAVIGATION */}
            <Stack direction="row" justifyContent="space-between">
              <Button
                onClick={previous}
                disabled={activeStep === 0}
                variant="outlined"
              >
                Back
              </Button>
              {isLastStep ? (
                <Button variant="contained" type="submit">
                  Confirm
                </Button>
              ) : (
                <Button onClick={next} variant="contained">
                  Next
                </Button>
              )}
            </Stack>
            {(error || success) && (
              <FormStatusText
                message={error ? error : success}
                status={error ? "error" : "success"}
              />
            )}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};
export default MultiStepForm;
