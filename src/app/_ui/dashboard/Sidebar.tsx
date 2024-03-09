"use client";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SxProps,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import MedicationIcon from "@mui/icons-material/Medication";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupIcon from "@mui/icons-material/Group";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { toKebabCase } from "@/app/_utils/utils";
import { useState } from "react";

type SidebarLinkType = {
  label: string;
  icon: () => React.ReactNode;
};

type SidebarLink = {
  [index: string]: { label: string; links: SidebarLinkType[] };
  // otherInfo?: { label: string; links: SidebarLinkType[] };
  // settings?: { label: string; links: SidebarLinkType[] };
};
const sidebarLinks: SidebarLink = {
  general: {
    label: "",
    links: [
      {
        label: "Patients",
        icon: () => <FamilyRestroomIcon />,
      },
      {
        label: "Users",
        icon: () => <GroupIcon />,
      },
      {
        label: "Drugs",
        icon: () => <MedicationIcon />,
      },
      // {
      //   label: "Logs",
      //   icon: () => <ArticleOutlinedIcon />,
      // },
      {
        label: "Appointmens",
        icon: () => <CalendarMonthIcon />,
      },
      // {
      //   label: "Customers",
      //   icon: () => <PeopleOutlinedIcon />,
      // },
      // {
      //   label: "Reports",
      //   icon: () => <BarChartOutlinedIcon />,
      // },
      // {
      //   label: "Coupons",
      //   icon: () => <StarBorderOutlinedIcon />,
      // },
      // {
      //   label: "Inbox",
      //   icon: () => <MessageOutlinedIcon />,
      // },
    ],
  },
  settings: {
    label: "Account Settings",
    links: [
      {
        label: "Settings",
        icon: () => <SettingsIcon />,
      },
    ],
  },
  // otherInfo: {
  //   label: "Other information",
  //   links: [
  //     { label: "Knowledge Base", icon: () => <HelpOutlineOutlinedIcon /> },
  //     {
  //       label: "Product Updates",
  //       icon: () => <WorkspacePremiumOutlinedIcon />,
  //     },
  //   ],
  // },
  // settings: {
  //   label: "Settings",
  //   links: [
  //     {
  //       label: "Personal Settings",
  //       icon: () => <ManageAccountsOutlinedIcon />,
  //     },
  //     {
  //       label: "Global Settings",
  //       icon: () => <SettingsOutlinedIcon />,
  //     },
  //   ],
  // },
};

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  const [logsDrop, setLogsDrop] = useState(true);
  const segments = usePathname().split("/");
  return (
    <List
      sx={{
        height: "100%",
        width: 250,

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
          {sidebarLinks[key].links.map(({ label, icon }, i) => (
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
              selected={segments[2] === toKebabCase(label)}
              LinkComponent={Link}
              href={`/dashboard/${toKebabCase(label)}`}
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
          ))}
        </Box>
      ))}
      <ListItemButton onClick={() => setLogsDrop((prev) => !prev)}>
        <ListItemIcon>
          <ArticleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Logs" />
        {logsDrop ? (
          <ExpandLessOutlinedIcon sx={{ fontSize: 20 }} />
        ) : (
          <ExpandMoreOutlinedIcon sx={{ fontSize: 20 }} />
        )}
      </ListItemButton>
      <Collapse in={logsDrop} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <LockOpenOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ErrorOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Error" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
