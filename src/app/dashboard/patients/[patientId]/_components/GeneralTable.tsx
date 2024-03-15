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
import dayjs from "dayjs";
import Link from "next/link";
import { ReactNode } from "react";

interface ColType {
  label: string;
  id: string;
  type?: string;
}

interface GeneralTableType {
  data: any;
  columns: ColType[];
  baseUrl: string;
  actionButtonName?: string;
}

const GeneralTable = ({ data, columns, baseUrl }: GeneralTableType) => {
  console.log(data);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, overflow: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(({ label }, i) => (
              <TableCell key={label + i}>{label}</TableCell>
            ))}
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {columns.map()} */}
          {data.map((datum: any, i: number) => {
            const selected = columns.map(({ id, type }, index: number) => {
              switch (type) {
                case "date":
                  return (
                    <TableCell
                      component="th"
                      scope="row"
                      key={id + index}
                    >{`${dayjs(datum[id]).format("MMMM d, YYYY")}`}</TableCell>
                  );

                default:
                  return (
                    <TableCell component="th" scope="row" key={id + index}>
                      {datum[id]}
                    </TableCell>
                  );
              }
            });
            // if()
            return (
              <TableRow
                key={datum + i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {selected}
                <TableCell align="right">
                  <Button
                    variant="contained"
                    LinkComponent={Link}
                    href={`${baseUrl}/${datum.id}`}
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
export default GeneralTable;
