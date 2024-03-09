"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import { useState } from "react";
import dayjs from "dayjs";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import { Box, Paper, Stack, Typography } from "@mui/material";

import AppointmentModal from "./_components/AppointmentModal";

export default function Appointments({
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
      <Stack sx={{ height: "100%", position: "relative" }}>
        <Box sx={{ position: "sticky", top: 0 }}>
          <Paper elevation={0} sx={{ border: "1px solid rgba(0,0,0,0.1)" }}>
            <Typography variant="h6">Calendar</Typography>
            {/* <CalendarHeader
              setCurrentMonth={setCurrentMonth}
              currentMonth={currentMonth}
              showAppointmentModal={showAppointmentModal}
              setShowAppointmentModal={setShowAppointmentModal}
            /> */}
          </Paper>
        </Box>
        <Stack direction="row" sx={{ flexGrow: "1" }}>
          {/* <Box sx={{ flex: "0 0 250px" }}>
          <CalendarSidebar />
        </Box> */}
          <Box sx={{ flex: "1 1" }}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "resourceTimelineWook, dayGridMonth,timeGridWeek",
              }}
              // events={allEvents as EventSourceInput}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              // dateClick={handleDateClick}
              // drop={(data) => addEvent(data)}
              // eventClick={(data) => handleDeleteModal(data)}
            />
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}
