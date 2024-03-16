"use client";
import { Button, Drawer, Stack } from "@mui/material";

import { Dispatch, SetStateAction, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FamilyMedicalHistoryForm from "./FamilyMedicalHistoryForm";

const FamilyMedicalHistoryFormDrawer = ({
  patientId,
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  patientId: string;
}) => {
  return (
    <Stack>
      <Drawer anchor="right" open={show} onClose={() => setShow(false)}>
        <FamilyMedicalHistoryForm patientId={patientId} setShow={setShow} />
      </Drawer>
      <Button
        variant="contained"
        startIcon={<AddOutlinedIcon />}
        onClick={() => setShow(true)}
      >
        Add
      </Button>
    </Stack>
  );
};
export default FamilyMedicalHistoryFormDrawer;
