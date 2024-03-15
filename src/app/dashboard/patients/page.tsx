"use client";
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
import React, { useEffect, useState } from "react";
import { findPatient, getTotalPatientsCount } from "@/actions/patients";
import { Patient } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import dayjs from "dayjs";

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
  const [patientsCount, setPatientsCount] = useState<number | undefined>(
    undefined
  );
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

  useEffect(() => {
    const getCount = async () => {
      const count = await getTotalPatientsCount();
      setPatientsCount(count.data);
    };
    getCount();
  }, []);

  return (
    <Stack spacing={2}>
      <Stack direction="row" gap={3} sx={{}}>
        <Paper sx={{ alignSelf: "flex-start", p: 3 }}>
          <Stack direction="row" gap={5}>
            <Stack direction="column">
              <Typography variant="h4" sx={{ color: "common.black" }}>
                {patientsCount}
              </Typography>
              <Typography variant="subtitle1">All patients</Typography>
            </Stack>
            <Stack>
              <PeopleOutlinedIcon
                sx={{ fontSize: 50, color: "primary.light" }}
              />
            </Stack>
          </Stack>
        </Paper>
        <Paper sx={{ alignSelf: "flex-start", p: 3 }}>
          <Stack direction="row" gap={5}>
            <Stack direction="column">
              <Typography variant="h4" sx={{ color: "common.black" }}>
                {patientsCount}
              </Typography>
              <Typography variant="subtitle1">Today&apos;s patients</Typography>
            </Stack>
            <Stack>
              <PersonAddAltOutlinedIcon
                sx={{ fontSize: 40, color: "primary.light" }}
              />
            </Stack>
          </Stack>
        </Paper>
      </Stack>
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
                      <TableCell align="right">{`${dayjs(bdate).format(
                        "MMMM d, YYYY"
                      )}`}</TableCell>
                      <TableCell
                        align="right"
                        // onClick={() => handleSelectPatient(id)}
                      >
                        <Button
                          variant="contained"
                          LinkComponent={Link}
                          href={`${pathname}/${id}/visit-history`}
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
