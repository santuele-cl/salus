import ResetPasswordForm from "@/app/_ui/auth/ResetPasswordForm";
import NewResetPasswordForm from "@/app/_ui/auth/register/NewResetPasswordForm";
import { Box } from "@mui/material";

const ResetPasswordPage = () => {
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
      <NewResetPasswordForm />
    </Box>
  );
};
export default ResetPasswordPage;
