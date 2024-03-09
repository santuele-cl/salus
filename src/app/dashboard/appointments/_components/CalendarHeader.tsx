import { Button, IconButton, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";

const CalendarHeader = ({
  setCurrentMonth,
  currentMonth,

  showAppointmentModal,
  setShowAppointmentModal,
}: {
  showAppointmentModal: boolean;
  setShowAppointmentModal: Dispatch<SetStateAction<boolean>>;
  setCurrentMonth: Dispatch<SetStateAction<number>>;
  currentMonth: number;
}) => {
  const handleMonthDecrement = () => setCurrentMonth((prev) => prev - 1);
  const handleMonthIncrement = () => setCurrentMonth((prev) => prev + 1);
  const handleMonthReset = () => setCurrentMonth(dayjs().month());
  const handleShowModal = () => setShowAppointmentModal((prev) => !prev);
  return (
    <Stack direction="row" sx={{ p: 2, alignItems: "center", gap: 2 }}>
      <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
        Calendar
      </Typography>
      <Button variant="outlined" onClick={handleMonthReset}>
        Today
      </Button>
      <Stack direction="row" sx={{ gap: 2 }}>
        <IconButton onClick={handleMonthDecrement}>
          <ChevronLeftIcon sx={{ fontSize: 24 }} />
        </IconButton>
        <IconButton onClick={handleMonthIncrement}>
          <ChevronRightIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Stack>
      <Typography>
        {dayjs(new Date(dayjs().year(), currentMonth)).format("MMMM YYYY")}
      </Typography>
      <Button
        variant="contained"
        sx={{ marginLeft: "auto" }}
        onClick={handleShowModal}
      >
        Create appoinment
      </Button>
    </Stack>
  );
};
export default CalendarHeader;
