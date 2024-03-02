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
import Link from "next/link";
import { usePathname } from "next/navigation";

const VisitHistoryPage = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  // const pathname = usePathname();
  const visits = await getVisitsByProfileId(patientId);

  console.log("visits", visits.data);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, overflow: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Visit ID</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Chief Complaint</TableCell>
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {visits && visits?.data && visits.data.} */}
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              asdfkj
            </TableCell>
            <TableCell align="right">laskdfj</TableCell>
            <TableCell align="right">kasdf</TableCell>
            <TableCell align="right">
              <Button
                variant="contained"
                LinkComponent={Link}
                href={`/dashboard/patients/nSK3yFte/visit-history/${visits.data?.id}`}
              >
                View
              </Button>
              {/* <Button variant="outlined">Select</Button> */}
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
