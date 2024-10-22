"use client";
import { TabType } from "@/app/_data/types";
import {
  Box,
  Button,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { findPatient } from "@/actions/patients";
import { Patient } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";

const TABS = [
  {
    label: "Current Visit",
    href: "current",
  },
  {
    label: "Profile",
    href: "profile",
  },
  { label: "Documents", href: "documents" },
  { label: "Visit History", href: "visit-history" },
  { label: "Medications", href: "medications" },
];

interface PatientsType {
  error?: string;
  success?: string;
  data?: Patient[];
}
const FindPageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const pathnameArr = pathname.split("/");
  // console.log(pathnameArr);
  const router = useRouter();

  const [patients, setPatients] = useState<Patient[] | undefined>([]);
  const [patientId, setPatientId] = useState("");

  const [selectedPatientId, setSelectedPatientId] = useState("");

  const handleChange = (patientId: string) => setPatientId(patientId);

  const handleSearch = async () => {
    const patient: PatientsType = await findPatient(patientId);
    if (patient.data && patient.data.length > 0) setPatients(patient.data);
  };

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setPatients([]);
    setPatientId("");
  };

  // console.log(`/dashboard/patients/${pathnameArr[4]}`);
  // console.log("patients", patients);
  // console.log("selectedPatientId", selectedPatientId);
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
              label="Patient ID"
              size="small"
              value={patientId}
              onChange={(e) => handleChange(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ alignSelf: "stretch" }}
              onClick={handleSearch}
            >
              Search
            </Button>
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
              {patients &&
                patients.map((patient) => {
                  const { id, fname, mname, lname, bdate } = patient;
                  return (
                    <TableRow
                      key={id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {id}
                      </TableCell>
                      <TableCell align="right">{fname}</TableCell>
                      <TableCell align="right">{mname}</TableCell>
                      <TableCell align="right">{lname}</TableCell>
                      <TableCell align="right">{`${dayjs(bdate).format(
                        "MMMM DD, YYYY"
                      )}`}</TableCell>
                      <TableCell
                        align="right"
                        onClick={() => handleSelectPatient(id)}
                      >
                        <Button variant="contained">Select</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Tabs value={`/dashboard/patients/${pathnameArr[4]}`}>
        {TABS.map(({ label, href }, i) => (
          <Tab
            label={label}
            key={i}
            LinkComponent={Link}
            href={`/dashboard/patients/${selectedPatientId}/${href}`}
            value={`/dashboard/patients/${pathnameArr[4]}`}
          />
        ))}
      </Tabs>

      {/* <Paper elevation={1} sx={{ p: 2 }}>
        {children}
      </Paper> */}
    </Stack>
  );
};

export default FindPageLayout;
