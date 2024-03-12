import { Typography } from "@mui/material";
import HomeNavbar from "./_ui/home/HomeNavbar";

export default async function Home() {
  return (
    <main>
      <HomeNavbar />
      <Typography variant="h1">Salus</Typography>
    </main>
  );
}
