"use client";
import { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Calendar, ToolbarProps, dayjsLocalizer } from "react-big-calendar";
import { Appointments } from "@prisma/client";
import { Box } from "@mui/material";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import CustomToolbar from "./CustomToolbar";
import { getAppointments, updateAppointment } from "@/actions/appointment";
import CreateAppointmentFormModal from "./CreateAppointmentFormModal";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const localizer = dayjsLocalizer(dayjs);

const DragAndDropCalendar = withDragAndDrop(Calendar);

export default function DnDCalendar() {
  const [selectStartDate, setSelectStartDate] = useState<Dayjs>(dayjs());
  const [selectEndDate, setSelectEndDate] = useState<Dayjs>(
    dayjs().add(1, "hour")
  );
  console.log(selectEndDate, selectStartDate);
  const [showCreateAppointmentModal, setShowCreateAppointmentModal] =
    useState(false);
  const [step, setStep] = useState(30);
  const [timeSlots, setTimeSlots] = useState(2);
  const [appointments, setAppointments] = useState<Appointments[]>([]);

  const fetchAppointments = async () => {
    const response = await getAppointments();
    if (response.success) return setAppointments(response.data);
  };

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
              handleCloseAppointmentForm={handleCloseAppointmentForm}
            />
          );
        },
      },
    }),
    []
  );

  const handleEventDrop = async (props: any) => {
    setAppointments((prevAppointments) => {
      return prevAppointments.filter(
        (appointment) => appointment.id !== props.event.id
      );
    });

    const response = await updateAppointment(
      { startDate: new Date(props.start), endDate: new Date(props.end) },
      props.event.id
    );

    fetchAppointments();
  };
  const handleEventResize = (props: any) => {};
  const handleEventSelect = (props: any) => {
    setSelectEndDate(dayjs(props.end));
    setSelectStartDate(dayjs(props.start));
    setShowCreateAppointmentModal(true);
  };

  const handleCloseAppointmentForm = () => {
    setSelectStartDate(dayjs());
    setSelectEndDate(dayjs().add(1, "hour"));
    setShowCreateAppointmentModal((prev) => !prev);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "white",
        height: "100vh",
      }}
    >
      {showCreateAppointmentModal && (
        <CreateAppointmentFormModal
          selectStartDate={selectStartDate}
          selectEndDate={selectEndDate}
          setSelectStartDate={setSelectStartDate}
          setSelectEndDate={setSelectEndDate}
          showCreateAppointmentModal={showCreateAppointmentModal}
          setShowCreateAppointmentModal={setShowCreateAppointmentModal}
          handleCloseAppointmentForm={handleCloseAppointmentForm}
        />
      )}
      <DragAndDropCalendar
        onSelectSlot={handleEventSelect}
        selectable={true}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
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
