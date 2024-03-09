import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

const CalendarDay = ({
  day,
  rowIndex,
}: {
  day: dayjs.Dayjs;
  rowIndex: number;
}) => {
  const isCurrentDay = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  return (
    <Stack sx={{ border: "1px solid rgba(0,0,0,0.1)", height: "100%" }}>
      <Stack
        direction="row"
        sx={{
          p: "4px",
          justifyContent: "space-between",
          //   bgcolor: "lightblue",
          //   color: "common.black",
        }}
      >
        {rowIndex === 0 && <Typography>{day.format("ddd")}</Typography>}
        <Typography
          sx={{
            bgcolor: isCurrentDay ? "primary.main" : "transparent",
            color: isCurrentDay ? "common.white" : "common.black",
            borderRadius: isCurrentDay ? "500px" : "0px",
            p: isCurrentDay ? "6px" : "0px",
          }}
        >
          {day.format("DD")}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default CalendarDay;
