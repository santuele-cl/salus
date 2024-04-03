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
  findvaccinationsByTermAndPatientId,
  getVaccinationsByPatientId,
} from "@/actions/patients/vaccinations";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Vaccination } from "@prisma/client";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import VaccinationFormDrawer from "../visit-history/[visitId]/_components/vaccination/VaccinationFormDrawer";

const columns = [
  { id: "id", label: "ID" },
  { id: "vaccineName", label: "Vaccine name" },
  { id: "dosage", label: "Dosage" },
  { id: "nextDueDate", label: "Next appointment ", type: "date" },
];
const VaccinationPage = () => {
  const { patientId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showVaccinationFormDrawer, setshowVaccinationFormDrawer] =
    useState(false);

  const [vaccination, setVaccination] = useState<Vaccination[] | null>(null);
  const [error, setError] = useState("");

  const handleChange = (searchTerm: string) => setSearchTerm(searchTerm);

  const fetchVaccination = async () => {
    const response = await getVaccinationsByPatientId(patientId as string);
    if (response.success) setVaccination(response.data);
    else if (response.error) setError(response.error);
    else setError("Fetch unsuccessful. Try again.");
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    const response = await findvaccinationsByTermAndPatientId(
      searchTerm,
      patientId as string
    );
    if (response.success) setVaccination(response.data);
    else if (response.error) {
      setError(response.error);
      setVaccination([]);
    } else setError("Fetch unsuccessful. Try again.");
    setIsSearching(false);
  };

  useEffect(() => {
    fetchVaccination();
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
            Vaccination
          </Typography>
          <Typography variant="body1" sx={{ mt: "-4px" }}>
            View patient&apos;s vaccination history
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
          <Button variant="outlined" onClick={() => fetchVaccination()}>
            Reload
          </Button>
          <VaccinationFormDrawer
            patientId={patientId as string}
            show={showVaccinationFormDrawer}
            setShow={setshowVaccinationFormDrawer}
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
              {columns.map(({ label }, i) => (
                <TableCell key={label + i}>{label}</TableCell>
              ))}
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vaccination &&
              !!vaccination.length &&
              vaccination.map((datum: any, i: number) => {
                const selected = columns.map(({ id, type }, index: number) => {
                  switch (type) {
                    case "date":
                      return (
                        <TableCell
                          component="th"
                          scope="row"
                          key={id + index}
                        >{`${dayjs(datum[id]).format(
                          "MMMM DD, YYYY"
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

                return (
                  <TableRow
                    key={datum + i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {}

                    {selected}
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        LinkComponent={Link}
                        href={`/dashboard/patients/${patientId}/vaccinations/${datum.id}`}
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

export default VaccinationPage;
