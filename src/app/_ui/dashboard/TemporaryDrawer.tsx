import { Drawer, Grow, ListItem, Stack, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function TemporaryDrawer({
  showTemporarySidebar,
  isSmallScreen,
  setShowTemporarySidebar,
}: {
  showTemporarySidebar: boolean;
  isSmallScreen: boolean;
  setShowTemporarySidebar: Dispatch<SetStateAction<boolean>>;
}) {
  // console.log(showTemporarySidebar, isSmallScreen);
  return (
    <Drawer
      anchor="left"
      open={showTemporarySidebar && isSmallScreen}
      onClose={() => setShowTemporarySidebar(false)}
      elevation={0}
    >
      <Sidebar>
        <ListItem>
          <Stack direction="row" gap={1} alignItems="center">
            <Link href="/" style={{ lineHeight: 0, transition: "all 2s ease" }}>
              <Logo />
            </Link>
            <Grow in={showTemporarySidebar}>
              <Typography
                component={Link}
                href="/"
                mt="4px"
                variant="h6"
                textTransform="capitalize"
                sx={{ textDecoration: "none", color: "common.black" }}
                fontWeight={900}
              >
                salus
              </Typography>
            </Grow>
          </Stack>
        </ListItem>
      </Sidebar>
    </Drawer>
  );
}
