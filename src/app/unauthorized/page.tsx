import { Stack, Typography } from "@mui/material";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import GoBackButton from "./_components/GoBackButton";

export default function UnauthorizedPage() {
  return (
    <Stack sx={{ position: "relative", minHeight: "100vh" }}>
      <Stack
        sx={{
          color: "rgba(0,0,0,0.6)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "10rem" }}>
          401
        </Typography>
        <Typography variant="h3" sx={{}}>
          Unauthorized
        </Typography>
        <GoBackButton />
      </Stack>
    </Stack>
  );
}
