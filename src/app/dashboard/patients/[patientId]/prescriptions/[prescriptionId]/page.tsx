import { getPrescriptionByPrescriptionId } from "@/actions/patients/prescriptions";
import { Stack } from "@mui/system";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import Prescriptions from "../../visit-history/[visitId]/_components/prescription/Prescription";
import Prescription from "../../visit-history/[visitId]/_components/prescription/Prescription";

const PrescriptionPage = async ({
  params: { prescriptionId },
}: {
  params: { prescriptionId: string };
}) => {
  const response = await getPrescriptionByPrescriptionId(prescriptionId);
  const prescription = response.data;
  const drugName = prescription?.drugs?.name;

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
        <Prescription
          drugName={drugName!}
          prescription={prescription!}
          key={prescription?.id}
        />
      </Stack>
    </Stack>
  );
};
export default PrescriptionPage;
