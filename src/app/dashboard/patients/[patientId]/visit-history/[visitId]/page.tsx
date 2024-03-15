import { getVisityByVisitId } from "@/actions/patients/visits";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import Prescriptions from "./_components/prescription/Prescriptions";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { Drugs } from "@prisma/client";
import PhysicalExaminations from "./_components/PhysicalExaminations";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import Diagnosis from "./_components/Diagnosis";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import LaboratoryRequest from "./_components/laboratory-request/LaboratoryRequest";
import VitalSignsFormDrawer from "./_components/VitalSignsFormDrawer";
import PrescriptionFormDrawer from "./_components/prescription/PrescriptionFormDrawer";
import Vital from "./_components/Vital";
import LaboratoryRequestDrawer from "./_components/laboratory-request/LaboratoryRequestFormDrawer";
import PhysicalExamFormDrawer from "./_components/physical-exam/PhysicalExamFormDrawer";
import DiagnosisFormDrawer from "./_components/diagnosis/DiagnosisFormDrawer";
import dayjs from "dayjs";
import CustomDiagnosisFormDrawer from "./_components/diagnosis/CustomDiagnosisFormDrawer";
import CustomPrescriptionFormDrawer from "./_components/prescription/CustomPrescriptionFormDrawer";
import CustomLaboratoryRequestFormDrawer from "./_components/laboratory-request/CustomLaboratoryRequestFormDrawer";

