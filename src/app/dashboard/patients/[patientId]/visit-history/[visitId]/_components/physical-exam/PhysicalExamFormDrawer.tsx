"use client";
import { Drawer, Stack } from "@mui/material";

import { useState } from "react";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import PhysicalExamForm from "./PhysicalExamForm";

const PhysicalExamFormDrawer = ({
  visitId,
  patientId,
}: {
  visitId: string;
  patientId: string;
}) => {
  const [showPhysicalExamDrawer, setShowPhysicalExamDrawer] = useState(false);

  return (
    <Stack>
      <Drawer
        anchor="right"
        open={showPhysicalExamDrawer}
        onClose={() => setShowPhysicalExamDrawer(false)}
      >
        <PhysicalExamForm
          visitId={visitId}
          patientId={patientId}
          setShowPhysicalExamDrawer={setShowPhysicalExamDrawer}
        />
      </Drawer>
      <LibraryAddOutlinedIcon
        sx={{ fontSize: 25, cursor: "pointer", color: "primary.main" }}
        onClick={() => setShowPhysicalExamDrawer((prev) => !prev)}
      />
    </Stack>
  );
};
export default PhysicalExamFormDrawer;
