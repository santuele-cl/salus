import { getPatientByid } from "@/actions/patients";
import {
  Stack,
  Box,
  Button,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const ProfilePage = async ({
  params: { patientId },
}: {
  params: {
    patientId: string;
  };
}) => {
  const patient = await getPatientByid(patientId);
  const data = patient.data;
  // Stack, Typography, TextField
  // sx = style
  return (
    <Stack sx={{ padding: 3, gap: 2 }}>
      <Typography variant="h5">Personal Information</Typography>
      <Grid2 container spacing={2}>
        {/* 12 columns */}
        <Grid2 xs={12} md={6}>
          <TextField
            label="First name"
            defaultValue={data?.fname}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Grid2>

        <Grid2 xs={12} md={6}>
          <Paper>
            <TextField
              label="Last name"
              defaultValue={data?.lname}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Paper>
        </Grid2>

        <Grid2 xs={12} md={6}>
          <TextField
            label="First name"
            defaultValue={data?.fname}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Grid2>
      </Grid2>

      <Typography variant="h5">Contact Information</Typography>
      <Grid2 container spacing={2}>
        {/* 12 columns */}
        <Grid2 xs={12} md={6}>
          <TextField
            label="First name"
            defaultValue={data?.fname}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Grid2>

        <Grid2 xs={12} md={6}>
          <Paper>
            <TextField
              label="Last name"
              defaultValue={data?.lname}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Paper>
        </Grid2>

        <Grid2 xs={12} md={6}>
          <TextField
            label="First name"
            defaultValue={data?.fname}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Grid2>
      </Grid2>
    </Stack>
  );
  // console.log(patient);
  // return <Stack>{JSON.stringify(patient)}</Stack>;
};

export default ProfilePage;
