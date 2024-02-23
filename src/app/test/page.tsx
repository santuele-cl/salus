import { signIn, signOut } from "@/auth";
import LoginForm from "@/app/_ui/auth/LoginForm";
import RegisterForm from "@/app/_ui/auth/RegisterForm";
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

          await signIn();
        }}
      >
        <Button type="submit">Sign in</Button>
      </form>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
};
export default page;
