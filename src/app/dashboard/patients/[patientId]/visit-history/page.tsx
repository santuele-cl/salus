import { getVisitsByProfileId } from "@/actions/patients/visits";
import {
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
import Link from "next/link";
import TableHeader from "./_components/TableHeader";
import dayjs from "dayjs";

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
              <TableCell align="left">Date of Visit</TableCell>
              <TableCell align="left">Chief Complaint</TableCell>
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
                  <TableCell align="left">{`${dayjs(visit.createdAt).format(
                    "MMMM d, YYYY h:mm a"
                  )}`}</TableCell>
                  <TableCell align="left">{visit.chiefComplaint}</TableCell>
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
