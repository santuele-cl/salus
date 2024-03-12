import { getPatientByid } from "@/actions/patients";
import { Box, Paper, Typography } from "@mui/material";

const ActiveTab = async () => {
  // const patient = await getPatientByid(patientId);

  // return <Box>{JSON.stringify(patient.data)}</Box>;
  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h2">Welcome to Salus Dashboard</Typography>
      </Box>
    </Paper>
  );
};

export default ActiveTab;
