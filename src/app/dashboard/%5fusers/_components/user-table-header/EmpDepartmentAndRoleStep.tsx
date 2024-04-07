"use client";

import { getClinicalDepartments } from "@/actions/departments/clinical-departments";
import { getEmployeeRoles } from "@/actions/users/employee-role";
import { getServiceDeparments } from "@/actions/users/service-department";
import { MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import {
  ClinicalDepartment,
  EmployeeRole,
  ServiceDepartment,
} from "@prisma/client";
import { useEffect, useState } from "react";

const fields = {
  id: 2,
  label: "Employment Information",
  description: "Input the role and department assignment of the employee",
  fields: [
    {
      id: "clinicalDepartmentId",
      label: "Clinical Department",
      type: "select",
    },
    {
      id: "serviceDepartmentId",
      label: "Service Department",
      type: "select",
    },
    { id: "employeeRoleId", label: "Role", type: "select" },
  ],
};

const EmpDepartmentAndRoleStep = ({
  register,
  errors,
}: {
  register: any;
  errors: any;
}) => {
  const [clinicalDepartments, setClinicalDepartments] = useState<
    ClinicalDepartment[] | null
  >();
  const [serviceDepartments, setServiceDepartments] = useState<
    ServiceDepartment[] | null
  >();
  const [employeeRoles, setEmployeeRoles] = useState<EmployeeRole[] | null>();

  useEffect(() => {
    async function fetchClinicalDepartment() {
      const res = await getClinicalDepartments();
      if (res.success) setClinicalDepartments(res.data);
    }
    async function fetchServiceDepartment() {
      const res = await getServiceDeparments();
      if (res.success) setServiceDepartments(res.data);
    }
    async function fetchEmployeeRoles() {
      const res = await getEmployeeRoles();
      if (res.success) setEmployeeRoles(res.data);
    }

    fetchClinicalDepartment();
    fetchServiceDepartment();
    fetchEmployeeRoles();
  }, []);

  return (
    <>
      <Grid2 xs={12} sm={6}>
        <TextField
          select
          label="Clinical Department"
          {...register("clinicalDepartmentId")}
          error={errors["clinicalDepartmentId"] ? true : false}
          helperText={errors["clinicalDepartmentId"]?.message as string}
          InputProps={{
            style: { textTransform: "capitalize" },
          }}
          fullWidth
        >
          {clinicalDepartments ? (
            clinicalDepartments?.map(({ name, id }, i) => (
              <MenuItem value={id} key={id} defaultChecked={i === 0}>
                {name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">Select</MenuItem>
          )}
        </TextField>
      </Grid2>
      <Grid2 xs={12} sm={6}>
        <TextField
          select
          label="Service Department"
          {...register("serviceDepartmentId")}
          error={errors["serviceDepartmentId"] ? true : false}
          helperText={errors["serviceDepartmentId"]?.message as string}
          InputProps={{
            style: { textTransform: "capitalize" },
          }}
          fullWidth
        >
          {serviceDepartments ? (
            serviceDepartments?.map(({ name, id }, i) => (
              <MenuItem value={id} key={id} defaultChecked={i === 0}>
                {name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">Select</MenuItem>
          )}
        </TextField>
      </Grid2>
      <Grid2 xs={12} sm={6}>
        <TextField
          select
          label="Role"
          {...register("employeeRoleId")}
          error={errors["employeeRoleId"] ? true : false}
          helperText={errors["employeeRoleId"]?.message as string}
          InputProps={{
            style: { textTransform: "capitalize" },
          }}
          fullWidth
        >
          {employeeRoles ? (
            employeeRoles?.map(({ roleName, id }, i) => (
              <MenuItem value={id} key={id} defaultChecked={i === 0}>
                {roleName}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">Select</MenuItem>
          )}
        </TextField>
      </Grid2>
    </>
  );
};
export default EmpDepartmentAndRoleStep;
