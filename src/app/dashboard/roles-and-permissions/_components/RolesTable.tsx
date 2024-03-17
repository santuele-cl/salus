import { deleteRole, getRoles } from "@/actions/roles-and-permissions";
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
import { EmployeeRole } from "@prisma/client";
import dayjs from "dayjs";

const RolesTable = async () => {
  const response = await getRoles();

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, overflow: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
              Role ID
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              Name
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              Date Created
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              Last Updated
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
            response.data.map((role) => {
              const { id, roleName, createdAt, updatedAt } = role;
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
                  <TableCell align="left">{roleName}</TableCell>
                  <TableCell align="left">{`${dayjs(createdAt).format(
                    "MMMM d, YYYY"
                  )}`}</TableCell>
                  <TableCell align="left">{`${dayjs(updatedAt).format(
                    "MMMM d, YYYY"
                  )}`}</TableCell>
                  <TableCell align="right">
                    <Stack
                      sx={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        //   LinkComponent={Link}
                        //   href={`${pathname}/${id}/visit-history`}
                        // onClick={() => deleteRole(id)}
                      >
                        DELETE
                      </Button>
                      <Button
                        variant="contained"
                        //   LinkComponent={Link}
                        //   href={`${pathname}/${id}/visit-history`}
                      >
                        UPDATE
                      </Button>
                    </Stack>
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
};
export default RolesTable;

// <TableContainer>
//       <Table sx={{ minWidth: 650, overflow: "auto" }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Role ID</TableCell>
//             <TableCell align="left">Name</TableCell>
//             <TableCell align="left">Date Created</TableCell>
//             <TableCell align="left">Last Updated</TableCell>
//             <TableCell align="right">Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           <TableRow
//             sx={{
//               "&:last-child td, &:last-child th": { border: 0, p: 0 },
//             }}
//           >
//             <TableCell component="th" scope="row"></TableCell>
//             <TableCell align="left"></TableCell>
//             <TableCell align="left"></TableCell>
//             <TableCell align="left"></TableCell>
//             <TableCell align="right"></TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
