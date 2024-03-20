import { Paper, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import TableSkeleton from "@/app/_ui/TableSkeleton";
import LoginLogsTable from "./_components/LogsTable";
import SearchLogs from "../_components/SearchLogs";
import LogsTable from "./_components/LogsTable";
import { LogType } from "@prisma/client";

export default async function LoginLogsPage({
  searchParams: { query, page, type },
}: {
  searchParams: {
    query?: string;
    page?: string;
    type: LogType;
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
          Login Logs
        </Typography>
        <Paper sx={{ py: 2, px: 3 }} elevation={1}>
          <SearchLogs placeholder="Search by user id or type" />
        </Paper>
      </Stack>

      <Paper elevation={1} sx={{ p: 2 }}>
        <Suspense fallback={<TableSkeleton />}>
          <LogsTable query={query} page={Number(page)} type={type} />
        </Suspense>
      </Paper>
    </Stack>
  );
}
