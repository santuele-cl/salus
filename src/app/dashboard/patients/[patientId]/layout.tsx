"use client";
import { Box, Paper, Stack, Tab, Tabs, styled } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
const TABS = [
  {
    label: "Profile",
    href: "profile",
  },
  { label: "Documents", href: "documents" },
  { label: "Visit History", href: "visit-history" },
  { label: "Medications", href: "medications" },
];

const Layout = ({
  children,
  params: { patientId },
}: {
  children: React.ReactNode;
  params: { patientId: string };
}) => {
  const [activeTab, setActiveTab] = useState(0);
  console.log(patientId);
  return (
    <Stack direction="row" spacing={3} height="100%">
      <Paper>
        <Stack sx={{ p: 2 }} spacing={2}>
          <PortraitOutlinedIcon sx={{ fontSize: 200 }} />
          <hr />
          <Stack></Stack>
        </Stack>
      </Paper>

      <Stack>
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          value={activeTab}
          sx={{
            "&Mui-selected": {
              color: "red",
            },
          }}
        >
          <Tab
            onClick={() => setActiveTab(0)}
            label="Current Visit"
            LinkComponent={Link}
            href={`/dashboard/patients/${patientId}`}
            value={0}
          />
          {TABS.map(({ label, href }, i) => {
            return (
              <Tab
                onClick={() => setActiveTab(i + 1)}
                label={label}
                key={i}
                LinkComponent={Link}
                href={`/dashboard/patients/${patientId}/${href}`}
                value={i + 1}
              />
            );
          })}
        </Tabs>
        <Paper elevation={1} sx={{ p: 2, overflow: "auto" }}>
          {children}
        </Paper>
      </Stack>
    </Stack>
  );
};

export default Layout;
