import { getUserById } from "@/actions/users/users";
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import dayjs from "dayjs";
import Image from "next/image";

const show = [
  { id: "username", label: "Username" },
  { id: "email", label: "Email" },
  { id: "id", label: "ID" },
  { id: "id", label: "ID" },
  { id: "id", label: "ID" },
  { id: "id", label: "ID" },
  { id: "id", label: "ID" },
];

const UserPage = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const response = await getUserById(userId);

  return (
    <Stack gap={2}>
      <Typography variant="h5" sx={{ mt: 2 }}>
        <Typography component="span" variant="h4" sx={{ mr: 1 }}>
          {userId}
        </Typography>
        Details
      </Typography>
      <Paper>
        <Stack sx={{ flexDirection: "row" }} gap={2}>
          <Stack
            sx={{
              flex: "0 0 350px",
              alignSelf: "flex-start",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              p: 4,
            }}
          >
            <Stack sx={{ alignItems: "center", width: "100%" }}>
              <Avatar
                sx={{
                  height: 150,
                  width: 150,
                  fontSize: 50,
                  bgcolor: "secondary.main",
                }}
              >
                H
              </Avatar>
            </Stack>
            <Typography variant="h5">{response.data?.username}</Typography>
            <Stack direction="row" sx={{ gap: 2 }}>
              <Button variant="outlined" color="error">
                Deactivate
              </Button>
              <Button variant="contained">Edit</Button>
            </Stack>
          </Stack>
          <Stack gap={2} sx={{ p: 4, flex: "1 1" }}>
            <Stack sx={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
              <Typography variant="h6" sx={{ flex: "0 0 200px" }}>
                Username
              </Typography>
              <Typography variant="subtitle1">
                {response.data?.username}
              </Typography>
            </Stack>
            <Stack sx={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
              <Typography variant="h6" sx={{ flex: "0 0 200px" }}>
                Email
              </Typography>
              <Typography variant="subtitle1">
                {response.data?.email}
              </Typography>
            </Stack>
            <Stack sx={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
              <Typography variant="h6" sx={{ flex: "0 0 200px" }}>
                Account Type
              </Typography>
              <Typography variant="subtitle1">{response.data?.role}</Typography>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Grid2 container spacing={2}>
              <Grid2 xs={12} md={4}>
                <Stack
                  sx={{
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">Created at</Typography>
                  <Typography variant="subtitle1">
                    {dayjs(response.data?.createdAt).format(
                      "MMMM DD YYYY hh:mm a"
                    )}
                  </Typography>
                </Stack>
              </Grid2>
              <Grid2 xs={12} md={4}>
                <Stack
                  sx={{
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">Updated at</Typography>
                  <Typography variant="subtitle1">
                    {dayjs(response.data?.updatedAt).format(
                      "MMMM DD YYYY hh:mm a"
                    )}
                  </Typography>
                </Stack>
              </Grid2>
            </Grid2>
            {/* <Stack
              sx={{ flexDirection: "column", gap: 4, alignItems: "center" }}
            >
              <Typography variant="h6" sx={{ flex: "0 0 200px" }}>
                Created at
              </Typography>
              <Typography variant="subtitle1">
                {dayjs(response.data?.createdAt).format("MMMM DD YYYY hh:mm a")}
              </Typography>
            </Stack> */}
          </Stack>
        </Stack>
      </Paper>
      {/* {JSON.stringify(response.data)} */}
    </Stack>
  );
};
export default UserPage;
