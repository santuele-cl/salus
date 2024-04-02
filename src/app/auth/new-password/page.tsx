import NewPassword from "@/app/_ui/auth/register/NewPassword";
import { Box } from "@mui/material";

const NewPasswordPage = () => {
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
      <NewPassword />
    </Box>
  );
};
export default NewPasswordPage;
