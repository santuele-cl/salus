"use client";
import { Button, Drawer, Stack } from "@mui/material";

import React, { Dispatch, SetStateAction, useState } from "react";
import DiagnosisForm from "./DiagnosisForm";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const DiagnosisFormDrawer = ({
  visitId,
  patientId,
  show,
  setShow,
}: {
  visitId?: string;
  patientId: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Stack>
      <Drawer anchor="right" open={show} onClose={() => setShow(false)}>
        <DiagnosisForm
          visitId={visitId}
          patientId={patientId}
          setShowDiagnosisFormDrawer={setShow}
        />
      </Drawer>
      <Button
        variant="contained"
        startIcon={<AddOutlinedIcon />}
        onClick={() => setShow(true)}
      >
        Add
      </Button>
      {/* <LibraryAddOutlinedIcon
        sx={{ fontSize: 25, cursor: "pointer", color: "primary.main" }}
        onClick={() => setShow((prev) => !prev)}
      /> */}
    </Stack>
  );
};
export default DiagnosisFormDrawer;
