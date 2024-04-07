import { Box, Stack } from "@mui/material";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack direction="row" spacing={2} sx={{ minHeight: "100vh" }}>
      <Box sx={{ width: 300, bgcolor: "rgba(0,0,0,0.2)" }}>Side</Box>
      <Box>{children}</Box>
    </Stack>
  );
}
