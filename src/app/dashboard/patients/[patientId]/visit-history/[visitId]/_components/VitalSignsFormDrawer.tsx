"use client";
import { Button, Drawer, Stack } from "@mui/material";

import { useState } from "react";
import VitalSignsForm from "./VitalSignsForm";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";

const VitalSignsFormDrawer = ({ visitId }: { visitId: string }) => {
  const [showVitalSignsForm, setShowVitalSignsForm] = useState(false);

  return (
    <Stack>
      <Drawer
        anchor="right"
        open={showVitalSignsForm}
        onClose={() => setShowVitalSignsForm(false)}
      >
        <VitalSignsForm visitId={visitId} />
      </Drawer>
      <LibraryAddOutlinedIcon
        sx={{ fontSize: 25, cursor: "pointer" }}
        onClick={() => setShowVitalSignsForm((prev) => !prev)}
      />
    </Stack>
  );
};
export default VitalSignsFormDrawer;