"use client";
import { IconButton, Modal, Stack } from "@mui/material";
import { useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { ServiceDepartment } from "@prisma/client";
import EditServiceDepartmentForm from "./EditServiceDepartmentForm";

export default function EditServiceDepartmentFormModal({
  serviceDepartment,
}: {
  serviceDepartment: ServiceDepartment;
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
          <EditServiceDepartmentForm
            setOpen={setOpen}
            serviceDepartment={serviceDepartment}
          />
        </Stack>
      </Modal>
    </Stack>
  );
}
