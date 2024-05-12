"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const { back } = useRouter();

  return (
    <Button
      variant="contained"
      onClick={() => back()}
      fullWidth
      sx={{ my: 2, fontSize: "20px" }}
    >
      Go back
    </Button>
  );
}
