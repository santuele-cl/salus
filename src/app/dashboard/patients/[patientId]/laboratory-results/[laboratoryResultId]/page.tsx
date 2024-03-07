import { getLaboratoryResultsByPatientId } from "@/actions/patients/laboratory-results";
import { Stack } from "@mui/system";
import CoronavirusOutlinedIcon from "@mui/icons-material/CoronavirusOutlined";
import laboratory from "../../visit-history/[visitId]/_components/Allergy";

const LaboratoryResults = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const labResults = await getLaboratoryResultsByPatientId(patientId);

  return <div>{JSON.stringify(labResults)}</div>;
  //   <Stack
  //   sx={{
  //     flexDirection: "row",
  //     p: 1,
  //     border: "1px solid rgba(0,0,0,0.1)",
  //     borderRadius: "4px",
  //   }}
  //   gap={2}
  // >
  //   <Stack sx={{ p: 3 }}>
  //     <LocalPharmacyIcon sx={{ fontSize: 40 }} />
  //   </Stack>
  //   <Stack sx={{ flexGrow: "1", p: 2, gap: 2 }}>
  //       <labResults laboratory={laboratory!} key={laboratory?.id} />
  //   </Stack>
  // </Stack>
  // )
};
export default LaboratoryResults;
