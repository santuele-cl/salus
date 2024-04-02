import { Box, Stack, Typography } from "@mui/material";
import { ContactInfo, Patient } from "@prisma/client";
import { FaUser } from "react-icons/fa";

interface SidebarFieldsType {
  id: keyof Patient;
  label: string;
}

const includes: SidebarFieldsType[] = [
  { id: "fname", label: "First name" },
  { id: "mname", label: "Middle name" },
  { id: "lname", label: "Last name" },
  { id: "age", label: "Age" },
  { id: "gender", label: "Gender" },
];

const ProfileSidebar = ({
  profile,
  contactInfo,
}: {
  profile: Patient;
  contactInfo: ContactInfo;
}) => {
  if (!profile) return <Typography>Loading..</Typography>;

  // console.log("profile sidebar", profile);
  return (
    <Stack
      sx={{
        flexDirection: {
          xs: "row",
          // xl: "column",
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
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" fontSize={16}>
            {`${profile?.fname} ${profile?.lname}`.toUpperCase()}
          </Typography>
          <Typography variant="subtitle1">{contactInfo?.email}</Typography>
          <Typography variant="subtitle1">{contactInfo?.phone}</Typography>
        </Stack>
      </Stack>
      <Stack gap={2} width="100%" sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{ textTransform: "uppercase", textAlign: "center" }}
        >
          Details
        </Typography>
        {includes.map(({ id, label }, i) => {
          const dates: Array<keyof Patient> = [
            "bdate",
            "createdAt",
            "updatedAt",
          ];
          if (dates.includes(id)) return;
          return (
            <Stack direction="row" justifyContent="space-between" key={i}>
              <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
              <Typography>{profile[id] as string}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
export default ProfileSidebar;
