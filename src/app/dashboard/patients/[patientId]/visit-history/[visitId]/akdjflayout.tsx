"use client";

import { Drawer } from "@mui/material";
import { useState } from "react";
import VitalSignsForm from "./_components/VitalSignsForm";

const VisitLayout = ({ children }: { children: React.ReactNode }) => {
  const [setshowVitalSignsForm, setSetshowVitalSignsForm] = useState(false);

  return (
    <>
      <Drawer
        anchor="right"
        open={setshowVitalSignsForm}
        onClose={() => setSetshowVitalSignsForm(false)}
      >
        <VitalSignsForm />
      </Drawer>
      {children}
    </>
  );
};
export default VisitLayout;
