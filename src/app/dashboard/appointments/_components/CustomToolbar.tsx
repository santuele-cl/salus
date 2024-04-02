"use client";
import { Dispatch, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { Navigate, ToolbarProps } from "react-big-calendar";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
const CustomToolbar = ({
  toolBarProps,
  step,
  setStep,
  timeSlots,
  setTimeslots,
  handleCloseAppointmentForm,
}: {
  step: number;
  timeSlots: number;
  setStep: Dispatch<SetStateAction<number>>;
  setTimeslots: Dispatch<SetStateAction<number>>;
  toolBarProps: ToolbarProps;
  handleCloseAppointmentForm: () => void;
}) => {
  const { date, view, onNavigate, onView, label } = toolBarProps;
  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        border: "1px solid rgba(0,0,0,0.1)",
        borderBottom: "0px",
      }}
    >
      <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
        <ButtonGroup size="small" color="secondary">
          <Button onClick={() => onNavigate(Navigate.PREVIOUS)}>
            <ChevronLeftOutlinedIcon fontSize="small" />
          </Button>
          <Button onClick={() => onNavigate(Navigate.TODAY)}>Today</Button>
          <Button onClick={() => onNavigate(Navigate.NEXT)}>
            <ChevronRightOutlinedIcon fontSize="small" />
          </Button>
        </ButtonGroup>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          sx={{ ml: 2 }}
          onClick={handleCloseAppointmentForm}
        >
          Add appointment
        </Button>
      </Stack>

      <Stack>
        <Typography variant="h6">
          {label}{" "}
          {(view === "week" || view === "day") && `, ${dayjs(date).year()}`}
        </Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
        <ButtonGroup size="small" color="secondary">
          <Button
            variant={view === "month" ? "contained" : "outlined"}
            onClick={() => onView("month")}
          >
            Month
          </Button>
          <Button
            variant={view === "week" ? "contained" : "outlined"}
            onClick={() => onView("week")}
          >
            Week
          </Button>
          <Button
            variant={view === "day" ? "contained" : "outlined"}
            onClick={() => onView("day")}
          >
            Day
          </Button>
          <Button
            variant={view === "agenda" ? "contained" : "outlined"}
            onClick={() => onView("agenda")}
          >
            Agenda
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};
export default CustomToolbar;
