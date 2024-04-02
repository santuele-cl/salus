import NewVerificationForm from "@/app/_ui/auth/NewVerificationForm";
import { Box } from "@mui/material";

const NewVerificationPage = () => {
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
      <NewVerificationForm />
    </Box>
  );
};
export default NewVerificationPage;
