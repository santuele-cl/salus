import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import RegisterForm from "../_ui/auth/RegisterForm";

export default function PatientOnboardingPage() {
  return (
    <Grid2
      xs={12}
      md={8}
      sx={{
        alignContent: "stretch",
        p: 8,
      }}
    >
      {/* B */}
      <RegisterForm />
    </Grid2>
  );
}
