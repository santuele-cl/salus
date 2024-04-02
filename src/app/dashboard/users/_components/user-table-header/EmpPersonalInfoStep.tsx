"use client";

import { getEmployeeRoles } from "@/actions/users/employee-role";
import { getServiceDeparments } from "@/actions/users/service-department";
import { RegisterEmployeeStep } from "@/app/_data/types";
import { MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import {
  ClinicalDepartment,
  EmployeeRole,
  ServiceDepartment,
} from "@prisma/client";
import { useEffect, useState } from "react";

const currentStepDetails: RegisterEmployeeStep = {
  id: 0,
  label: "Personal Information",
  description: "Input the personal information of the user",
  fields: [
    { id: "fname", label: "First Name" },
    { id: "mname", label: "Middle Name" },
    { id: "lname", label: "Last Name" },
    {
      id: "gender",
      label: "Gender",
      type: "select",
      options: [
        { value: "MALE", label: "Male" },
        { value: "FEMALE", label: "Female" },
        { value: "PREFER_NOT_TO_SAY", label: "Prefer not to say" },
      ],
    },
    { id: "bdate", label: "Birthdate", type: "date" },
    { id: "age", label: "Age", type: "number" },
  ],
};

const EmpPersonalInfoStep = ({
  register,
  errors,
}: {
  register: any;
  errors: any;
}) => {
  return (
    <>
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
                  InputProps={{
                    style: { textTransform: "capitalize" },
                  }}
                  fullWidth
                >
                  {options &&
                    options?.map(({ label, value }, i) => (
                      <MenuItem value={value} key={i} defaultChecked={i === 0}>
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
          } else if (type === "password") {
            return (
              <Grid2 xs={12} sm={6} key={id}>
                <TextField
                  label={label}
                  type="password"
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
    </>
  );
};
export default EmpPersonalInfoStep;
