"use client";
import { Box, Paper, Stack, Tab, Tabs, useTheme } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPatientByid } from "@/actions/patients";
import { ContactInfo, Patient } from "@prisma/client";
import ProfileSidebar from "@/app/_ui/dashboard/patients/ProfileSidebar";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Checkup History", href: "visit-history" },
  { label: "Profile", href: "profile" },
  { label: "Diagnoses", href: "diagnoses" },
  { label: "Prescriptions", href: "prescriptions" },
  { label: "Laboratory Requests", href: "laboratory-requests" },
  { label: "Laboratory Results", href: "laboratory-results" },
  { label: "Vaccinations", href: "vaccinations" },
  { label: "Allergies", href: "allergies" },
  { label: "Family Medical Histories", href: "family-medical-histories" },
  { label: "Social Histories", href: "social-histories" },
];

const Layout = ({
  children,
  params: { patientId },
}: {
  children: React.ReactNode;
  params: { patientId: string };
}) => {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const [profile, setProfile] = useState<Patient | null>();
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>();

  useEffect(() => {
    const getProfile = async () => {
      const patientProfile = await getPatientByid(patientId);
      if (patientProfile.success) setProfile(patientProfile.data);
      if (patientProfile.success)
        setContactInfo(patientProfile.data.contactInfo);
    };

    getProfile();
  }, []);

  // console.log("patientId", patientId);
  // console.log("profile", profile);
  return (
    <Stack
      sx={{
        gap: 3,
        height: "100%",
        width: "100%",
        flexDirection: {
          xs: "column",
          // xl: "row",
        },
        position: "relative",
      }}
    >
      {/* PROFILE SIDEBAR */}
      <Paper
      // sx={{
      //   alignItems: "start",
      //   overflowY: "auto",
      //   flexShrink: "0",
      //   width: {
      //     xs: "100%",
      //     // xl: 300,
      //   },
      // }}
      >
        {profile && contactInfo && (
          <ProfileSidebar profile={profile} contactInfo={contactInfo} />
        )}
      </Paper>

      <Stack flexGrow="1">
        {/* NAV */}
        <Tabs
          sx={{ width: "100%" }}
          textColor="primary"
          indicatorColor="primary"
          value={segments[4]}
          variant="scrollable"
          scrollButtons="auto"
        >
          {TABS.map(({ label, href }, i) => {
            return (
              <Tab
                label={label}
                key={i}
                LinkComponent={Link}
                href={`/dashboard/patients/${patientId}/${href}`}
                value={href}
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
