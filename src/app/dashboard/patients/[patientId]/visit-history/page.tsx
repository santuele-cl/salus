import { getVisitsByProfileId } from "@/actions/visits";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const VisitHistoryPage = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const visits = await getVisitsByProfileId(patientId);

  console.log("visits", visits.data);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, overflow: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Patient ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Middle Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Birthdate</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              asdfkj
            </TableCell>
            <TableCell align="right">laskdfj</TableCell>
            <TableCell align="right">kasdf</TableCell>
            <TableCell align="right">LAKDSJ</TableCell>
            <TableCell align="right">ASDK</TableCell>
            <TableCell align="right">
              <Button variant="outlined">Select</Button>
            </TableCell>
          </TableRow>
          {/* {patients &&
              patients.map((patient) => {
                const { id, fname, mname, lname, bdate } = patient;
                return (
                  <TableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {id}
                    </TableCell>
                    <TableCell align="right">{fname}</TableCell>
                    <TableCell align="right">{mname}</TableCell>
                    <TableCell align="right">{lname}</TableCell>
                    <TableCell align="right">{`${format(
                      bdate,
                      " MMMM d, yyyy"
                    )}`}</TableCell>
                    <TableCell
                      align="right"
                      onClick={() => handleSelectPatient(id)}
                    >
                      <Button variant="contained">Select</Button>
                    </TableCell>
                  </TableRow>
                );
              })} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VisitHistoryPage;
