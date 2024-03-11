"use client";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { Calendar, ToolbarProps, dayjsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Box } from "@mui/material";

import CustomToolbar from "./CustomToolbar";
import { EventType, events as EventConstant } from "../../../_data/events";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { getAppointments, updateAppointment } from "@/actions/appointment";
import { Appointments } from "@prisma/client";
import { collectGenerateParams } from "next/dist/build/utils";
import AppointmentModal from "./AppointmentModal";
import SelectAppointmentFormModal from "./SelectAppointmentFormModal";

const localizer = dayjsLocalizer(dayjs);

const DragAndDropCalendar = withDragAndDrop(Calendar);


export default function DnDCalendar() {
  const [selectStartDate, setSelectStartDate] = useState(dayjs())
  const [selectEndDate, setSelectEndDate] = useState(dayjs().add(1, "hour"))
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [step, setStep] = useState(30);
  const [timeSlots, setTimeSlots] = useState(2);
  const [events, setEvents] = useState(EventConstant);
  const [appointments, setAppointments] = useState<Appointments[] >([]);

  const fetchAppointments = async () => {
    const response = await getAppointments()
    console.log(response)
    if(response.success) return setAppointments(response.data)
  }

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

  const handleEventDrop = async (props: any) => {
    // console.log("event drop", props);

    setAppointments((prevAppointments) => {
      return prevAppointments.filter((appointment) => appointment.id !== props.event.id);
    });

    const response = await updateAppointment({startDate: new Date(props.start), endDate: new Date(props.end)},props.event.id)
    
    // console.log("drop response",response)
    fetchAppointments()

  };
  const handleEventResize = (props: any) => {
    console.log("event resize", props);

    // setEvents((prevEvents) => {
    //   return prevEvents.map((event) => {
    //     if (event.id === props.event.id) {
    //       return {
    //         ...event,
    //         start: props.start,
    //         end: props.end,
    //       };
    //     } else return event;
    //   });
    // });
  };
  const handleEventSelect = (props: any) => {
    console.log("event select", props);
    setSelectEndDate(dayjs(props.end))
    setSelectStartDate(dayjs(props.start))
    setShowAppointmentModal(true)
    console.log(selectStartDate.format("MMMM dd YYYY hh:mm a"), selectEndDate.format("MMMM dd YYYY hh:mm a"))
  };  

  useEffect(() => {
    fetchAppointments()
  },[])


  return (
    <Box
      sx={{
        bgcolor: "white",
        height: "100vh",
      }}
    >
      <SelectAppointmentFormModal showAppointmentModal={showAppointmentModal} setShowAppointmentModal={setShowAppointmentModal} selectStartDate={selectStartDate} selectEndDate={selectEndDate} setSelectStartDate={setSelectStartDate} setSelectEndDate={setSelectEndDate}/>
      <DragAndDropCalendar
        onSelectSlot={handleEventSelect}
        selectable={true}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        // draggableAccessor={(event: any) => event.isDraggable!}
        timeslots={timeSlots}
        step={step}
        components={components}
        localizer={localizer}
        events={appointments}
        startAccessor={(event: any) => event.startDate!}
        endAccessor={(event: any) => event.endDate!}
        defaultView="week"
        views={["month", "week", "day", "agenda"]}
      />
    </Box>
  );
}
