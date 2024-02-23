import { auth } from "@/auth";

const UsersPage = async () => {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
};
export default UsersPage;
