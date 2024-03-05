"use client";
import { Button, Drawer, Stack } from "@mui/material";

import { useState } from "react";
import VitalSignsForm from "./VitalSignsForm";

const SampleDrawer = () => {
  const [setshowVitalSignsForm, setSetshowVitalSignsForm] = useState(false);

  return (
    <Stack>
      <Button onClick={() => setSetshowVitalSignsForm((prev) => !prev)}>
        Show
      </Button>
      <Drawer
        anchor="right"
        open={setshowVitalSignsForm}
        onClose={() => setSetshowVitalSignsForm(false)}
      >
        <VitalSignsForm />
      </Drawer>
    </Stack>
  );
};
export default SampleDrawer;
