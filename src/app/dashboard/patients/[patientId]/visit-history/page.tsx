import { getVisitsByProfileId } from "@/actions/patients/visits";
import {
  Box,
  Button,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import Link from "next/link";
import TableHeader from "./_components/TableHeader";

const VisitHistoryPage = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const visits = await getVisitsByProfileId(patientId);

  return (
    <Stack>
      <TableHeader />
      <Divider />
      <TableContainer>
        <Table
          sx={{ minWidth: 650, overflow: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
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
                    " MMMM d, yyyy h:mm: a"
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
    </Stack>
  );
};

export default VisitHistoryPage;
