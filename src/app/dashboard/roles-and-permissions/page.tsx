import RolesTable from "./_components/RolesTable";
import { Paper, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import AddRoleFormModal from "./_components/AddRoleFormModal";
import TableSkeleton from "@/app/_ui/TableSkeleton";
import RoleSearch from "./_components/Search";

const RolesAndPermissionPage = async ({
  searchParams: { query = "", page = "1" },
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) => {
  return (
    <Stack gap={2}>
      <Typography variant="h4" sx={{ my: 2 }}>
        Roles and Permissions
      </Typography>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <RoleSearch placeholder="Search" />
          <AddRoleFormModal />
        </Stack>
      </Paper>

      <Paper elevation={1} sx={{ p: 2 }}>
        <Suspense
          key={query + page}
          fallback={<TableSkeleton />}
          // fallback={<h1>Loading..</h1>}
        >
          <RolesTable />
        </Suspense>
      </Paper>
    </Stack>
  );
};
export default RolesAndPermissionPage;
