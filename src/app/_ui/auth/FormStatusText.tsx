import { Box, Typography } from "@mui/material";

interface FormStatusTextType {
  message: string;
  status: "error" | "success";
}

const FormStatusText = ({ message, status }: FormStatusTextType) => {
  return (
    <Box
      bgcolor={status === "error" ? "error.light" : "success.light"}
      p={2}
      borderRadius={2}
    >
      <Typography color={status === "error" ? "error.dark" : "success.dark"}>
        {message}
      </Typography>
    </Box>
  );
};
export default FormStatusText;
