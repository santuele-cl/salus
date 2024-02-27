"use client";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
const TABS = [
  {
    label: "Current Visit",
    href: "current",
  },
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
  const pathname = usePathname();
  const pathnameArr = pathname.split("/");
  console.log(pathnameArr);
  const router = useRouter();
  return (
    <Box>
      <Tabs value={`/dashboard/patients/${pathnameArr[4]}`}>
        {TABS.map(({ label, href }, i) => (
          <Tab
            label={label}
            key={i}
            LinkComponent={Link}
            href={`/dashboard/patients/${patientId}/${href}`}
            value={`/dashboard/patients/${pathnameArr[4]}`}
          />
        ))}
      </Tabs>
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
