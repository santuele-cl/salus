"use client";
import {
  Box,
  Button,
  Chip,
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
  findLaboratoryRequestsByTermAndPatientId,
  getLaboratoryRequestsByPatientId,
} from "@/actions/patients/laboratory-requests";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { LaboratoryRequest, LaboratoryRequestStatus } from "@prisma/client";
import dayjs from "dayjs";
import LaboratoryRequestFormDrawer from "../visit-history/[visitId]/_components/laboratory-request/LaboratoryRequestFormDrawer";

const LaboratoryRequestPage = () => {
  const columns = [
    { id: "dateRequested", label: "Date Requested", type: "date" },
  ];

  const { patientId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showLaboratoryRequestFormDrawer, setShowLaboratoryRequestFormDrawer] =
    useState(false);

  const [laboratoryRequests, setLaboratoryRequests] = useState<
    LaboratoryRequest[] | null
  >(null);
  const [error, setError] = useState("");

  const handleChange = (searchTerm: string) => setSearchTerm(searchTerm);

  const fetchLaboratoryRequests = async () => {
    const response = await getLaboratoryRequestsByPatientId(
      patientId as string
    );
    if (response.success) setLaboratoryRequests(response.data);
    else if (response.error) setError(response.error);
    else setError("Fetch unsuccessful. Try again.");
  };

  const handleSearch = async (e: FormEvent) => {
    console.log("searching");
    e.preventDefault();
    setIsSearching(true);
    const response = await findLaboratoryRequestsByTermAndPatientId(
      searchTerm,
      patientId as string
    );
    if (response.success) setLaboratoryRequests(response.data);
    else if (response.error) {
      setError(response.error);
      setLaboratoryRequests([]);
    } else setError("Fetch unsuccessful. Try again.");
    setIsSearching(false);
  };

  useEffect(() => {
    fetchLaboratoryRequests();
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
            Laboratory Requests
          </Typography>
          <Typography variant="body1" sx={{ mt: "-4px" }}>
            View patient&apos;s laboratory requests history
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
            label="Search by ID or Procedure name"
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
          <Button variant="outlined" onClick={() => fetchLaboratoryRequests()}>
            Reload
          </Button>
          <LaboratoryRequestFormDrawer
            patientId={patientId as string}
            show={showLaboratoryRequestFormDrawer}
            setShow={setShowLaboratoryRequestFormDrawer}
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
              <TableCell align="left">Laboratory procedure</TableCell>
              <TableCell align="left">Status</TableCell>

              {columns.map(({ label }, i) => (
                <TableCell key={label + i}>{label}</TableCell>
              ))}
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {laboratoryRequests &&
              laboratoryRequests.length > 0 &&
              laboratoryRequests.map((datum: any, i: number) => {
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
                    {datum["laboratoryProcedure"]["procedureName"]}
                  </TableCell>
                );

                const statusField = (
                  <TableCell component="th" scope="row" align="left">
                    <Chip
                      sx={{ fontWeight: "bold", borderWidth: "1px" }}
                      label={datum["status"]}
                      color={
                        datum["status"] === LaboratoryRequestStatus.COMPLETED
                          ? "success"
                          : datum["status"] === LaboratoryRequestStatus.CANCELED
                          ? "error"
                          : "warning"
                      }
                      variant="outlined"
                    />
                  </TableCell>
                );

                return (
                  <TableRow
                    key={datum + i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {customField}
                    {statusField}
                    {selected}
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        LinkComponent={Link}
                        href={`/dashboard/patients/${patientId}/laboratory-requests/${datum.id}`}
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
export default LaboratoryRequestPage;
