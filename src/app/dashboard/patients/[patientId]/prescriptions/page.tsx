"use client";
import {
  Box,
  Button,
  Divider,
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
import {
  findPrescriptionByTermAndPatientId,
  getPrescriptionsByPatientId,
} from "@/actions/patients/prescriptions";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Presciption } from "@prisma/client";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import PrescriptionFormDrawer from "../visit-history/[visitId]/_components/prescription/PrescriptionFormDrawer";

const columns = [
  { id: "durationInDays", label: "Duration (in days)" },
  { id: "dosage", label: "Dosage" },
  { id: "frequencyPerDay", label: "Frequency (in days)" },
  { id: "startDate", label: "Start date", type: "date" },
  { id: "endDate", label: "End date", type: "date" },
];

const PrescriptionsPage = () => {
  const { patientId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showPrescriptionFormDrawer, setShowPrescriptionFormDrawer] =
    useState(false);

  const [prescriptions, setPrescriptions] = useState<Presciption[] | null>(
    null
  );
  const [error, setError] = useState("");

  console.log(searchTerm);
  console.log(prescriptions);

  const handleChange = (searchTerm: string) => setSearchTerm(searchTerm);

  const fetchPrescriptions = async () => {
    const response = await getPrescriptionsByPatientId(patientId as string);
    if (response.success) setPrescriptions(response.data);
    else if (response.error) setError(response.error);
    else setError("Fetch unsuccessful. Try again.");
  };

  const handleSearch = async (e: FormEvent) => {
    console.log("searching");
    e.preventDefault();
    setIsSearching(true);
    const response = await findPrescriptionByTermAndPatientId(
      searchTerm,
      patientId as string
    );
    if (response.success) setPrescriptions(response.data);
    else if (response.error) {
      setError(response.error);
      setPrescriptions([]);
    } else setError("Fetch unsuccessful. Try again.");
    setIsSearching(false);
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Stack
        direction="row"
        sx={{
          height: "55px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack>
          <Typography variant="h6" gap={0}>
            Prescriptions
          </Typography>
          <Typography variant="body1" sx={{ mt: "-4px" }}>
            View patient&apos;s prescriptions history
          </Typography>
        </Stack>
        <Stack
          component="form"
          onSubmit={(e) => handleSearch(e)}
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            label="Search by ID or Drug name"
            size="small"
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
          />
          <LoadingButton
            loading={isSearching}
            disabled={!searchTerm}
            type="submit"
            variant="contained"
            sx={{ alignSelf: "stretch" }}
          >
            Search
          </LoadingButton>
        </Stack>
        <Stack sx={{ alignItems: "center", gap: 1, flexDirection: "row" }}>
          <Button variant="outlined" onClick={() => fetchPrescriptions()}>
            Reload
          </Button>
          <PrescriptionFormDrawer
            patientId={patientId as string}
            show={showPrescriptionFormDrawer}
            setShow={setShowPrescriptionFormDrawer}
          />
        </Stack>
      </Stack>
      <Divider sx={{ my: 1 }} />
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
              prescriptions.length &&
              prescriptions.map((datum: any, i: number) => {
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
    </Box>
  );
};
export default PrescriptionsPage;
