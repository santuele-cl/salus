import { getPatientByid } from "@/actions/patients";
import { Stack } from "@mui/material";

const ProfilePage = async ({
  params: { patientId },
}: {
  params: {
    patientId: string;
  };
}) => {
  const patient = await getPatientByid(patientId);
  console.log(patient);
  return <Stack>{JSON.stringify(patient)}</Stack>;
};

export default ProfilePage;
