import { getFamilyMedicalHistoryByFamilyMedicalHistoryId } from "@/actions/patients/family-medical-history";
import { Stack } from "@mui/system";
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import FamilyMedicalHistory from "../../visit-history/[visitId]/_components/FamilyMedicalHistory";


const familyMedicalHistoryPage = async ({
  params: { familyMedicalHistoryId },
}: {
  params: { familyMedicalHistoryId: string };
}) => {
  const response = await getFamilyMedicalHistoryByFamilyMedicalHistoryId
    (familyMedicalHistoryId);
    const familyMedicalHistory = response.data
    console.log(familyMedicalHistory)
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
      <Diversity1OutlinedIcon sx={{ fontSize: 40 }} />
    </Stack>
    <Stack sx={{ flexGrow: "1", p: 2, gap: 2 }}>
      { familyMedicalHistory &&
        <FamilyMedicalHistory familyMedicalHistory={familyMedicalHistory} key={familyMedicalHistory?.id} />}
    </Stack>
  </Stack>
  )
};
export default familyMedicalHistoryPage;


