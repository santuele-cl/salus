import { getPatientByid } from "@/actions/patients";
import { Box } from "@mui/material";

const ActiveTab = async ({ patientId }: { patientId: string }) => {
  const patient = await getPatientByid(patientId);

  return <Box>{JSON.stringify(patient)}</Box>;
};

export default ActiveTab;