const VisitPage = async ({
  params: { visitId, patientId },
}: {
  params: { visitId: string; patientId: string };
}) => {
  const visit = await getVisityByVisitId(visitId);
  const vitals = visit.data?.vitals;
  const prescriptions = visit.data?.prescriptions;
  const physicalExaminations = visit.data?.physicalExamination;
  const laboratoryRequests = visit.data?.laboratoryRequest;
  const diagnoses = visit.data?.diagnosis;
  console.log(visit);

  return (
    <div>
      <Stack>
        <Stack
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Typography variant="body1" fontWeight={400}>
            Visit details for
            <Typography variant="h6" component="span">{`${dayjs(
              visit.data?.createdAt
            ).format("MMMM d, YYYY h:mm a")}`}</Typography>
          </Typography>
          <Stack direction="row">
            <UpdateIcon sx={{ fontSize: 22 }} />
            <Typography component="span">
              Updated :
              <Typography component="span" variant="subtitle2">{`${dayjs(
                visit.data?.updatedAt
              ).format("MMMM d, YYYY h:mm a")}`}</Typography>
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Stack spacing={2} sx={{ my: 1 }}>
          <Typography>Details</Typography>
          <Grid2 container spacing={2}>
            <Grid2 xs={12} md={6}>
              <TextField
                defaultValue={visit.data?.chiefComplaint}
                InputProps={{
                  readOnly: true,
                }}
                label="Chief complaint"
                fullWidth
              />
            </Grid2>
            <Grid2 xs={12} md={6}>
              <TextField
                multiline
                defaultValue={visit.data?.hpi}
                InputProps={{
                  readOnly: true,
                }}
                label="History of Present Illness"
                fullWidth
              />
            </Grid2>
            <Grid2 xs={12} md={6}>
              <TextField
                defaultValue={visit.data?.accompaniedBy}
                InputProps={{
                  readOnly: true,
                }}
                label="Accompanied by"
                fullWidth
              />
            </Grid2>
          </Grid2>
        </Stack>
        <Stack
          gap={2}
          sx={{
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          <Grid2 xs={12} lg={6} container gap={2}>
            {/* VITALS */}
            <Grid2 xs={12}>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  borderRadius: 1,
                  bgcolor: "gray.light",
                }}
              >
                <Typography variant="h6" sx={{ fontSize: "14px" }}>
                  Vitals
                </Typography>
                {!visit.data?.vitals && (
                  <VitalSignsFormDrawer visitId={visitId} />
                )}
              </Stack>
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
                  <MonitorHeartOutlinedIcon sx={{ fontSize: 40 }} />
                </Stack>
                <Stack sx={{ flexGrow: "1", p: 2 }}>
                  {vitals && <Vital vitals={vitals} />}
                </Stack>
              </Stack>
            </Grid2>
            {/* PHYSICAL EXAMS */}
            <Grid2 xs={12}>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  borderRadius: 1,
                  bgcolor: "gray.light",
                }}
              >
                <Typography variant="h6" sx={{ fontSize: "14px" }}>
                  Physical Examination
                </Typography>
                <PhysicalExamFormDrawer
                  visitId={visitId}
                  patientId={patientId}
                />
              </Stack>
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
                  <AccessibilityIcon sx={{ fontSize: 40 }} />
                </Stack>
                <Stack sx={{ flexGrow: "1", p: 2, gap: 2 }}>
                  {physicalExaminations &&
                    physicalExaminations.length &&
                    physicalExaminations.map((physicalExamination, index) => {
                      return (
                        <PhysicalExaminations
                          physicalExamination={physicalExamination}
                          key={physicalExamination.id}
                        />
                      );
                    })}
                </Stack>
              </Stack>
            </Grid2>
            {/* DIAGNOSIS */}0
            <Grid2 xs={12}>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  borderRadius: 1,
                  bgcolor: "gray.light",
                }}
              >
                <Typography variant="h6" sx={{ fontSize: "14px" }}>
                  Diagnosis
                </Typography>
                <CustomDiagnosisFormDrawer
                  patientId={patientId}
                  visitId={visitId}
                />
              </Stack>
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
                  <MedicalInformationOutlinedIcon sx={{ fontSize: 40 }} />
                </Stack>
                <Stack sx={{ flexGrow: "1", p: 2, gap: 2 }}>
                  {diagnoses &&
                    diagnoses.length &&
                    diagnoses.map((diagnosis, index) => {
                      return (
                        <Diagnosis diagnosis={diagnosis} key={diagnosis.id} />
                      );
                    })}
                </Stack>
              </Stack>
            </Grid2>
          </Grid2>
          <Grid2
            xs={12}
            lg={6}
            container
            gap={2}
            sx={{ alignContent: "flex-start" }}
          >
            {/* PRESCRIPTIONS */}
            <Grid2 xs={12}>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  borderRadius: 1,
                  bgcolor: "gray.light",
                }}
              >
                <Typography variant="h6" sx={{ fontSize: "14px" }}>
                  Prescriptions
                </Typography>
                <CustomPrescriptionFormDrawer
                  visitId={visitId}
                  patientId={patientId}
                />
              </Stack>
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
                  <Typography sx={{ fontSize: 40 }}>
                    R
                    <Typography component="span" sx={{ fontSize: 25 }}>
                      x
                    </Typography>
                  </Typography>
                </Stack>
                <Stack sx={{ flexGrow: "1", p: 2, gap: 2 }}>
                  {prescriptions &&
                    prescriptions.length &&
                    prescriptions.map((prescription, index) => {
                      const drugs = prescription.drugs as Drugs;
                      return (
                        <Prescriptions
                          drugs={drugs}
                          data={prescription}
                          key={prescription.id}
                        />
                      );
                    })}
                </Stack>
              </Stack>
            </Grid2>
            {/* LAB REQUESTS */}
            <Grid2 xs={12}>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  borderRadius: 1,
                  bgcolor: "gray.light",
                }}
              >
                <Typography variant="h6" sx={{ fontSize: "14px" }}>
                  Laboratory Request
                </Typography>
                <CustomLaboratoryRequestFormDrawer
                  visitId={visitId}
                  patientId={patientId}
                />
              </Stack>
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
                  <BiotechOutlinedIcon sx={{ fontSize: 40 }} />
                </Stack>
                <Stack sx={{ flexGrow: "1", p: 2, gap: 2 }}>
                  {laboratoryRequests &&
                    laboratoryRequests.length &&
                    laboratoryRequests.map((laboratoryRequest, index) => {
                      return (
                        <LaboratoryRequest
                          requestingPhysician={
                            laboratoryRequest.requestingPhysician
                          }
                          laboratoryProcedure={
                            laboratoryRequest.laboratoryProcedure!
                          }
                          laboratoryRequest={laboratoryRequest}
                          key={laboratoryRequest.id}
                        />
                      );
                    })}
                </Stack>
              </Stack>
            </Grid2>
          </Grid2>
        </Stack>
      </Stack>
    </div>
  );
};
export default VisitPage;
