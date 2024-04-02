import { Stack } from "@mui/material";
import UsersTableHeader from "./_components/UsersTableHeader";
import UserSearchPage from "./_components/user-table-header/UserSearchPage";

const UsersPage = () => {
  return (
    <Stack spacing={2}>
      <UsersTableHeader />
      <UserSearchPage />
    </Stack>
  );
};
export default UsersPage;
