"use client";

import { useState } from "react";
import VaccinationFormDrawer from "./VaccinationFormDrawer";

const CustomVaccinationFormDrawer = ({
  visitId,
  patientId,
}: {
  visitId: string;
  patientId: string;
}) => {
  const [showVaccinationFormDrawer, setShowVaccinationFormDrawer] =
    useState(false);

  return (
    <VaccinationFormDrawer
      visitId={visitId}
      patientId={patientId}
      setShow={setShowVaccinationFormDrawer}
      show={showVaccinationFormDrawer}
    />
  );
};

export default CustomVaccinationFormDrawer;
