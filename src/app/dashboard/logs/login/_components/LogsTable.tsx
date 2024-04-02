import { getLoginLogs } from "@/actions/logs/login-logs";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";

interface TableProps {
  userId?: string;
  query?: string;
  page?: number;
}

export default async function LogsTable(props: TableProps) {
  const { userId, query, page } = props;
  const propsKey = Object.keys(props);

  console.log("propsKey", propsKey);

  const response = await getLoginLogs({
    userId: userId,
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
              LOG TIME
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              USER ID
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
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              ERROR MESSAGE
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response && response.data && response.data.length ? (
            response.data.map((log) => {
              const {
                id,
                logTime,
                userId,
                ipAddress,
                userAgent,
                errorMessage,
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

                  <TableCell align="left">{`${dayjs(logTime).format(
                    "MMMM DD, YYYY hh:mm a"
                  )}`}</TableCell>
                  <TableCell align="left">
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography variant="subtitle2">{userId}</Typography>
                      <Link href={`/dashboard/users/${userId}`}>
                        <LaunchOutlinedIcon fontSize="small" />
                      </Link>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">{ipAddress}</TableCell>
                  <TableCell align="left" sx={{ textWrap: "pretty" }}>
                    {userAgent}
                  </TableCell>
                  <TableCell align="left">{errorMessage}</TableCell>
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
              <TableCell align="right"></TableCell>
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
