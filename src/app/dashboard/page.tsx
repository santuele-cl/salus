import { getPatientByid } from "@/actions/patients";
import { Box, Typography } from "@mui/material";

const ActiveTab = async () => {
  // const patient = await getPatientByid(patientId);

  // return <Box>{JSON.stringify(patient.data)}</Box>;
  return (
    <Box>
      <Typography>Dashboard Page</Typography>
    </Box>
  );
};

export default ActiveTab;
