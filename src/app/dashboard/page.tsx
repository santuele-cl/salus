import { getPatientByid } from "@/actions/patients";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";

const ActiveTab = async ({ patientId }: { patientId: string }) => {
  redirect("/dashboard/patients");
  // const patient = await getPatientByid(patientId);

  // return <Box>{JSON.stringify(patient)}</Box>;
};

export default ActiveTab;
