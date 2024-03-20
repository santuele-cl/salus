import { Paper, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import TableSkeleton from "@/app/_ui/TableSkeleton";
import ServiceDepartmentsTable from "./_components/ServiceDepartmentsTable";
import AddServiceDepartmentFormModal from "./_components/AddServiceDepartmentFormModal";
import ServiceDepartmentSearch from "./_components/ServiceDepartmentSearch";

export default async function ServiceDepartmentsPage({
  searchParams: { query = "", page = "1" },
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  return (
    <Stack gap={2}>
      <Typography variant="h4" sx={{ my: 2 }}>
        Service Departments
      </Typography>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ServiceDepartmentSearch placeholder="Search service department..." />
          <AddServiceDepartmentFormModal />
        </Stack>
      </Paper>

      <Paper elevation={1} sx={{ p: 2 }}>
        <Suspense key={query + page} fallback={<TableSkeleton />}>
          <ServiceDepartmentsTable />
        </Suspense>
      </Paper>
    </Stack>
  );
}
