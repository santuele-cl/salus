import { getClinicalDepartments } from "@/actions/departments/clinical-departments";
import { getLogs } from "@/actions/logs/logs";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LogType } from "@prisma/client";
import dayjs from "dayjs";
// import DeleteClinicalDepartment from "./DeleteClinicalDepartment";
// import EditClinicalDepartmentFormModal from "./EditClinicalDepartmentFormModal";

interface TableProps {
  type?: LogType;
  userId?: string;
  query?: string;
  page?: number;
}

export default async function LogsTable(props: TableProps) {
  const { type, userId, query, page } = props;
  const propsKey = Object.keys(props);

  console.log("propsKey", propsKey);

  const response = await getLogs({
    // type: "LOGIN",
    type: type,
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
            <TableCell sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
              TYPE
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
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="right"
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response && response.data && response.data.length ? (
            response.data.map((log) => {
              const {
                id,
                type,
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
                  <TableCell component="th" scope="row">
                    {type}
                  </TableCell>
                  <TableCell align="left">{`${dayjs(logTime).format(
                    "MMMM d, YYYY hh:mm a"
                  )}`}</TableCell>
                  <TableCell align="left">{userId}</TableCell>
                  <TableCell align="left">{ipAddress}</TableCell>
                  <TableCell
                    align="left"
                    sx={{ textWrap: "pretty", maxWidth: "30px" }}
                  >
                    {userAgent}
                  </TableCell>
                  <TableCell align="left">{errorMessage}</TableCell>
                  <TableCell align="right">
                    <Stack
                      sx={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    ></Stack>
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
