import { IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Dispatch, SetStateAction } from "react";
const CalendarDay = ({
  day,
  rowIndex,
  setSelectedDay,
}: {
  day: dayjs.Dayjs;
  rowIndex: number;
  setSelectedDay: Dispatch<SetStateAction<dayjs.Dayjs>>;
}) => {
  const isCurrentDay = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  return (
    <Stack sx={{ border: "1px solid rgba(0,0,0,0.1)", height: "100%" }}>
      <Stack
        direction="row"
        sx={{
          p: "4px",
          justifyContent: "space-between",
          alignItems: "center",
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
        <IconButton
        // onClick={() => setSelectedDay(new Date(dayjs().year, ))}
        >
          <CreateOutlinedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};
export default CalendarDay;
