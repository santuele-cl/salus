"use client";
import { useState } from "react";
import dayjs from "dayjs";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import { Box, Paper, Stack } from "@mui/material";

import AppointmentModal from "./_components/AppointmentModal";

const localizer = dayjsLocalizer(dayjs);

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
        {/* <Box sx={{ position: "sticky", top: 0 }}>
          <Paper elevation={0} sx={{ border: "1px solid rgba(0,0,0,0.1)" }}>
            <CalendarHeader
              setCurrentMonth={setCurrentMonth}
              currentMonth={currentMonth}
              showAppointmentModal={showAppointmentModal}
              setShowAppointmentModal={setShowAppointmentModal}
            />
          </Paper>
        </Box> */}
        <Stack direction="row" sx={{ flexGrow: "1" }}>
          {/* <Box sx={{ flex: "0 0 250px" }}>
          <CalendarSidebar />
        </Box> */}
          <Box sx={{ flex: "1 1" }}>
            <Calendar
              localizer={localizer}
              // defaultView="day"
              // views={[Views.DAY, Views.WEEK, Views.MONTH]}
              //   events={myEventsList}
              startAccessor="start"
              endAccessor="end"
              //   style={{ height: 500 }}
            />
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}
