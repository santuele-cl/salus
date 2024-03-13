"use client";
import { Drawer, Stack } from "@mui/material";

import { useState } from "react";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import DiagnosisForm from "./DiagnosisForm";

const DiagnosisFormDrawer = ({
  visitId,
  patientId,
}: {
  visitId: string;
  patientId: string;
}) => {
  const [showDiagnosisFormDrawer, setShowDiagnosisFormDrawer] = useState(false);

  return (
    <Stack>
      <Drawer
        anchor="right"
        open={showDiagnosisFormDrawer}
        onClose={() => setShowDiagnosisFormDrawer(false)}
      >
        <DiagnosisForm
          visitId={visitId}
          patientId={patientId}
          setShowDiagnosisFormDrawer={setShowDiagnosisFormDrawer}
        />
      </Drawer>
      <LibraryAddOutlinedIcon
        sx={{ fontSize: 25, cursor: "pointer", color: "primary.main" }}
        onClick={() => setShowDiagnosisFormDrawer((prev) => !prev)}
      />
    </Stack>
  );
};
export default DiagnosisFormDrawer;
