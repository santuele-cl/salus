import { getDiagnosesByPatientId } from "@/actions/patients/diagnosis";
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

const DiagnosisPage = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const diagnoses = await getDiagnosesByPatientId(patientId);
  console.log(diagnoses);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, overflow: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Condition</TableCell>
            <TableCell align="right">Date Diagnosed</TableCell>
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {diagnoses &&
            diagnoses?.data &&
            diagnoses.data.map((diagnosis) => (
              <TableRow
                key={diagnosis.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {diagnosis.id}
                </TableCell>
                <TableCell align="right">{diagnosis.condition}</TableCell>
                <TableCell align="right">{`${format(
                  diagnosis.diagnosisDate,
                  " MMMM d, yyyy"
                )}`}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    LinkComponent={Link}
                    href={`/dashboard/patients/${patientId}/diagnoses/${diagnosis.id}`}
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
export default DiagnosisPage;
