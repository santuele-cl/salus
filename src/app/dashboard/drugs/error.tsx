"use client";

import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { refresh } = useRouter();
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
        {error.name}. {error.message}
        <Button
          onClick={() => {
            refresh();
            startTransition(reset);
          }}
          variant="contained"
        >
          Try again
        </Button>
        {/* {error.digest} */}
        {/* {error.stack} */}
        {/* {JSON.stringify(error.cause)} */}
      </Box>
    </Stack>
  );
}
