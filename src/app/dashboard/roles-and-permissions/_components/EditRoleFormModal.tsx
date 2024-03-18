"use client";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, IconButton, Modal, Stack } from "@mui/material";
import { useState } from "react";
import AddRoleForm from "./AddRoleForm";
import EditRoleForm from "./EditRoleForm";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { EmployeeRole } from "@prisma/client";

const EditRoleFormModal = ({ role }: { role: EmployeeRole }) => {
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
          <EditRoleForm setOpen={setOpen} role={role} />
        </Stack>
      </Modal>
    </Stack>
  );
};
export default EditRoleFormModal;
