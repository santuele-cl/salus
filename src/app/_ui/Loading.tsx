import { Box, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack sx={{ width: "100%", height: "100%", position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        Loading...
      </Box>
    </Stack>
  );
}
