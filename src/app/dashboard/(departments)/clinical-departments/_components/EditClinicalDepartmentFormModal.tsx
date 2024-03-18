"use client";
import { IconButton, Modal, Stack } from "@mui/material";
import { useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { ClinicalDepartment, EmployeeRole } from "@prisma/client";
import EditClinicalDeparmentForm from "./EditClinicalDeparmentForm";

export default function EditClinicalDepartmentFormModal({
  clinicalDepartment,
}: {
  clinicalDepartment: ClinicalDepartment;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Stack>
      <IconButton onClick={() => setOpen(true)}>
        <ModeEditOutlinedIcon />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <EditClinicalDeparmentForm
            setOpen={setOpen}
            clinicalDepartment={clinicalDepartment}
          />
        </Stack>
      </Modal>
    </Stack>
  );
}
