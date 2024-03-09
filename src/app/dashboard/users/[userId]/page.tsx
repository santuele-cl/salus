import { getUserById } from "@/actions/users/users";

const UserPage = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const response = await getUserById(userId);
  return <div>{JSON.stringify(response.data)}</div>;
};
export default UserPage;
