import { Box, Stack, Typography } from "@mui/material";
import HomeNavbar from "./_ui/home/HomeNavbar";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import LoginForm from "./_ui/auth/LoginForm";

export default async function Home() {
  return (
    <Box
      sx={{
        bgcolor: "gray.light",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        w: "100%",
      }}
    >
      <LoginForm />
    </Box>
    // <main>
    //   <HomeNavbar />
    //   <Stack sx={{ position: "relative", minHeight: "100vh" }}>
    //     <Stack
    //       sx={{
    //         color: "rgba(0,0,0,0.6)",
    //         position: "absolute",
    //         top: "50%",
    //         left: "50%",
    //         transform: "translate(-50%,-50%)",
    //         textAlign: "center",
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <Typography variant="h3" sx={{}}>
    //         Page Under Construction
    //       </Typography>
    //       <ConstructionOutlinedIcon
    //         sx={{ color: "rgba(0,0,0,0.4)", fontSize: 140 }}
    //       />
    //     </Stack>
    //   </Stack>
    // </main>
  );
}
