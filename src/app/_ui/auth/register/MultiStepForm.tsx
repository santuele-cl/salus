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
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/app/_schemas/zod/schema";
import { STEPS } from "@/app/_data/constant";

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStepDetails = STEPS[activeStep];

  const totalSteps = STEPS.length;
  const isLastStep = activeStep === totalSteps - 1;

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const next = async () => {
    // const activeFields = currentStepDetails.fields.map((field) => field.id);
    // const output = await trigger(activeFields, {
    //   shouldFocus: true,
    // });

    // if (!output) return;

    if (activeStep < totalSteps - 1) setActiveStep((prevStep) => prevStep + 1);
  };

  const previous = () => {
    if (activeStep > 0) setActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  console.log(errors);
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
                    ({ label, id, placeholder }) => (
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
                    )
                  )}
                </Grid2>
              </Stack>
            </Box>
            {/* STEP NAVIGATION */}
            <Stack direction="row">
              <Button onClick={previous} disabled={activeStep === 0}>
                Back
              </Button>
              {isLastStep ? (
                <Button>Confirm</Button>
              ) : (
                <Button onClick={next}>Next</Button>
              )}
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};
export default MultiStepForm;
