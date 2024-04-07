import { Stack } from "@mui/material";
import UsersTableHeader from "./_components/UsersTableHeader";
import UserSearchPage from "./_components/user-table-header/UserSearchPage";
import Link from "next/link";

const UsersPage = () => {
  return (
    <Stack spacing={2}>
      <UsersTableHeader />
      <UserSearchPage />
      <Link href="/test">Home</Link>
    </Stack>
  );
};
export default UsersPage;
