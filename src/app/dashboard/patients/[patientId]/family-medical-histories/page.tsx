"use client";
import {
  findFamilyMedicalHistoryByTermAndPatientId,
  getFamilyMedicalHistoriesByPatientID,
} from "@/actions/patients/family-medical-history";
import GeneralTable from "../_components/GeneralTable";
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
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FamilyMedicalHistory } from "@prisma/client";
import Link from "next/link";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import FamilyMedicalHistoryFormDrawer from "./_components/FamilyMedicalHistoryFormDrawer";

const columns = [
  { id: "condition", label: "Condition" },
  { id: "ageOfOnset", label: "Age of on set" },
  { id: "relationship", label: "Relationship" },
  { id: "createdAt", label: "Added on", type: "date" },
  { id: "updatedAt", label: "Last updated", type: "date" },
];

const FamilyMedicalHistories = () => {
  const { patientId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showPrescriptionFormDrawer, setShowPrescriptionFormDrawer] =
    useState(false);

  const [familyMedicalHistories, setFamilyMedicalHistories] = useState<
    FamilyMedicalHistory[] | null
  >(null);
  const [error, setError] = useState("");

  console.log(searchTerm);
  console.log(familyMedicalHistories);

  const handleChange = (searchTerm: string) => setSearchTerm(searchTerm);

  const fetchFamilyMedicalHistory = async () => {
    const response = await getFamilyMedicalHistoriesByPatientID(
      patientId as string
    );
    if (response.success) setFamilyMedicalHistories(response.data);
    else if (response.error) setError(response.error);
    else setError("Fetch unsuccessful. Try again.");
  };

  const handleSearch = async (e: FormEvent) => {
    console.log("searching");
    e.preventDefault();
    setIsSearching(true);
    const response = await findFamilyMedicalHistoryByTermAndPatientId(
      searchTerm,
      patientId as string
    );
    if (response.success) setFamilyMedicalHistories(response.data);
    else if (response.error) {
      setError(response.error);
      setFamilyMedicalHistories([]);
    } else setError("Fetch unsuccessful. Try again.");
    setIsSearching(false);
  };

  useEffect(() => {
    fetchFamilyMedicalHistory();
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
            Family Medical History
          </Typography>
          <Typography variant="body1" sx={{ mt: "-4px" }}>
            View patient&apos;s family medical history
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
            label="Search by ID or Condition"
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
          <Button
            variant="outlined"
            onClick={() => fetchFamilyMedicalHistory()}
          >
            Reload
          </Button>
          <FamilyMedicalHistoryFormDrawer
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
              {columns.map(({ label }, i) => (
                <TableCell key={label + i}>{label}</TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {columns.map()} */}
            {familyMedicalHistories &&
              familyMedicalHistories.length &&
              familyMedicalHistories.map((datum: any, i: number) => {
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
                        href={`/dashboard/patients/${patientId}/family-medical-histories/${datum.id}`}
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
export default FamilyMedicalHistories;
