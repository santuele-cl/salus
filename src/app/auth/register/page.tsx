import RegisterForm from "@/app/_ui/auth/RegisterForm";
import SideLogo from "@/app/_ui/auth/register/SideLogo";
import { Box, Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const RegisterPage = () => {
  return (
    <Box
      sx={{
        bgcolor: "common.white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // maxHeight: "100vh",
        // minHeight: "100vh",
        w: "100%",
        p: 4,
        // overflow: "hidden",
      }}
    >
      {/* <Grid2 container> */}
      {/* <Grid2 xs={12}> */}
      {/* <SideLogo /> */}
      {/* </Grid2> */}
      <RegisterForm />
      {/* </Grid2> */}
    </Box>
  );
};
export default RegisterPage;
