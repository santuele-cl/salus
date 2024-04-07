import { Stack, Typography } from "@mui/material";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { getTotalUsersCount } from "@/actions/users/users";

const TotalUser = async () => {
  const usersTotalCount = await getTotalUsersCount();

  return (
    <>
      <Stack direction="column">
        <Typography variant="h4" sx={{ color: "common.black" }}>
          {usersTotalCount.data}
        </Typography>
        <Typography variant="subtitle1">Total Users</Typography>
      </Stack>
      <Stack>
        <PeopleOutlinedIcon sx={{ fontSize: 50, color: "primary.light" }} />
      </Stack>
    </>
  );
};
export default TotalUser;
