import { Skeleton, TableCell, TableRow } from "@mui/material";
import React from "react";

const TableSkeleton = () => {
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0, p: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        <Skeleton variant="rectangular" width={210} height={60} />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="rectangular" width={210} height={60} />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="rectangular" width={210} height={60} />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="rectangular" width={210} height={60} />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="rectangular" width={210} height={60} />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="rectangular" width={210} height={60} />
      </TableCell>
    </TableRow>
  );
};

export default TableSkeleton;
