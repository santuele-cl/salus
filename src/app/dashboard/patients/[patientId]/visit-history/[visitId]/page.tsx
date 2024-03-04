import { getVisityByVisitId } from "@/actions/patients/visits";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import UpdateIcon from "@mui/icons-material/Update";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import Prescriptions from "./_components/Prescriptions";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { Drugs, Vitals } from "@prisma/client";
import PhysicalExaminations from "./_components/PhysicalExaminations";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import Diagnosis from "./_components/Diagnosis";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import LaboratoryRequest from "./_components/LaboratoryRequest";

interface VitalsField {
  label: string;
  id: keyof Vitals;
}

const vitalsField: VitalsField[] = [
  { label: "Height", id: "heightInCm" },
  { label: "Weight", id: "weightInKg" },
  { label: "BP", id: "bloodPressure" },
  { label: "Pulse Rate", id: "pulseRate" },
  { label: "Respiratory Rate", id: "respiratoryRate" },
  { label: "Body Temparature", id: "bodyTemperatureInCelsius" },
  { label: "Oxygen Saturation", id: "oxygenSaturation" },
  // { label: "Checked by", id: "" },
  { label: "Date checked", id: "createdAt" },
];

const VisitPage = async ({
  params: { visitId },
}: {
  params: { visitId: string };
}) => {
  const visit = await getVisityByVisitId(visitId);
  const prescriptions = visit.data?.prescriptions;
  const physicalExaminations = visit.data?.physicalExamination;
  const laboratoryRequests = visit.data?.laboratoryRequest;
  const diagnoses = visit.data?.diagnosis;

  // console.log(visit.data);
  // console.log(physicalExaminations);
  // console.log(diagnoses);
  console.log(laboratoryRequests);
  return (
    <div>
      {/* {JSON.stringify(visit.data)} */}
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
            <Typography variant="h6" component="span">{`${format(
              visit.data?.createdAt as Date,
              " MMMM d, yyyy h:mm: a"
            )}`}</Typography>
          </Typography>
          <Stack direction="row">
            <UpdateIcon sx={{ fontSize: 22 }} />
            <Typography component="span">
              Updated :{" "}
              <Typography component="span" variant="subtitle2">{`${format(
                visit.data?.updatedAt as Date,
                " MMMM d, yyyy h:mm: a"
              )}`}</Typography>
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Stack>
          <Stack direction="row">
            <Typography>Details</Typography>
          </Stack>
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
                <LibraryAddOutlinedIcon sx={{ fontSize: 25 }} />
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
                  {/* {JSON.stringify(Object.keys(visit.data?.vitals!))} */}
                  {visit.data?.vitals &&
                    vitalsField.map(({ label, id }) => {
                      const vitals = visit.data?.vitals;

                      if (!vitals) return;

                      return (
                        <Stack
                          key={id}
                          sx={{
                            flexDirection: "row",
                            alignItems: "center",
                            // justifyContent: "space-between",
                            gap: 2,
                          }}
                        >
                          <Typography variant="subtitle2">{label}</Typography>
                          {typeof vitals[id] === "object" ? (
                            <Box
                              sx={{ marginLeft: "auto", fontStyle: "italic" }}
                            >{`${format(
                              vitals[id]!,
                              " MMMM d, yyyy h:mm: a"
                            )}`}</Box>
                          ) : (
                            <Box
                              sx={{
                                marginLeft: "auto",
                                color: "success.main",
                                fontWeight: "bold",
                              }}
                            >
                              {vitals[id] as string}
                            </Box>
                          )}

                          {/* <Box>
                          <MonitorHeartOutlinedIcon sx={{ fontSize: 20 }} />
                        </Box> */}
                        </Stack>
                      );
                    })}
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
                <LibraryAddOutlinedIcon sx={{ fontSize: 25 }} />
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
            {/* DIAGNOSIS */}
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
                <LibraryAddOutlinedIcon sx={{ fontSize: 25 }} />
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
                <LibraryAddOutlinedIcon sx={{ fontSize: 25 }} />
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
                <LibraryAddOutlinedIcon sx={{ fontSize: 25 }} />
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
