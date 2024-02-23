"use client";
import Sidebar from "../_ui/dashboard/Sidebar";
import Navbar from "../_ui/dashboard/Navbar";
import {
  Box,
  Collapse,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TemporaryDrawer from "../_ui/dashboard/TemporaryDrawer";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [showTemporarySidebar, setShowTemporarySidebar] = useState(false);

  useEffect(() => {
    setShowTemporarySidebar(false);
  }, [isSmallScreen]);

  return (
    <Box position="relative">
      <Navbar setShowTemporarySidebar={setShowTemporarySidebar} />
      <TemporaryDrawer
        isSmallScreen={isSmallScreen}
        showTemporarySidebar={showTemporarySidebar}
        setShowTemporarySidebar={setShowTemporarySidebar}
      />
      <Stack direction="row" position="relative" height="calc(100dvh - 70px)">
        <Box>
          <Stack
            direction="row"
            height="100%"
            flexGrow="1"
            sx={{ overflowX: "hidden" }}
            bgcolor="general"
            borderRight="1px solid rgba(0,0,0,.1)"
          >
            <Collapse
              in={!isSmallScreen}
              orientation="horizontal"
              timeout={500}
            >
              <Sidebar />
            </Collapse>
          </Stack>
        </Box>
        <Box flexGrow="1" p={4} bgcolor="#F5F6FA">
          <Paper elevation={1} sx={{ p: 2 }}>
            {children}
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}
