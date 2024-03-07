"use client";
import { Button, Drawer, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "next/navigation";
import NewVisitForm from "./NewVisitForm";

const TableHeader = () => {
  const { patientId } = useParams();
  const [showVisitForm, setShowVisitForm] = useState(false);

  const handleCloseVisitFormDrawer = () => {
    setShowVisitForm((prev) => !prev);
  };
  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Checkup History</Typography>
        <Button variant="contained" onClick={handleCloseVisitFormDrawer}>
          New Checkup
        </Button>
      </Stack>
      <Drawer
        anchor="right"
        open={showVisitForm}
        onClose={handleCloseVisitFormDrawer}
      >
        <NewVisitForm
          patientId={patientId as string}
          setShowVisitForm={setShowVisitForm}
        />
      </Drawer>
    </Stack>
  );
};
export default TableHeader;
