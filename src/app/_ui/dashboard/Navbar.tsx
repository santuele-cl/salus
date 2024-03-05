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
import Logo from "./Logo";
import useCurrentUser from "@/app/_hooks/useCurrentUser";
import { logout } from "@/actions/auth";

const customIconBtnStyle = {
  // all: "unset",
  // ":hover": {},
};

export default function Navbar({
  setShowTemporarySidebar,
}: {
  setShowTemporarySidebar: Dispatch<SetStateAction<boolean>>;
}) {
  const session = useCurrentUser();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // console.log(session);

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
      <Toolbar sx={{ height: "64px", px: { xs: 1, sm: 2, gap: "0.5rem" } }}>
        {isSmallScreen && (
          <Grow in={isSmallScreen}>
            <IconButton onClick={() => setShowTemporarySidebar(true)}>
              <MenuIcon />
            </IconButton>
          </Grow>
        )}
        <Stack direction="row" gap={1} alignItems="center">
          <Link href="/" style={{ lineHeight: 0, transition: "all 2s ease" }}>
            <Logo />
          </Link>
          {!isSmallScreen && (
            <Grow in={!isSmallScreen}>
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
            </Grow>
          )}
        </Stack>
        <TextField
          sx={{
            ml: { xs: 1, sm: 3, md: 12 },
            transition: "margin 0.4s ease",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
          placeholder="Search..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box ml="auto">
          {!isXsScreen && (
            <Grow in={!isXsScreen}>
              <Stack direction="row">
                {/* MESSAGES */}
                <IconButton onClick={() => setShowTemporarySidebar(true)}>
                  <MessageOutlinedIcon />
                </IconButton>
                {/* NOTIFICATION */}
                <IconButton onClick={() => setShowTemporarySidebar(true)}>
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
                    {session?.name && session?.name[0]}
                  </Avatar>
                  {/* USER NAME */}
                  <Typography>
                    {session?.name ? session.name : session?.email}
                  </Typography>
                </Stack>
                {/* LOG OUT BUTTON */}
                <Button onClick={() => logout()}>Logout</Button>
                {/* USER MORE INFO */}
                <IconButton onClick={() => setShowTemporarySidebar(true)}>
                  <ExpandMoreIcon />
                </IconButton>
              </Stack>
            </Grow>
          )}
          {/* MORE ICON */}
          {isXsScreen && (
            <Grow in={isXsScreen}>
              <IconButton
                onClick={() => setShowTemporarySidebar(true)}
                sx={{ p: 0 }}
              >
                <MoreVertIcon />
              </IconButton>
            </Grow>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
