import { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Stack,
  Box,
  TextField,
  Paper,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/app/_schemas/zod/schema";
import { STEPS } from "@/app/_data/constant";
import { createUser } from "@/actions/auth";
import FormStatusText from "../FormStatusText";
import Consent from "./Consent";

const MultiStepForm = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [activeStep, setActiveStep] = useState(3);
  const currentStepDetails = STEPS[activeStep];

  const totalSteps = STEPS.length;
  const isLastStep = activeStep === totalSteps - 1;

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    control,
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

  const onSubmit = async (values: any) => {
    const validatedFields = RegisterSchema.safeParse(values);
    // console.log(val);
    // console.log("data", data);
    setError("");
    setSuccess("");

    if (validatedFields.success) {
      setPending(true);

      const { error, success } = await createUser(validatedFields.data);
      if (error) setError(error);
      if (success) setSuccess(success);

      setPending(false);
      // if (success) {
      //   reset();
      //   setActiveStep(0);
      // }
    }
  };

  // console.log("errors", errors);
  // console.log(getValues());
  return (
    <Paper
      elevation={3}
      sx={{
        // border: "1px solid orange",
        height: "100%",
      }}
    >
      <Stack height="100%">
        {/* STEPPER NAV */}
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ p: 4, pb: 1, height: "120px" }}
        >
          {STEPS.map(({ label, id }) => (
            <Step key={id}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* FORM */}
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          p={4}
          pt={1}
          spacing={2}
          flexGrow="1"
          flexShrink="1"
          // sx={{
          // overflowY: "auto",
          // }}
          // overflowY="auto"
          height="450px"
          justifyContent="space-between"
        >
          <Box
            sx={{
              // maxHeight: "320px",
              overflowY: "auto",
              p: 2,
            }}
          >
            <Stack gap={4}>
              <Stack>
                <Typography variant="h5">{currentStepDetails.label}</Typography>
                <Typography color="gray.main">
                  {currentStepDetails.description}
                </Typography>
              </Stack>
              <Grid2 container direction="row" spacing={3}>
                {currentStepDetails.fields.map(
                  ({ label, id, placeholder, type, options }) => {
                    if (type === "select") {
                      return (
                        <Grid2 xs={12} sm={6} key={id}>
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
                        <Grid2 xs={12} sm={6} key={id}>
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
                        <Grid2 xs={12} sm={6} key={id}>
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
                    } else if (type === "checkbox") {
                      return (
                        <Grid2 xs={12} key={id} width="100%">
                          <Consent />
                        </Grid2>
                      );
                    }
                    return (
                      <Grid2 xs={12} sm={6} key={id}>
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
          {isLastStep && (
            <Box sx={{ p: 2 }}>
              {currentStepDetails.fields.map(({ id, label }, i) => (
                <FormGroup key={i}>
                  <FormControlLabel
                    {...register(id)}
                    control={<Checkbox />}
                    label={label}
                  />
                </FormGroup>
              ))}
            </Box>
          )}
          {/* STEP NAVIGATION */}
          <Stack
            direction="row"
            p={1}
            justifyContent={activeStep !== 0 ? "space-between" : "flex-end"}
            height="50px"
          >
            {activeStep !== 0 && (
              <Button
                onClick={previous}
                disabled={activeStep === 0}
                variant="outlined"
              >
                Back
              </Button>
            )}
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
      </Stack>
    </Paper>
  );
};
export default MultiStepForm;
