"use client";
import Link from "next/link";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, Modal, Stack } from "@mui/material";
import { useState } from "react";
import AddRoleForm from "./AddRoleForm";

const AddRoleFormModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <Stack>
      <Button
        startIcon={<AddOutlinedIcon />}
        variant="contained"
        size="large"
        onClick={() => setOpen(true)}
      >
        Add Role
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <AddRoleForm setOpen={setOpen} />
        </Stack>
      </Modal>
    </Stack>
  );
};
export default AddRoleFormModal;
