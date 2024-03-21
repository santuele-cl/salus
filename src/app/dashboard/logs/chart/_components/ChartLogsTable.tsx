import { getChartLogs } from "@/actions/logs/chart-logs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";

interface TableProps {
  userId?: string;
  patientId?: string;
  query?: string;
  page?: number;
}

export default async function ChartLogsTable(props: TableProps) {
  const { userId, query, page, patientId } = props;
  const propsKey = Object.keys(props);

  console.log("propsKey", propsKey);

  const response = await getChartLogs({
    userId: userId,
    patientId: patientId,
    query: query,
    page: Number(page) || 1,
  });

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, overflow: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
              LOG ID
            </TableCell>

            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              ACTION
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              LOG TIME
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              DESCRIPTION
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              PATIENT
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              EMPLOYEE
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              IP ADDRESS
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              USER AGENT
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response && response.data && response.data.length ? (
            response.data.map((log) => {
              const {
                id,
                action,
                logTime,
                logDescription,
                patientId,
                employeeId,
                ipAddress,
                userAgent,
              } = log;
              return (
                <TableRow
                  key={id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {id}
                  </TableCell>
                  <TableCell align="left">{action}</TableCell>

                  <TableCell align="left">{`${dayjs(logTime).format(
                    "MMMM d, YYYY hh:mm a"
                  )}`}</TableCell>
                  <TableCell align="left">{logDescription}</TableCell>
                  <TableCell align="left">{patientId}</TableCell>
                  <TableCell align="left">{employeeId}</TableCell>
                  <TableCell align="left">{ipAddress}</TableCell>
                  <TableCell align="left" sx={{ textWrap: "pretty" }}>
                    {userAgent}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0, p: 0 },
              }}
            >
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="right">Empty</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
