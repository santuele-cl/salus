"use client";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, Modal, Stack } from "@mui/material";
import { useState } from "react";
import AddDrugForm from "./AddDrugForm";
// import AddServiceDepartmentsForm from "./AddServiceDepartmentForm";

export default function AddDrugFormModal() {
  const [open, setOpen] = useState(false);
  return (
    <Stack>
      <Button
        startIcon={<AddOutlinedIcon />}
        variant="contained"
        size="large"
        onClick={() => setOpen(true)}
      >
        Add Drug
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <AddDrugForm setOpen={setOpen} />
        </Stack>
      </Modal>
    </Stack>
  );
}
