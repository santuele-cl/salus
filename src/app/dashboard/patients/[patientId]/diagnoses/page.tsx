"use client";
import {
  getDiagnosesByPatientId,
  findDiagnosesByTermAndPatientId,
} from "@/actions/patients/diagnosis";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  Drawer,
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
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import AddDiagnosisForm from "./_components/AddDiagnosisForm";
import DiagnosisForm from "../visit-history/[visitId]/_components/diagnosis/DiagnosisForm";
import DiagnosisFormDrawer from "../visit-history/[visitId]/_components/diagnosis/DiagnosisFormDrawer";

type DiagnosisWithPhysicianDetails = Prisma.DiagnosisGetPayload<{
  include: {
    physician: {
      select: {
        fname: true;
        lname: true;
        employeeRole: {
          select: {
            roleName: true;
          };
        };
      };
    };
  };
}>;

const DiagnosisPage = () => {
  const { patientId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showDiagnosisFormDrawer, setShowDiagnosisFormDrawer] = useState(false);

  const [diagnoses, setDiagnoses] = useState<
    DiagnosisWithPhysicianDetails[] | null
  >(null);
  const [error, setError] = useState("");

  console.log(searchTerm);
  console.log(diagnoses);

  const handleChange = (searchTerm: string) => setSearchTerm(searchTerm);

  const fetchDiagnosis = async () => {
    const response = await getDiagnosesByPatientId(patientId as string);
    if (response.success) setDiagnoses(response.data);
    else if (response.error) setError(response.error);
    else setError("Fetch unsuccessful. Try again.");
  };

  const handleSearch = async (e: FormEvent) => {
    console.log("searching");
    e.preventDefault();
    setIsSearching(true);
    const response = await findDiagnosesByTermAndPatientId(
      searchTerm,
      patientId as string
    );
    if (response.success) setDiagnoses(response.data);
    else if (response.error) {
      setError(response.error);
      setDiagnoses([]);
    } else setError("Fetch unsuccessful. Try again.");
    setIsSearching(false);
  };

  useEffect(() => {
    fetchDiagnosis();
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
            Diagnoses
          </Typography>
          <Typography variant="body1" sx={{ mt: "-4px" }}>
            View patient&apos;s diagnoses history
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
            label="Search by ID or condition"
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
          <Button variant="outlined" onClick={() => fetchDiagnosis()}>
            Reload
          </Button>
          <DiagnosisFormDrawer
            patientId={patientId as string}
            show={showDiagnosisFormDrawer}
            setShow={setShowDiagnosisFormDrawer}
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
              <TableCell align="left">Condition</TableCell>
              <TableCell align="left">Date Diagnosed</TableCell>
              <TableCell align="left">Diagnosed by</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {diagnoses &&
              diagnoses.length > 0 &&
              diagnoses.map((diagnosis) => {
                const physician = diagnosis.physician;
                return (
                  <TableRow
                    key={diagnosis.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{diagnosis.condition}</TableCell>
                    <TableCell align="left">{`${dayjs(
                      diagnosis.diagnosisDate
                    ).format("MMMM d, YYYY")}`}</TableCell>
                    <TableCell align="left">{`${physician?.employeeRole?.roleName} ${physician?.fname} ${physician?.lname} `}</TableCell>

                    <TableCell align="right">
                      <Button
                        variant="contained"
                        LinkComponent={Link}
                        href={`/dashboard/patients/${patientId}/diagnoses/${diagnosis.id}`}
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
export default DiagnosisPage;
