import { getPatientByid } from "@/actions/patients";
import { Stack, TextField, Typography, InputAdornment } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import dayjs from "dayjs";

const ProfilePage = async ({
  params: { patientId },
}: {
  params: {
    patientId: string;
  };
}) => {
  const patient = await getPatientByid(patientId);
  const data = patient.data;

  return (
    <Stack sx={{ padding: 3, gap: 2 }}>
      <Typography variant="h5">Personal Information</Typography>
      <Stack spacing="2px">
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
            <TextField
              label="Middle name"
              defaultValue={data?.mname}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <TextField
              label="Last name"
              defaultValue={data?.lname}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <TextField
              label="Suffix"
              defaultValue={data?.nameSuffix}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <TextField
              label="Gender"
              defaultValue={data?.gender}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>

          <Grid2 xs={12} md={6}>
            <TextField
              label="Age"
              defaultValue={data?.age}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>

          <Grid2 xs={12} md={6}>
            <TextField
              label="Birth date"
              defaultValue={`${dayjs(data?.bdate).format("MMMM d, YYYY")}`}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <TextField
              label="Birth place"
              defaultValue={data?.bplace}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <TextField
              label="Civil Status"
              defaultValue={data?.civilStatus}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <TextField
              label="Occupation"
              defaultValue={data?.occupation}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>
        </Grid2>
      </Stack>
      <Typography variant="h5">Contact Information</Typography>
      <Grid2 container spacing={2}>
        {/* 12 columns */}
        <Grid2 xs={12} md={6}>
          <TextField
            label="Patient ID"
            defaultValue={data?.contactInfo?.patientId}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <TextField
            label="Contact number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+63</InputAdornment>
              ),
              readOnly: true,
            }}
            defaultValue={data?.contactInfo?.phone}
            fullWidth
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <TextField
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">@</InputAdornment>
              ),
              readOnly: true,
            }}
            defaultValue={data?.contactInfo?.email}
            fullWidth
          />
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default ProfilePage;
