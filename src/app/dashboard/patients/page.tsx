"use client";
import { format } from "date-fns";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { findPatient } from "@/actions/patients";
import { Patient } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PatientsType {
  error?: string;
  success?: string;
  data?: Patient[];
}
const PatientsPage = () => {
  const pathname = usePathname();
  const [patients, setPatients] = useState<Patient[] | undefined>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const insufficientSearchTerm = searchTerm.length < 1;

  const handleChange = (searchTerm: string) => setSearchTerm(searchTerm);

  const handleSearch = async () => {
    if (!insufficientSearchTerm) {
      setIsSearching(true);
      const patient: PatientsType = await findPatient(searchTerm);
      if (patient.data && patient.data.length > 0) setPatients(patient.data);
      setIsSearching(false);
    }
  };

  const handleSelectPatient = (patientId: string) => {
    setPatients([]);
    setSearchTerm("");
  };

  return (
    <Stack spacing={2}>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Stack
          direction="row"
          sx={{
            height: "55px",
            // bgcolor: "orange",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack>
            <Typography variant="h6" gap={0}>
              Patients
            </Typography>
            <Typography variant="body1" sx={{ mt: "-4px" }}>
              View patient information
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              label="Patient ID, name, info..."
              size="small"
              value={searchTerm}
              onChange={(e) => handleChange(e.target.value)}
            />
            <LoadingButton
              loading={isSearching}
              type="submit"
              variant="contained"
              sx={{ alignSelf: "stretch" }}
              onClick={handleSearch}
            >
              Search
            </LoadingButton>
          </Stack>
        </Stack>
        <hr />
        <TableContainer>
          <Table
            sx={{ minWidth: 650, overflow: "auto" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Patient ID</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Middle Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Birthdate</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients && patients.length ? (
                patients.map((patient) => {
                  const { id, fname, mname, lname, bdate } = patient;
                  return (
                    <TableRow
                      key={id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
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
                        // onClick={() => handleSelectPatient(id)}
                      >
                        <Button
                          variant="contained"
                          LinkComponent={Link}
                          href={`${pathname}/${id}`}
                        >
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0, p: 0 },
                  }}
                >
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {!patients ||
          (!patients.length && (
            <Stack
              spacing={1}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                p: 8,
              }}
            >
              <FindInPageOutlinedIcon sx={{ fontSize: 70 }} />
              <Typography>No results found!</Typography>
            </Stack>
          ))}
      </Paper>
    </Stack>
  );
};

export default PatientsPage;
