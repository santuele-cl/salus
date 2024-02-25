import LoginForm from "@/app/_ui/auth/LoginForm";
import { Box } from "@mui/material";

const LoginPage = () => {
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
  );
};
export default LoginPage;
