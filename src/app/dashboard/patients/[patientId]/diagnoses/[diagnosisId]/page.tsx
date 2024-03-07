import { getDiagnosisByDiagnosisId } from "@/actions/patients/diagnosis";
import Diagnosis from "../../visit-history/[visitId]/_components/Diagnosis";
import { Stack } from "@mui/material";
import TroubleshootOutlinedIcon from "@mui/icons-material/TroubleshootOutlined";

const DiagnosisPage = async ({
  params: { diagnosisId },
}: {
  params: { diagnosisId: string };
}) => {
  const response = await getDiagnosisByDiagnosisId(diagnosisId);
  const diagnosis = response.data;

  // TODO: Display neccessary information. Incomplete displayed ATM
  return (
    <Stack
      sx={{
        flexDirection: "row",
        p: 1,
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "4px",
      }}
      gap={2}
    >
      <Stack sx={{ p: 3 }}>
        <TroubleshootOutlinedIcon sx={{ fontSize: 40 }} />
      </Stack>
      <Stack sx={{ flexGrow: "1", p: 2, gap: 2 }}>
        <Diagnosis diagnosis={diagnosis!} key={diagnosis?.id} />
      </Stack>
    </Stack>
  );
};
export default DiagnosisPage;
