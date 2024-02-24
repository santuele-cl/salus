import { logout } from "@/actions/auth";
import { Button } from "@mui/material";

interface LogoutBtnProps {
  children?: React.ReactNode;
}

const LogoutBtn = ({ children }: LogoutBtnProps) => {
  const handleLogout = () => {
    logout();
  };

  return <span onClick={handleLogout}>{children}</span>;
};

export default LogoutBtn;
