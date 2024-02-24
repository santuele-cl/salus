import useCurrentUser from "./useCurrentUser";

export const useGetUserRole = () => {
  const user = useCurrentUser();

  return user?.role;
};
