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
import React, { useEffect, useState } from "react";
import { findPatient, getTotalPatientsCount } from "@/actions/patients";
import { Patient, User } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { findUser, toggleUserIsActive } from "@/actions/patients/users";

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
  const insufficientSearchTerm = searchTerm.length < 1;

  const handleChange = (searchTerm: string) => setSearchTerm(searchTerm);

  const handleSearch = async () => {
    if (!insufficientSearchTerm) {
      setIsSearching(true);
      const user: UsersResponseType = await findUser(searchTerm);
      if (user.data && user.data.length > 0) setUsers(user.data);
      setIsSearching(false);
    }
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
              <TableCell>User ID</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Active Status</TableCell>
              <TableCell align="right">Verified</TableCell>
              <TableCell align="right">Role</TableCell>
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
                    <TableCell component="th" scope="row">
                      {id}
                    </TableCell>
                    <TableCell align="right">{username}</TableCell>
                    <TableCell align="right">{email}</TableCell>
                    <TableCell align="right">
                      {isActive ? "active" : "inactive"}
                    </TableCell>
                    <TableCell align="right">
                      {emailVerified ? "verified" : "not verified"}
                    </TableCell>
                    <TableCell align="right">{role}</TableCell>
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
      {!users ||
        (!users.length && (
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
  );
};
export default UserSearchPage;
