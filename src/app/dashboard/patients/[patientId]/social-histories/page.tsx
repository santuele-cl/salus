import { getSocialHistoriesByPatientId } from "@/actions/patients/social-history";
import {
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";


const SocialHistories = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const response = await getSocialHistoriesByPatientId(patientId);
  const socialHistories = response.data;

  return (
    <Stack sx={{ padding: 3, gap: 2 }}>
      <Typography variant="h5">Social History</Typography>
      <Stack spacing='2px'>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} md={6}>
            <TextField
              label="Alcohol Use"
              defaultValue={socialHistories?.alcoholUse}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12} md={6}>
              <TextField
                label="Tobacco Use"
                defaultValue={socialHistories?.tobaccoUse}
                InputProps={{ readOnly: true }}
                fullWidth
              />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <TextField
              label="Drug Use"
              defaultValue={socialHistories?.drugUse}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <TextField
              label="Exercise Habits"
              defaultValue={socialHistories?.exerciseHabits}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <TextField
              label="Diet Habits"
              defaultValue={socialHistories?.dietHabits}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>

          <Grid2 xs={12} md={6}>
            <TextField
              label="Living Conditions"
              defaultValue={socialHistories?.livingConditions}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>
          
          <Grid2 xs={12} md={6}>
            <TextField
              label="Occupation"
              defaultValue={socialHistories?.occupation}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid2>
         
        </Grid2>
    </Stack>
  </Stack>

  );
};
export default SocialHistories;
