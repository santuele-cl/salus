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
  id: 3,
  label: "Account Details",
  description: "Input the information needed to create an account",
  fields: [
    { id: "username", label: "Username" },
    { id: "email", label: "Email" },
    { id: "password", label: "Password", type: "password" },
    { id: "confirmPassword", label: "Confirm Password", type: "password" },
  ],
};

const EmpAccountDetails = ({
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
export default EmpAccountDetails;
