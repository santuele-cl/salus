import { getAllergyByAllergyId } from "@/actions/patients/allergies";
import { Stack } from "@mui/system";
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import Allergy from "../../visit-history/[visitId]/_components/Allergy";

const AllergyPage = async ({
  params: { allergyId },
}: {
  params: { allergyId: string };
}) => {
  const response = await getAllergyByAllergyId
  (allergyId);
  const allergy = response.data
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
      <CoronavirusOutlinedIcon sx={{ fontSize: 40 }} />
    </Stack>
    <Stack sx={{ flexGrow: "1", p: 2, gap: 2 }}>
        <Allergy allergy={allergy!} key={allergy?.id} />
    </Stack>
  </Stack>
  )
};
export default AllergyPage;
