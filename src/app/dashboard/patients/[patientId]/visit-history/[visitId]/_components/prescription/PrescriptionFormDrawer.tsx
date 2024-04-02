"use client";
import { Button, Drawer, Stack } from "@mui/material";

import { Dispatch, SetStateAction, useState } from "react";
import VitalSignsForm from "../VitalSignsForm";
import PrescriptionForm from "./PrescriptionForm";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const PrescriptionFormDrawer = ({
  visitId,
  patientId,
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  visitId?: string;
  patientId: string;
}) => {
  return (
    <Stack>
      <Drawer anchor="right" open={show} onClose={() => setShow(false)}>
        <PrescriptionForm
          visitId={visitId}
          patientId={patientId}
          setShow={setShow}
        />
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
export default PrescriptionFormDrawer;
