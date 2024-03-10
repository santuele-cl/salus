import { Stack } from "@mui/system";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import Vaccination from "../../visit-history/[visitId]/_components/Vaccination";
import { getVaccinationsByVaccinationsId } from "@/actions/patients/vaccinations";

const VaccinationPage = async ({
  params: { vaccinationId },
}: {
  params: { vaccinationId: string };
}) => {
  const response = await getVaccinationsByVaccinationsId(vaccinationId);
  const vaccination = response.data;
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
        <LocalPharmacyIcon sx={{ fontSize: 40 }} />
      </Stack>
      <Stack sx={{ flexGrow: "1", p: 2, gap: 2 }}>
        <Vaccination vaccination={vaccination!} key={vaccination?.id} />
      </Stack>
    </Stack>
  );
};
export default VaccinationPage;
