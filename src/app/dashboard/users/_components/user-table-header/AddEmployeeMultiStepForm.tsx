"use client";
import { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterEmployeeSchema } from "@/app/_schemas/zod/schema";
import { EMP_STEPS } from "@/app/_data/constant";
import { createEmployee, createUser } from "@/actions/auth";
import FormStatusText from "@/app/_ui/auth/FormStatusText";
import { z } from "zod";
import EmpPersonalInfoStep from "./EmpPersonalInfoStep";
import EmpContactInfoStep from "./EmpContactInfoStep";
import EmpDepartmentAndRoleStep from "./EmpDepartmentAndRoleStep";
import EmpAccountDetails from "./EmpAccountDetails";

const AddEmployeeMultiStepForm = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [activeStep, setActiveStep] = useState(0);
  const currentStepDetails = EMP_STEPS[activeStep];

  const totalSteps = EMP_STEPS.length;
  const isLastStep = activeStep === totalSteps - 1;

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterEmployeeSchema>>({
    resolver: zodResolver(RegisterEmployeeSchema),
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

  const onSubmit = async (values: z.infer<typeof RegisterEmployeeSchema>) => {
    const validatedFields = RegisterEmployeeSchema.safeParse(values);
    // console.log(val);
    // console.log("data", data);
    setError("");
    setSuccess("");
    if (validatedFields.success) {
      setPending(true);
      const { error, success } = await createEmployee(validatedFields.data);
      if (error) setError(error);
      if (success) setSuccess(success);
      setPending(false);
      if (success) {
        reset();
        setActiveStep(0);
      }
    }
  };

  return (
    <Stack height="100%">
      {/* STEPPER NAV */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ p: 4, pb: 1, height: "120px" }}
      >
        {EMP_STEPS.map(({ label, id }) => (
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
        height="450px"
        justifyContent="space-between"
      >
        <Box
          sx={{
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
              {activeStep === 0 && (
                <EmpPersonalInfoStep register={register} errors={errors} />
              )}
              {activeStep === 1 && (
                <EmpContactInfoStep register={register} errors={errors} />
              )}
              {activeStep === 2 && (
                <EmpDepartmentAndRoleStep register={register} errors={errors} />
              )}
              {activeStep === 3 && (
                <EmpAccountDetails register={register} errors={errors} />
              )}
            </Grid2>
          </Stack>
        </Box>

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
  );
};
export default AddEmployeeMultiStepForm;
