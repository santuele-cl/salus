import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getPrescriptionsByPatientId } from "@/actions/patients/prescriptions";
import { format } from "date-fns";
import Link from "next/link";

const PrescriptionsPage = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const response = await getPrescriptionsByPatientId(patientId);
  const prescriptions = response.data;
  const columns = [
    { id: "durationInDays", label: "Duration (in days)" },
    { id: "startDate", label: "Start date", type: "date" },
    { id: "endDate", label: "End date", type: "date" },
  ];

  return (
    <div>
      <TableContainer>
        <Table
          sx={{ minWidth: 650, overflow: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Drug</TableCell>

              {columns.map(({ label }, i) => (
                <TableCell key={label + i}>{label}</TableCell>
              ))}
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptions &&
              prescriptions.length > 0 &&
              prescriptions.map((datum: any, i: number) => {
                const selected = columns.map(({ id, type }, index: number) => {
                  switch (type) {
                    case "date":
                      return (
                        <TableCell>{`${format(
                          datum[id],
                          " MMMM d, yyyy"
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
                    {datum["drugs"]["name"]}
                  </TableCell>
                );

                return (
                  <TableRow
                    key={datum + i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {customField}

                    {selected}
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        LinkComponent={Link}
                        href={`/dashboard/patients/${patientId}/prescriptions/${datum.id}`}
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
    </div>
  );
};
export default PrescriptionsPage;
