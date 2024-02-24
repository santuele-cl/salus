"use client";
import useCurrentUser from "../_hooks/useCurrentUser";

const UsersPage = () => {
  const session = useCurrentUser();

  return <div>{JSON.stringify(session)}</div>;
};
export default UsersPage;
