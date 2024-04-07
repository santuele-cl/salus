import { Stack, Typography } from "@mui/material";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { getTotalActiveUser } from "@/actions/users/users";

const TotalActiveUser = async () => {
  const usersTotalActive = await getTotalActiveUser();

  return (
    <>
      <Stack direction="column">
        <Typography variant="h4" sx={{ color: "common.black" }}>
          {usersTotalActive.data}
        </Typography>
        <Typography variant="subtitle1">Active users</Typography>
      </Stack>
      <Stack>
        <PeopleOutlinedIcon sx={{ fontSize: 40, color: "success.main" }} />
      </Stack>
    </>
  );
};
export default TotalActiveUser;
