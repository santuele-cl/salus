"use client";

import { useState } from "react";

import DiagnosisFormDrawer from "./DiagnosisFormDrawer";

const CustomDiagnosisFormDrawer = ({
  visitId,
  patientId,
}: {
  visitId: string;
  patientId: string;
}) => {
  const [showDiagnosisFormDrawer, setShowDiagnosisFormDrawer] = useState(false);

  return (
    <DiagnosisFormDrawer
      visitId={visitId}
      patientId={patientId}
      setShow={setShowDiagnosisFormDrawer}
      show={showDiagnosisFormDrawer}
    />
  );
};

export default CustomDiagnosisFormDrawer;
