"use client";
import { Button, Drawer, Stack, Typography } from "@mui/material";
import { useState } from "react";
import NewVisitForm from "./_components/NewVisitForm";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showVisitForm, setShowVisitForm] = useState(false);

  const handleCloseVisitFormDrawer = () => {
    setShowVisitForm((prev) => !prev);
  };
  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Visit History</Typography>
        <Button variant="contained" onClick={handleCloseVisitFormDrawer}>
          Add New Visit
        </Button>
      </Stack>
      <Drawer
        anchor="right"
        open={showVisitForm}
        onClose={handleCloseVisitFormDrawer}
      >
        <NewVisitForm />
      </Drawer>
      {children}
    </Stack>
  );
};
export default Layout;
