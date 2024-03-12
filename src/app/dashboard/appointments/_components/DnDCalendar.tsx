"use client";
import { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Calendar, ToolbarProps, dayjsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Box } from "@mui/material";

import SelectAppointmentFormModal from "./SelectAppointmentFormModal";
import CustomToolbar from "./CustomToolbar";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { getAppointments, updateAppointment } from "@/actions/appointment";
import { Appointments } from "@prisma/client";
import TestSelectAppointmentFormModal from "./TestSelectAppointmentFormModal";
import CreateAppointmentFormModal from "./CreateAppointmentFormModal";

const localizer = dayjsLocalizer(dayjs);

const DragAndDropCalendar = withDragAndDrop(Calendar);


export default function DnDCalendar() {
  const [selectStartDate, setSelectStartDate] = useState<Dayjs | null>(null)
  const [selectEndDate, setSelectEndDate] = useState<Dayjs | null>(null)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showCreateAppointmentModal, setShowCreateAppointmentModal] = useState(false);
  const [step, setStep] = useState(30);
  const [timeSlots, setTimeSlots] = useState(2);
  const [appointments, setAppointments] = useState<Appointments[]>([]);

  const fetchAppointments = async () => {
    const response = await getAppointments()
    if (response.success) return setAppointments(response.data)
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
              handleCloseAppointmentForm={handleCloseAppointmentForm}
            />
          );
        },
      },
      // defaultDate: new Date(2015, 3, 13),
    }),
    []
  );

  const handleEventDrop = async (props: any) => {
    // console.log("event drop", props);

    setAppointments((prevAppointments) => {
      return prevAppointments.filter((appointment) => appointment.id !== props.event.id);
    });

    const response = await updateAppointment({ startDate: new Date(props.start), endDate: new Date(props.end) }, props.event.id)

    // console.log("drop response",response)
    fetchAppointments()

  };
  const handleEventResize = (props: any) => {
    console.log("event resize", props);
  };
  const handleEventSelect = (props: any) => {
    console.log(props)
    setSelectEndDate(dayjs(props.end))
    setSelectStartDate(dayjs(props.start))
    setShowCreateAppointmentModal(true)
    // console.log(selectStartDate, selectEndDate)
  };

  const handleShowAppointmentModal = () => {

  }

  const handleCloseAppointmentForm = () => {
    setSelectEndDate(null)
    setSelectStartDate(null)
    setShowCreateAppointmentModal(prev => !prev)
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  console.log(selectEndDate)
  return (
    <Box
      sx={{
        bgcolor: "white",
        height: "100vh",
      }}
    >
      {/* {showAppointmentModal && <SelectAppointmentFormModal showAppointmentModal={showAppointmentModal} setShowAppointmentModal={setShowAppointmentModal} selectStartDate={selectStartDate} selectEndDate={selectEndDate} setSelectStartDate={setSelectStartDate} setSelectEndDate={setSelectEndDate} />} */}
      {/* {showAppointmentModal && <TestSelectAppointmentFormModal showAppointmentModal={showAppointmentModal} setShowAppointmentModal={setShowAppointmentModal} />} */}
      {showCreateAppointmentModal && <CreateAppointmentFormModal selectStartDate={selectStartDate} selectEndDate={selectEndDate} setSelectStartDate={setSelectStartDate} setSelectEndDate={setSelectEndDate} showCreateAppointmentModal={showCreateAppointmentModal} setShowCreateAppointmentModal={setShowCreateAppointmentModal} handleCloseAppointmentForm={handleCloseAppointmentForm} />}
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
