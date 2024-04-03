import { Stack, Typography } from "@mui/material";
import { Event } from "react-big-calendar";

export default function CustomWeekEvent({ event }: any) {
  console.log(event);
  return (
    <Stack>
      <Typography>{event?.title}</Typography>

      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: "10px" }} component="span">
          Patient :{" "}
        </Typography>
        <Typography
          component="span"
          sx={{ textTransform: "uppercase", fontSize: "10px" }}
        >{` ${event?.patient?.fname} ${event?.patient?.lname}`}</Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: "10px" }} component="span">
          {" "}
          Assign to :{" "}
        </Typography>
        <Typography
          component="span"
          sx={{ textTransform: "uppercase", fontSize: "10px" }}
        >{` ${event?.employee?.fname} ${event?.employee?.lname}`}</Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: "10px" }} component="span">
          {" "}
          Room :{" "}
        </Typography>
        <Typography
          component="span"
          sx={{ textTransform: "uppercase", fontSize: "10px" }}
        >{` ${event?.room}`}</Typography>
      </Stack>
    </Stack>
  );
}
