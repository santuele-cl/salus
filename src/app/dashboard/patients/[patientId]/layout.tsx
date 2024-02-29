"use client";
import { Box, Paper, Stack, Tab, Tabs, useTheme } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPatientByid } from "@/actions/patients";
import { Patient } from "@prisma/client";
import ProfileSidebar from "@/app/_ui/dashboard/patients/ProfileSidebar";

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
  const [profile, setProfile] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const getProfile = async () => {
      const patientProfile = await getPatientByid(patientId);
      if (patientProfile.success) setProfile(patientProfile.data);
    };

    getProfile();
  }, []);

  // console.log(patientId);
  // console.log("profile", profile);
  return (
    <Stack
      sx={{
        gap: 3,
        height: "100%",
        width: "100%",
        flexDirection: {
          xs: "column",
          xl: "row",
        },
        position: "relative",
      }}
    >
      {/* PROFILE SIDEBAR */}
      <Paper
        sx={{
          alignItems: "start",
          overflowY: "auto",
          flexShrink: "0",
          width: {
            xs: "100%",
            xl: 300,
          },
        }}
      >
        <ProfileSidebar profile={profile} />
      </Paper>

      <Stack flexGrow="1">
        {/* NAV */}
        <Tabs
          sx={{ width: "100%" }}
          textColor="primary"
          indicatorColor="primary"
          value={activeTab}
          variant="scrollable"
          scrollButtons="auto"
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
        {/* CHILDREN */}
        <Paper
          elevation={1}
          sx={{
            overflowX: "auto",
            p: 2,
          }}
        >
          <Box>{children}</Box>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default Layout;
