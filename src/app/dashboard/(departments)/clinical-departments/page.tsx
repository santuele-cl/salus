import { Paper, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import ClinicalDepartmentsTable from "./_components/ClinicalDepartmentsTable";
import AddClinicalDepartmentFormModal from "./_components/AddClinicalDepartmentFormModal";

const page = async ({
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
        Clinical Departments
      </Typography>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <Search placeholder="Search" /> */}
          <AddClinicalDepartmentFormModal />
        </Stack>
      </Paper>

      <Paper elevation={1} sx={{ p: 2 }}>
        <Suspense
          key={query + page}
          //   fallback={<InvoicesTableSkeleton />}
          fallback={<h1>Loading..</h1>}
        >
          {/* <RolesTable /> */}
          <ClinicalDepartmentsTable />
        </Suspense>
      </Paper>
    </Stack>
  );
};

export default page;