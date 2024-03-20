"use client";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  {
    label: "Clinical Departments",
    href: "/dashboard/departments/clinical-departments",
  },
  {
    label: "Service Departments",
    href: "/dashboard/departments/service-departments",
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <Stack
      sx={{
        gap: 3,
        height: "100%",
        width: "100%",
        flexDirection: {
          xs: "column",
        },
        position: "relative",
      }}
    >
      <Stack flexGrow="1">
        <Tabs
          sx={{ width: "100%", mb: 2 }}
          textColor="primary"
          indicatorColor="primary"
          value={pathname}
          variant="scrollable"
          scrollButtons="auto"
        >
          {TABS.map(({ label, href }, i) => {
            return (
              <Tab
                label={label}
                key={i}
                LinkComponent={Link}
                href={href}
                value={href}
              />
            );
          })}
        </Tabs>

        <Box>{children}</Box>
      </Stack>
    </Stack>
  );
};

export default Layout;
