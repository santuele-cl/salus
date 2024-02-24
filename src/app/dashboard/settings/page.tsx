"use client";

import { updateSettings } from "@/actions/settings";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
  const { update } = useSession();
  return (
    <div>
      <h1>SettingsPage</h1>
      <Button
        onClick={() => {
          updateSettings({ name: "muwahh" });
          update();
        }}
      >
        Update name
      </Button>
    </div>
  );
};
export default SettingsPage;
