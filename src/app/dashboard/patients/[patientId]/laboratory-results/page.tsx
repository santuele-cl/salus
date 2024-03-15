import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getLaboratoryResultsByPatientId } from "@/actions/patients/laboratory-results";
import Link from "next/link";
import dayjs from "dayjs";

const columns = [
  { id: "testName", label: "Test Name" },
  { id: "testDate", label: "Test Date", type: "date" },
  { id: "updatedAt", label: "Last updated", type: "date" },
];

const LaboratoryResults = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const response = await getLaboratoryResultsByPatientId(patientId);
  const laboratoryResults = response.data;

  console.log(laboratoryResults);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, overflow: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(({ label }, i) => (
              <TableCell key={label + i}>{label}</TableCell>
            ))}
            <TableCell align="left">From Request</TableCell>

            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {laboratoryResults &&
            laboratoryResults.length > 0 &&
            laboratoryResults.map((datum: any, i: number) => {
              const selected = columns.map(({ id, type }, index: number) => {
                switch (type) {
                  case "date":
                    return (
                      <TableCell
                        component="th"
                        scope="row"
                        key={id + index}
                      >{`${dayjs(datum[id]).format(
                        "MMMM d, YYYY"
                      )}`}</TableCell>
                    );

                  default:
                    return (
                      <TableCell component="th" scope="row" key={id + index}>
                        {datum[id]}
                      </TableCell>
                    );
                }
              });

              const customField = (
                <TableCell component="th" scope="row" align="left">
                  <Link
                    href={`/dashboard/patients/${patientId}/laboratory-requests/${datum.id}`}
                  >
                    {datum["laboratoryRequestId"]}
                  </Link>
                </TableCell>
              );

              return (
                <TableRow
                  key={datum + i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {selected}
                  {customField}
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      LinkComponent={Link}
                      href={`/dashboard/patients/${patientId}/laboratory-results/${datum.id}`}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default LaboratoryResults;
