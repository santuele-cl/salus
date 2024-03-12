"use client";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  Grow,
  Stack,
  TextField,
  InputAdornment,
  Box,
  Avatar,
  Button,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Dispatch, SetStateAction } from "react";

// import Logo from "../common/Logo";
import Link from "next/link";
import useCurrentUser from "@/app/_hooks/useCurrentUser";
import { logout } from "@/actions/auth";
import Logo from "../dashboard/Logo";

const HomeNavbar = () => {
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
          <Stack direction="row" gap={1} alignItems="center">
            <Link href="/" style={{ lineHeight: 0, transition: "all 2s ease" }}>
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

          <Box ml="auto">
            <Stack direction="row">
              {/* MESSAGES */}
              <IconButton>
                <MessageOutlinedIcon />
              </IconButton>
              {/* NOTIFICATION */}
              <IconButton>
                <NotificationsNoneOutlinedIcon />
              </IconButton>
              <Stack direction="row" alignItems="center" gap={1} p="5px">
                {/* USER ICON */}
                <Avatar
                  sx={{
                    bgcolor: "secondary.main",
                    width: "1.5rem",
                    height: "1.5rem",
                  }}
                >
                  {/* {session?.name && session?.name[0]} */}
                  NAME
                </Avatar>
                {/* USER NAME */}
                <Typography>
                  {/* {session?.name ? session.name : session?.email} */}
                  USERNAME
                </Typography>
              </Stack>
              {/* LOG OUT BUTTON */}
              <Button onClick={() => logout()}>Logout</Button>
              {/* USER MORE INFO */}
              <IconButton>
                <ExpandMoreIcon />
              </IconButton>
            </Stack>
            <IconButton sx={{ p: 0 }}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HomeNavbar;
