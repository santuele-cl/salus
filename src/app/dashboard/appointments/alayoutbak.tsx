"use client";

import { Box, Paper, Stack } from "@mui/material";
import CalendarHeader from "./_components/CalendarHeader";
import CalendarSidebar from "./_components/CalendarSidebar";
import CalendarMonth from "./_components/CalendarMonth";
import { useState } from "react";
import { getMonth } from "@/app/_utils/days";
import dayjs from "dayjs";
import AppointmentModal from "./_components/AppointmentModal";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  return (
    <Paper>
      <AppointmentModal
        selectedDay={selectedDay}
        showAppointmentModal={showAppointmentModal}
        setShowAppointmentModal={setShowAppointmentModal}
      />
      <Stack sx={{ height: "100vh", position: "relative" }}>
        <Box sx={{ position: "sticky", top: 0 }}>
          <Paper elevation={0} sx={{ border: "1px solid rgba(0,0,0,0.1)" }}>
            <CalendarHeader
              setCurrentMonth={setCurrentMonth}
              currentMonth={currentMonth}
              showAppointmentModal={showAppointmentModal}
              setShowAppointmentModal={setShowAppointmentModal}
            />
          </Paper>
        </Box>
        <Stack direction="row" sx={{ flexGrow: "1" }}>
          {/* <Box sx={{ flex: "0 0 250px" }}>
          <CalendarSidebar />
        </Box> */}
          <Box sx={{ flex: "1 1" }}>
            <CalendarMonth
              montArr={currentMonth}
              setSelectedDay={setSelectedDay}
            />
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}
