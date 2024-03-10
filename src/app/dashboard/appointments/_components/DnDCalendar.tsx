"use client";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { Calendar, ToolbarProps, dayjsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Box } from "@mui/material";

import CustomToolbar from "./CustomToolbar";
import { EventType, events as EventConstant } from "../../../_data/events";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const localizer = dayjsLocalizer(dayjs);

const DragAndDropCalendar = withDragAndDrop(Calendar);

export default function DnDCalendar() {
  const [step, setStep] = useState(30);
  const [timeSlots, setTimeSlots] = useState(2);
  const [events, setEvents] = useState(EventConstant);

  const { components } = useMemo(
    () => ({
      components: {
        toolbar: (props: ToolbarProps) => {
          return (
            <CustomToolbar
              toolBarProps={props}
              step={step}
              setStep={setStep}
              setTimeslots={setTimeSlots}
              timeSlots={timeSlots}
            />
          );
        },
      },
      defaultDate: new Date(2015, 3, 13),
    }),
    []
  );

  const handleEventDrop = (props: any) => {
    console.log("event drop", props);

    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        if (event.id === props.event.id) {
          return {
            ...event,
            start: props.start,
            end: props.end,
          };
        } else return event;
      });
    });
  };
  const handleEventResize = (props: any) => {
    console.log("event resize", props);

    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        if (event.id === props.event.id) {
          return {
            ...event,
            start: props.start,
            end: props.end,
          };
        } else return event;
      });
    });
  };
  const handleEventSelect = (props: any) => {
    console.log("event select", props);
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        height: "100vh",
      }}
    >
      <DragAndDropCalendar
        onSelectSlot={handleEventSelect}
        selectable={true}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        draggableAccessor={(event: any) => event.isDraggable!}
        timeslots={timeSlots}
        step={step}
        components={components}
        localizer={localizer}
        events={events}
        startAccessor={(event: any) => event.start!}
        endAccessor={(event: any) => event.end!}
        defaultView="week"
        views={["month", "week", "day", "agenda"]}
      />
    </Box>
  );
}
