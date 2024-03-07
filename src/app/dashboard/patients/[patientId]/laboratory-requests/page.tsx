import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getLaboratoryRequestsByPatientId } from "@/actions/patients/laboratory-requests";
import { format } from "date-fns";
import Link from "next/link";

const LaboratoryRequestPage = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const response = await getLaboratoryRequestsByPatientId(patientId);
  const laboratoryRequests = response.data;
  const columns = [
    { id: "status", label: "Status" },
    { id: "dateRequested", label: "Date Requested", type: "date" },
  ];

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, overflow: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Laboratory procedure</TableCell>

            {columns.map(({ label }, i) => (
              <TableCell key={label + i}>{label}</TableCell>
            ))}
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {laboratoryRequests &&
            laboratoryRequests.length > 0 &&
            laboratoryRequests.map((datum: any, i: number) => {
              const selected = columns.map(({ id, type }, index: number) => {
                switch (type) {
                  case "date":
                    return (
                      <TableCell
                        component="th"
                        scope="row"
                        key={id + index}
                      >{`${format(datum[id], " MMMM d, yyyy")}`}</TableCell>
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
                  {datum["laboratoryProcedure"]["procedureName"]}
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
                      href={`/dashboard/patients/${patientId}/laboratory-requests/${datum.id}`}
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
export default LaboratoryRequestPage;
