"use client";

import { createVisit } from "@/actions/patients/visits";
import { addRole, updateRole } from "@/actions/roles-and-permissions";
import { RoleSchema } from "@/app/_schemas/zod/schema";
import FormStatusText from "@/app/_ui/auth/FormStatusText";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { EmployeeRole } from "@prisma/client";

const EditRoleForm = ({
  setOpen,
  role,
}: {
  role: EmployeeRole;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(RoleSchema),
    defaultValues: { id: role.id, roleName: role.roleName },
  });

  const onSubmit = async (data: z.infer<typeof RoleSchema>) => {
    setPending(true);
    setError("");
    setSuccess("");
    try {
      const res = await updateRole(role.id, data);
      console.log("res", res);
      if (res?.error) {
        reset();
        setError(res.error);
      }
      if (res?.success) {
        reset();
        setSuccess(res.success);
      }
    } catch {
      setError("Something went wrong!");
    } finally {
      setPending(false);
    }
  };
  return (
    <Paper sx={{ p: 3, width: 450 }}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h6">Edit Role</Typography>
        <IconButton onClick={() => setOpen(false)} color="error" size="small">
          <CloseOutlinedIcon fontSize="medium" />
        </IconButton>
      </Stack>

      <Divider sx={{ my: 2 }} />
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
        <TextField
          label="Role ID"
          {...register("id")}
          error={errors.id ? true : false}
          helperText={errors.id?.message}
          disabled={isSubmitting}
        />
        <TextField
          label="Role Name"
          {...register("roleName")}
          error={errors.roleName ? true : false}
          helperText={errors.roleName?.message}
          disabled={isSubmitting}
        />

        {error && <FormStatusText message={error} status="error" />}
        {success && <FormStatusText message={success} status="success" />}
        <Button
          variant="outlined"
          disabled={isSubmitting}
          sx={{ p: 2 }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ p: 2 }}
        >
          Update
        </Button>
      </Stack>
    </Paper>
  );
};
export default EditRoleForm;
