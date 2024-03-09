import { Stack, Typography } from "@mui/material";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { getTotalInactiveUser } from "@/actions/users/users";

const TotalInactiveUser = async () => {
  const usersTotalInactive = await getTotalInactiveUser();

  return (
    <>
      <Stack direction="column">
        <Typography variant="h4" sx={{ color: "common.black" }}>
          {usersTotalInactive.data}
        </Typography>
        <Typography variant="subtitle1">Inactive users</Typography>
      </Stack>
      <Stack>
        <PersonOffIcon sx={{ fontSize: 40, color: "error.main" }} />
      </Stack>
    </>
  );
};
export default TotalInactiveUser;
