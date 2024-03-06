"use client";
import { Button, Drawer, Stack } from "@mui/material";

import { useState } from "react";
import VitalSignsForm from "./VitalSignsForm";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import PrescriptionForm from "./PrescriptionForm";

const PrescriptionFormDrawer = ({
  visitId,
  patientId,
}: {
  visitId: string;
  patientId: string;
}) => {
  const [showPrescriptionFormDrawer, setShowPrescriptionFormDrawer] =
    useState(false);

  return (
    <Stack>
      <Drawer
        anchor="right"
        open={showPrescriptionFormDrawer}
        onClose={() => setShowPrescriptionFormDrawer(false)}
      >
        <PrescriptionForm
          visitId={visitId}
          patientId={patientId}
          setShowPrescriptionFormDrawer={setShowPrescriptionFormDrawer}
        />
      </Drawer>
      <LibraryAddOutlinedIcon
        sx={{ fontSize: 25, cursor: "pointer" }}
        onClick={() => setShowPrescriptionFormDrawer((prev) => !prev)}
      />
    </Stack>
  );
};
export default PrescriptionFormDrawer;
