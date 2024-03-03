import { Box, Stack, Typography } from "@mui/material";
import { Patient } from "@prisma/client";
import { FaUser } from "react-icons/fa";

interface SidebarFieldsType {
  id: keyof Patient;
  label: string;
}

const sidebarFields: SidebarFieldsType[] = [
  { id: "fname", label: "First name" },
  { id: "mname", label: "Middle name" },
  { id: "lname", label: "Last name" },
  { id: "age", label: "Age" },
  { id: "gender", label: "Gender" },
  //   { id: "bdate", label: "First name" },
];

const ProfileSidebar = ({ profile }: { profile: Patient | undefined }) => {
  if (!profile) return <Typography>Loading..</Typography>;

  // console.log("profile sidebar", profile);
  return (
    <Stack
      sx={{
        flexDirection: {
          xs: "row",
          xl: "column",
        },
        p: 2,
      }}
      gap={2}
    >
      <Stack
        sx={{
          width: "100%",
          p: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
        gap={2}
      >
        <Stack
          sx={{
            width: 100,
            height: 100,
            py: 4,
            px: 4,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            bgcolor: "gray.light",
          }}
        >
          <FaUser fontSize={150} />
        </Stack>
        <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h6" fontSize={16}>
            {`${profile?.fname} ${profile?.mname} ${profile?.lname}`.toUpperCase()}
          </Typography>
          <Typography variant="subtitle1">
            {profile?.contactInfo?.email}
          </Typography>
          <Typography variant="subtitle1">
            {profile?.contactInfo?.phone}
          </Typography>
        </Stack>
      </Stack>
      {/* <Box sx={{ width: "100%", height: "1px", bgcolor: "gray.light" }}></Box> */}
      <Stack gap={2} width="100%" sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{ textTransform: "uppercase", textAlign: "center" }}
        >
          Details
        </Typography>
        {sidebarFields.map(({ id, label }, i) => {
          const dates = ["bdate", "createdAt", "updatedAt"];
          const bool = ["bdate", "createdAt", "updatedAt"];
          if (dates.includes(id)) return;
          return (
            <Stack direction="row" justifyContent="space-between" key={i}>
              <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
              <Typography>{profile[id]}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
export default ProfileSidebar;
