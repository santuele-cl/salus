import { Paper, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import TableSkeleton from "@/app/_ui/TableSkeleton";
import SearchLogs from "../_components/SearchLogs";
import ChartLogsTable from "./_components/ChartLogsTable";

export default async function LoginLogsPage({
  searchParams: { query, page },
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  return (
    <Stack gap={2}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" sx={{ my: 2 }}>
          Chart Logs
        </Typography>
        <Paper sx={{ py: 2, px: 3 }} elevation={1}>
          <SearchLogs placeholder="Search..." />
        </Paper>
      </Stack>

      <Paper elevation={1} sx={{ p: 2 }}>
        <Suspense fallback={<TableSkeleton />}>
          <ChartLogsTable query={query} page={Number(page)} />
        </Suspense>
      </Paper>
    </Stack>
  );
}
