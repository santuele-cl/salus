"use client";
import {
  findAllergiesByTermAndPatientId,
  getAllergiesByPatientId,
} from "@/actions/patients/allergies";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
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
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Allergies } from "@prisma/client";
import { LoadingButton } from "@mui/lab";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddAllergyForm from "./_components/AddAllergyForm";
import dayjs from "dayjs";

const columns = [
  { id: "name", label: "Name" },
  { id: "severity", label: "Severity" },
  { id: "createdAt", label: "Date diagnosed", type: "date" },
];

const AllergiesPage = () => {
  const { patientId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [allergies, setAllergies] = useState<Allergies[] | null>(null);
  const [error, setError] = useState("");

  const [showAddAllergyForm, setShowAddAllergyForm] = useState(false);

  console.log(searchTerm);
  console.log(allergies);

  const handleChange = (searchTerm: string) => setSearchTerm(searchTerm);

  const fetchAllergies = async () => {
    const response = await getAllergiesByPatientId(patientId as string);
    if (response.success) setAllergies(response.data);
    else if (response.error) setError(response.error);
    else setError("Fetch unsuccessful. Try again.");
  };

  const handleSearch = async (e: FormEvent) => {
    console.log("searching");
    e.preventDefault();
    setIsSearching(true);
    const response = await findAllergiesByTermAndPatientId(
      searchTerm,
      patientId as string
    );
    if (response.success) setAllergies(response.data);
    else if (response.error) {
      setError(response.error);
      setAllergies([]);
    } else setError("Fetch unsuccessful. Try again.");
    setIsSearching(false);
  };

  useEffect(() => {
    fetchAllergies();
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
            Allergies
          </Typography>
          <Typography variant="body1" sx={{ mt: "-4px" }}>
            View patient&apos;s allergies
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
            label="Search by ID or Name"
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
          <Button variant="outlined" onClick={() => fetchAllergies()}>
            Reload
          </Button>
          <Button
            variant="contained"
            startIcon={<AddOutlinedIcon />}
            onClick={() => setShowAddAllergyForm(true)}
          >
            Add
          </Button>
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
            {/* {columns.map()} */}
            {allergies &&
              allergies.length &&
              allergies.map((datum: any, i: number) => {
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
                        href={`/dashboard/patients/${patientId}/allergies/${datum.id}`}
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
      <Drawer
        anchor="right"
        open={showAddAllergyForm}
        onClose={() => setShowAddAllergyForm(false)}
      >
        <AddAllergyForm
          patientId={patientId as string}
          setShowAddAllergyForm={setShowAddAllergyForm}
        />
      </Drawer>
    </Box>
  );
};
export default AllergiesPage;
