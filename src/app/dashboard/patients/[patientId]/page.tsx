import { getPatientByid } from "@/actions/patients";
import { Box } from "@mui/material";

const ActiveTab = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  // console.log(patientId);
  const patient = await getPatientByid(patientId);

  return <Box>{JSON.stringify(patient)}</Box>;
};

export default ActiveTab;
