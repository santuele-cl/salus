import { getVisitsByProfileId } from "@/actions/patients/visits";
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
import { format } from "date-fns";
import Link from "next/link";
import { usePathname } from "next/navigation";

const VisitHistoryPage = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  // const pathname = usePathname();
  const visits = await getVisitsByProfileId(patientId);

  // console.log("patientId", patientId);
  // console.log("visits", visits.data);
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
          {visits &&
            visits?.data &&
            visits.data.visits.map((visit) => (
              <TableRow
                key={visit.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {visit.id}
                </TableCell>
                <TableCell align="right">{`${format(
                  visit.createdAt,
                  " MMMM d, yyyy"
                )}`}</TableCell>
                <TableCell align="right">{visit.chiefComplaint}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    LinkComponent={Link}
                    href={`/dashboard/patients/${patientId}/visit-history/${visit.id}`}
                  >
                    View
                  </Button>
                  {/* <Button variant="outlined">Select</Button> */}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VisitHistoryPage;
