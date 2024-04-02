import {
  getPrescriptionByPrescriptionId,
  getPrescriptionsByPatientId,
} from "@/actions/patients/prescriptions";
import { Stack } from "@mui/system";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import Prescriptions from "../../visit-history/[visitId]/_components/prescription/Prescriptions";
import Prescription from "../../visit-history/[visitId]/_components/prescription/Prescription";
import { getLaboratoryRequestByLaboratoryRequestId } from "@/actions/patients/laboratory-requests";
import LaboratoryRequest from "./_components/LaboratoryRequest";
import { Box } from "@mui/material";

const LaboratoryRequestById = async ({
  params: { laboratoryRequestId },
}: {
  params: { laboratoryRequestId: string };
}) => {
  const response = await getLaboratoryRequestByLaboratoryRequestId(
    laboratoryRequestId
  );
  const laboratoryRequest = response.data;
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
        {laboratoryRequest &&
        laboratoryRequest.laboratoryProcedure &&
        laboratoryRequest.requestingPhysician ? (
          <LaboratoryRequest
            laboratoryProcedure={laboratoryRequest?.laboratoryProcedure}
            requestingPhysician={laboratoryRequest?.requestingPhysician}
            laboratoryRequest={laboratoryRequest!}
            key={laboratoryRequest?.id}
          />
        ) : (
          <Box>Empty</Box>
        )}
      </Stack>
    </Stack>
  );
};
export default LaboratoryRequestById;
