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
      <Stack
        direction="row"
        position="relative"
        height="calc(100vh - 70px)"
        bgcolor="background.paper"
      >
        <Box>
          <Stack
            direction="row"
            height="100%"
            sx={{ overflowY: "auto", overflowX: "hidden" }}
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
        <Box
          sx={{
            flexGrow: "1",
            width: {
              xs: "100%",
              sm: "calc(100vw - 250px)",
            },
            p: 2,
            bgcolor: "gray.light",
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Stack>
    </Box>
  );
}
