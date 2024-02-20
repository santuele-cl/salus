import { signOut } from "@/auth";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { Button } from "@mui/material";

const page = () => {
  const handleSubmit = async () => {};
  return (
    <div>
      <LoginForm />
      <RegisterForm />
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
    </div>
  );
};
export default page;
