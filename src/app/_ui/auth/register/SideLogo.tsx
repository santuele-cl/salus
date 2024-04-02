import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Logo from "../../dashboard/Logo";

const SideLogo = () => {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
        // height: { sm: "100%" },
      }}
      spacing={2}
    >
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        // justifyContent="center"
      >
        <Link href="/" style={{ lineHeight: 0, transition: "all 2s ease" }}>
          <Logo size={45} />
        </Link>
        <Typography
          component={Link}
          href="/"
          mt="4px"
          variant="h4"
          textTransform="capitalize"
          sx={{ textDecoration: "none", color: "common.black" }}
          fontWeight={900}
        >
          Salus
        </Typography>
      </Stack>
      <Box>
        <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
          Register
        </Typography>
        <Typography>
          Sign up to unlock all the features and benefits!
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Already have an account?</Typography>

        <Link href="/auth/login">Sign in</Link>
      </Stack>
    </Stack>
  );
};
export default SideLogo;
