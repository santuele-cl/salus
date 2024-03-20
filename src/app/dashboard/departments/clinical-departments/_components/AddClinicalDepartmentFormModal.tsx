"use client";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, Modal, Stack } from "@mui/material";
import { useState } from "react";
import AddClinicalDepartmentsForm from "./AddClinicalDepartmentsForm";

const AddClinicalDepartmentFormModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <Stack>
      <Button
        startIcon={<AddOutlinedIcon />}
        variant="contained"
        size="large"
        onClick={() => setOpen(true)}
      >
        Add Clinical Deparment
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <AddClinicalDepartmentsForm setOpen={setOpen} />
        </Stack>
      </Modal>
    </Stack>
  );
};
export default AddClinicalDepartmentFormModal;
