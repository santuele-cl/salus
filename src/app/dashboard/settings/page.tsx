"use client";

import { updateSettings } from "@/actions/settings";
import { Button, Paper } from "@mui/material";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
  const { update } = useSession();
  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <h1>SettingsPage</h1>
      <Button
        onClick={() => {
          updateSettings({ name: "muwahh" });
          update();
        }}
      >
        Update name
      </Button>
    </Paper>
  );
};
export default SettingsPage;
