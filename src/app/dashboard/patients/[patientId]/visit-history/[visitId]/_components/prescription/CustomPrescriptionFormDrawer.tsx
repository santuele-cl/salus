"use client";

import { useState } from "react";
import PrescriptionFormDrawer from "./PrescriptionFormDrawer";

const CustomPrescriptionFormDrawer = ({
  visitId,
  patientId,
}: {
  visitId: string;
  patientId: string;
}) => {
  const [showPrescriptionFormDrawer, setShowPrescriptionFormDrawer] =
    useState(false);

  return (
    <PrescriptionFormDrawer
      visitId={visitId}
      patientId={patientId}
      setShow={setShowPrescriptionFormDrawer}
      show={showPrescriptionFormDrawer}
    />
  );
};

export default CustomPrescriptionFormDrawer;
