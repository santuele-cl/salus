"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Container,
} from "@mui/material";

import Link from "next/link";
import Logo from "../dashboard/Logo";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HomeNavbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const router = useRouter();
  // console.log(router)
  const pathname = usePathname();
  // console.log(pathname)
  return (
    <AppBar
      position="sticky"
      sx={{
        borderBottom: "1px solid rgba(0,0,0,.1)",
        boxShadow: "none",
        bgcolor: "#fff",
        color: "common.black",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ height: "64px", px: { xs: 1, sm: 2, gap: "0.5rem" } }}>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Stack direction="row" gap={1} alignItems="center">
              <Link
                href="/"
                style={{ lineHeight: 0, transition: "all 2s ease" }}
              >
                <Logo />
              </Link>
              <Typography
                component={Link}
                href="/"
                mt="4px"
                variant="h6"
                textTransform="capitalize"
                sx={{ textDecoration: "none", color: "common.black" }}
                fontWeight={900}
              >
                Salus
              </Typography>
            </Stack>
            <Stack sx={{ flexDirection: "row", gap: 1 }}>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Button
                  variant={activeLink === "" ? "contained" : "text"}
                  LinkComponent={Link}
                  href="/"
                  sx={{}}
                  onClick={() => setActiveLink("")}
                >
                  Home
                </Button>
                <Button
                  variant={activeLink === "about" ? "contained" : "text"}
                  LinkComponent={Link}
                  href="#about"
                  sx={{}}
                  onClick={() => setActiveLink("about")}
                >
                  About
                </Button>
                <Button
                  variant={activeLink === "contacts" ? "contained" : "text"}
                  LinkComponent={Link}
                  href="#contacts"
                  sx={{}}
                  onClick={() => setActiveLink("contacts")}
                >
                  Contacts
                </Button>
                <Button
                  variant={activeLink === "faq" ? "contained" : "text"}
                  LinkComponent={Link}
                  href="#faq"
                  sx={{}}
                  onClick={() => setActiveLink("faq")}
                >
                  FAQ
                </Button>
              </Stack>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Button
                  variant="outlined"
                  LinkComponent={Link}
                  href="/auth/register"
                  color="secondary"
                >
                  Sign up
                </Button>
                <Button
                  variant="contained"
                  LinkComponent={Link}
                  href="/auth/login"
                  color="secondary"
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HomeNavbar;
