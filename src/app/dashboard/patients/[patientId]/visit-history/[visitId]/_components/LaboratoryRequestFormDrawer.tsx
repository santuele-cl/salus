"use client";
import { Button, Drawer, Stack } from "@mui/material";

import { useState } from "react";
import VitalSignsForm from "./VitalSignsForm";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import PrescriptionForm from "./prescription/PrescriptionForm";
import LaboratoryRequestForm from "./LaboratoryRequestForm";

const LaboratoryRequestFormDrawer = ({
  visitId,
  patientId,
}: {
  visitId: string;
  patientId: string;
}) => {
  const [showLaboratoryRequestFormDrawer, setShowLaoratoryRequestFormDrawer] =
    useState(false);

  return (
    <Stack>
      <Drawer
        anchor="right"
        open={showLaboratoryRequestFormDrawer}
        onClose={() => setShowLaoratoryRequestFormDrawer(false)}
      >
        <LaboratoryRequestForm
          visitId={visitId}
          patientId={patientId}
          setShowLaoratoryRequestFormDrawer={setShowLaoratoryRequestFormDrawer}
        />
      </Drawer>
      <LibraryAddOutlinedIcon
        sx={{ fontSize: 25, cursor: "pointer", color: "primary.main" }}
        onClick={() => setShowLaoratoryRequestFormDrawer((prev) => !prev)}
      />
    </Stack>
  );
};
export default LaboratoryRequestFormDrawer;
