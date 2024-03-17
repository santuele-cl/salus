"use client";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import {
  Box,
  Button,
  Divider,
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
import React, { FormEvent, useEffect, useState } from "react";
import { findPatient, getTotalPatientsCount } from "@/actions/patients";
import { Patient, User } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { findUser, toggleUserIsActive } from "@/actions/users/users";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddEmployeeFormModal from "./AddEmployeeFormModal";

interface UsersResponseType {
  error?: string;
  success?: string;
  data?: User[];
}

const UserSearchPage = () => {
  const pathname = usePathname();
  const [users, setUsers] = useState<User[] | undefined>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showAddEmployeeFormModal, setShowAddEmployeeFormModal] =
    useState(false);
  const insufficientSearchTerm = searchTerm.length < 1;

  const handleChange = (searchTerm: string) => setSearchTerm(searchTerm);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    const user: UsersResponseType = await findUser(searchTerm);
    setUsers(user.data);
    setIsSearching(false);
  };

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
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
            Users
          </Typography>
          <Typography variant="body1" sx={{ mt: "-4px" }}>
            View user details
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
            label="User ID, Name, Email..."
            size="small"
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
          />
          <LoadingButton
            loading={isSearching}
            type="submit"
            variant="outlined"
            sx={{ alignSelf: "stretch" }}
            // onClick={handleSearch}
          >
            Search
          </LoadingButton>
        </Stack>
        <Stack gap={2} direction="row">
          <Button
            variant="contained"
            startIcon={<AddOutlinedIcon />}
            onClick={() => setShowAddEmployeeFormModal(true)}
          >
            Add Employee
          </Button>
          <Button
            variant="contained"
            startIcon={<AddOutlinedIcon />}
            // onClick={() => setShowAddEmployeeFormModal(true)}
            disabled={true}
          >
            Add Patient
          </Button>
        </Stack>
        <AddEmployeeFormModal
          show={showAddEmployeeFormModal}
          setShow={setShowAddEmployeeFormModal}
        />
      </Stack>
      <Divider sx={{ my: 1 }} />
      <TableContainer>
        <Table
          sx={{ minWidth: 650, overflow: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Active Status</TableCell>
              <TableCell align="left">Verified</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length ? (
              users.map((user) => {
                const { id, username, email, isActive, emailVerified, role } =
                  user;
                return (
                  <TableRow
                    key={id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {id}
                    </TableCell>
                    <TableCell align="left">{username}</TableCell>
                    <TableCell align="left">{email}</TableCell>
                    <TableCell align="left">
                      {isActive ? "active" : "inactive"}
                    </TableCell>
                    <TableCell align="left">
                      {emailVerified ? "verified" : "not verified"}
                    </TableCell>
                    <TableCell align="left">{role}</TableCell>
                    <TableCell align="right">
                      <Stack
                        spacing={2}
                        direction="row-reverse"
                        sx={{ width: "100%" }}
                      >
                        <Button
                          variant="contained"
                          LinkComponent={Link}
                          href={`${pathname}/${id}`}
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          //   LinkComponent={Link}
                          //   href={`${pathname}/${id}`}
                          onClick={async () => await toggleUserIsActive(id)}
                        >
                          {isActive ? "Deactivate" : "Activate"}
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  -
                </TableCell>
                <TableCell align="left">-</TableCell>
                <TableCell align="left">-</TableCell>
                <TableCell align="left">-</TableCell>
                <TableCell align="left">-</TableCell>
                <TableCell align="left">-</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {!users ||
        (users?.length && (
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
        ))} */}
    </Paper>
  );
};
export default UserSearchPage;
