import { useSession } from "next-auth/react";

const useGetUserInfo = () => {
  const session = useSession();
  // console.log(session);

  return session.data?.user;
};

export default useGetUserInfo;
