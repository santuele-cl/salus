import { getVisityByVisitId } from "@/actions/patients/visits";
import { Divider, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import UpdateIcon from "@mui/icons-material/Update";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";

const VisitPage = async ({
  params: { visitId },
}: {
  params: { visitId: string };
}) => {
  const visit = await getVisityByVisitId(visitId);
  console.log(visit.data);
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
        <Grid2 container spacing={2}>
          <Grid2
            xs={12}
            lg={6}
            container
            spacing={2}
            // sx={{ border: "1px solid red" }}
          >
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
                spacing={2}
              >
                <Stack sx={{ p: 3 }}>
                  <MonitorHeartOutlinedIcon sx={{ fontSize: 40 }} />
                </Stack>
                <Stack>aksjdfkdjs</Stack>
              </Stack>
            </Grid2>
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
            </Grid2>
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
            </Grid2>
          </Grid2>
          <Grid2 xs={12} lg={6} container spacing={2}>
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
            </Grid2>
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
            </Grid2>
          </Grid2>
        </Grid2>
      </Stack>
    </div>
  );
};
export default VisitPage;
