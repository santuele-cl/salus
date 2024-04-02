"use client";
import { Button, Drawer, Stack } from "@mui/material";

import { Dispatch, SetStateAction, useState } from "react";
import VitalSignsForm from "../VitalSignsForm";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import PrescriptionForm from "../prescription/PrescriptionForm";
import LaboratoryRequestForm from "./LaboratoryRequestForm";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const LaboratoryRequestFormDrawer = ({
  visitId,
  patientId,
  show,
  setShow,
}: {
  visitId?: string;
  patientId: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Stack>
      <Drawer anchor="right" open={show} onClose={() => setShow(false)}>
        <LaboratoryRequestForm
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
export default LaboratoryRequestFormDrawer;
