import RegisterForm from "@/app/_ui/auth/RegisterForm";
import SideLogo from "@/app/_ui/auth/register/SideLogo";
import { Box, Container, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const RegisterPage = () => {
  return (
    // <Box
    //   sx={{
    //     bgcolor: "common.white",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     maxHeight: "100vh",
    //     minHeight: "100vh",
    //     w: "100%",
    //     p: 4,
    //     // overflow: "hidden",
    //   }}
    // >
    //   <Grid2 container>
    //     <Grid2 xs={12}>
    //       <SideLogo />
    //     </Grid2>
    //     <RegisterForm />
    //   </Grid2>
    // </Box>
    <Grid2
      container
      sx={{
        minHeight: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        // overflowY: "auto",
        // position: "relative",
      }}
    >
      <Grid2
        xs={12}
        md={4}
        sx={{
          // border: "1px solid yellow",
          // position: "sticky",
          // top: 0,
          bgcolor: "gray.light",
          // height: "100%",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          // textAlign: "center",
          p: 2,
        }}
      >
        <SideLogo />
        {/* <h1>Salus</h1> */}
      </Grid2>
      <Grid2
        xs={12}
        md={8}
        sx={{
          // border: "1px solid green",
          // alignItems: "center",
          // justifyContent: "center",
          // height: "100%",
          alignContent: "stretch",
          p: 8,
        }}
      >
        {/* B */}
        <RegisterForm />
      </Grid2>
    </Grid2>
  );
};
export default RegisterPage;
