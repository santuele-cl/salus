import { Paper, Stack } from "@mui/material";
import { Suspense } from "react";
import TotalUser from "./user-table-header/TotalUser";
import TotalActiveUser from "./user-table-header/TotalActiveUsers";
import TotalInactiveUser from "./user-table-header/TotalInactiveUser";

const UsersTableHeader = () => {
  return (
    <Stack direction="row" gap={3} sx={{}}>
      <Paper sx={{ alignSelf: "flex-start", p: 3 }}>
        <Stack direction="row" gap={5}>
          <Suspense fallback={<h1>Loading...</h1>}>
            <TotalUser />
          </Suspense>
        </Stack>
      </Paper>
      <Paper sx={{ alignSelf: "flex-start", p: 3 }}>
        <Stack direction="row" gap={5}>
          <Suspense fallback={<h1>Loading...</h1>}>
            <TotalActiveUser />
          </Suspense>
        </Stack>
      </Paper>
      <Paper sx={{ alignSelf: "flex-start", p: 3 }}>
        <Stack direction="row" gap={5}>
          <Suspense fallback={<h1>Loading...</h1>}>
            <TotalInactiveUser />
          </Suspense>
        </Stack>
      </Paper>
    </Stack>
  );
};
export default UsersTableHeader;
