// "use client";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SxProps,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

type SidebarLinkType = {
  label: String;
  icon: () => React.ReactNode;
};

type SidebarLink = {
  [general: string]: { label: string; links: SidebarLinkType[] };
  otherInfo: { label: string; links: SidebarLinkType[] };
  settings: { label: string; links: SidebarLinkType[] };
};

const sidebarLinks: SidebarLink = {
  general: {
    label: "",
    links: [
      {
        label: "Dashboard",
        icon: () => <HomeOutlinedIcon />,
      },
      {
        label: "Orders",
        icon: () => <FormatListBulletedOutlinedIcon />,
      },
      {
        label: "Catergories",
        icon: () => <FolderOutlinedIcon />,
      },
      {
        label: "Customers",
        icon: () => <PeopleOutlinedIcon />,
      },
      {
        label: "Reports",
        icon: () => <BarChartOutlinedIcon />,
      },
      {
        label: "Coupons",
        icon: () => <StarBorderOutlinedIcon />,
      },
      {
        label: "Inbox",
        icon: () => <MessageOutlinedIcon />,
      },
    ],
  },
  otherInfo: {
    label: "Other information",
    links: [
      { label: "Knowledge Base", icon: () => <HelpOutlineOutlinedIcon /> },
      {
        label: "Product Updates",
        icon: () => <WorkspacePremiumOutlinedIcon />,
      },
    ],
  },
  settings: {
    label: "Settings",
    links: [
      {
        label: "Personal Settings",
        icon: () => <ManageAccountsOutlinedIcon />,
      },
      {
        label: "Global Settings",
        icon: () => <SettingsOutlinedIcon />,
      },
    ],
  },
};

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <List
      sx={{
        width: 250,
        bgcolor: "background.paper",
        p: 2,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {children}

      {Object.keys(sidebarLinks).map((key, i) => (
        <Box key={key + String(i)}>
          {sidebarLinks[key].label && (
            <ListSubheader component="div">
              {sidebarLinks[key].label}
            </ListSubheader>
          )}
          {sidebarLinks[key].links.map(({ label, icon }, i) => {
            const path = `/dashboard/${(label.length === 1
              ? label.toLowerCase()
              : label.split(" ").join("-")
            ).toLowerCase()}`;

            const isSelected = pathname === path;

            return (
              <ListItemButton
                sx={() => {
                  const style: SxProps = {
                    bgcolor: "primary.main",
                    color: "common.white",
                  };

                  return {
                    "&.Mui-selected:hover, &.Mui-selected, :hover": style,
                    "&.Mui-selected .MuiListItemIcon-root, :hover .MuiListItemIcon-root":
                      { color: "#fff" },
                  };
                }}
                key={label + String(i)}
                selected={isSelected}
                LinkComponent={Link}
                href={path}
              >
                <ListItemIcon
                  sx={{
                    "&.Mui-selected": { color: "common.white !important" },
                  }}
                >
                  {icon()}
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            );
          })}
        </Box>
      ))}
    </List>
  );
}
