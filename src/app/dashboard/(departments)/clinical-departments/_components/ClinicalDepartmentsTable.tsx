import { getClinicalDepartments } from "@/actions/departments/clinical-departments";
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
import dayjs from "dayjs";
import DeleteClinicalDepartment from "./DeleteClinicalDepartment";
import EditClinicalDepartmentFormModal from "./EditClinicalDepartmentFormModal";

const ClinicalDepartmentsTable = async () => {
  const response = await getClinicalDepartments();

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, overflow: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
              Department ID
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              Department Name
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              Department Head
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              Description
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              Created At
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              Updated At
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
            response.data.map((clinicalDepartment) => {
              const { id, description, createdAt, updatedAt, head, name } =
                clinicalDepartment;
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
                  <TableCell align="left">{name}</TableCell>
                  <TableCell align="left">{head}</TableCell>
                  <TableCell align="left">{description}</TableCell>
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
                      <DeleteClinicalDepartment
                        clinicalDepartmentId={id}
                        clinicalDepartmentName={name}
                      />
                      <EditClinicalDepartmentFormModal
                        clinicalDepartment={clinicalDepartment}
                      />
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

export default ClinicalDepartmentsTable;
