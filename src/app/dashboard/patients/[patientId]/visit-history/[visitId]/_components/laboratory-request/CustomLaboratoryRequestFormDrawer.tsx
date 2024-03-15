"use client";

import { useState } from "react";
import LaboratoryRequestFormDrawer from "./LaboratoryRequestFormDrawer";

const CustomLaboratoryRequestFormDrawer = ({
  visitId,
  patientId,
}: {
  visitId: string;
  patientId: string;
}) => {
  const [showLaboratoryRequestFormDrawer, setShowLaboratoryRequestFormDrawer] =
    useState(false);

  return (
    <LaboratoryRequestFormDrawer
      visitId={visitId}
      patientId={patientId}
      setShow={setShowLaboratoryRequestFormDrawer}
      show={showLaboratoryRequestFormDrawer}
    />
  );
};

export default CustomLaboratoryRequestFormDrawer;
