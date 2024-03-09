import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import dayjs from "dayjs";
import React from "react";
import CalendarDay from "./CalendarDay";
import { getMonth } from "@/app/_utils/days";

const CalendarMonth = ({ montArr }: { montArr: number }) => {
  const month = getMonth(montArr);
  return (
    <Box sx={{ flex: "1", height: "100%" }}>
      <Grid2 container columns={7} sx={{ height: "100%" }}>
        {month.map((row, monthIndex) => (
          <React.Fragment key={monthIndex}>
            {row.map((day, dayIndex) => (
              <Grid2 xs={1} key={dayIndex}>
                <CalendarDay day={day} key={dayIndex} rowIndex={monthIndex} />
              </Grid2>
            ))}
          </React.Fragment>
        ))}
      </Grid2>
    </Box>
  );
};
export default CalendarMonth;
