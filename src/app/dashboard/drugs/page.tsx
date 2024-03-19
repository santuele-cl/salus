import { Paper, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import TableSkeleton from "@/app/_ui/TableSkeleton";
import DrugsTable from "./_components/DrugsTable";
import AddDrugFormModal from "./_components/AddDrugFormModal";
import SearchDrug from "./_components/SearchDrug";

export default async function DrugsPage({
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
        Drugs
      </Typography>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SearchDrug placeholder="Search drug..." />
          <AddDrugFormModal />
        </Stack>
      </Paper>

      <Paper elevation={1} sx={{ p: 2 }}>
        <Suspense key={query + page} fallback={<TableSkeleton />}>
          <DrugsTable />
        </Suspense>
      </Paper>
    </Stack>
  );
}
