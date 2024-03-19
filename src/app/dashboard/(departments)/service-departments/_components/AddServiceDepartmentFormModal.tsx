"use client";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, Modal, Stack } from "@mui/material";
import { useState } from "react";
import AddServiceDepartmentsForm from "./AddServiceDepartmentForm";

export default function AddServiceDepartmentFormModal() {
  const [open, setOpen] = useState(false);
  return (
    <Stack>
      <Button
        startIcon={<AddOutlinedIcon />}
        variant="contained"
        size="large"
        onClick={() => setOpen(true)}
      >
        Add Service Department
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <AddServiceDepartmentsForm setOpen={setOpen} />
        </Stack>
      </Modal>
    </Stack>
  );
}
