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
import LockPersonIcon from "@mui/icons-material/LockPerson";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import MedicationIcon from "@mui/icons-material/Medication";
import DomainIcon from "@mui/icons-material/Domain";
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
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

type Link = {
  label: string;
  path?: string;
  icon: () => React.ReactNode;
};

type SidebarLink = Link & {
  subLinks?: Omit<Link, "icon">[];
};

type SidebarLinks = {
  label: string;
  links: SidebarLink[];
};

const sidebarLinks: SidebarLinks[] = [
  {
    label: "",
    links: [
      {
        label: "Patients",
        path: "patients",
        icon: () => <FamilyRestroomIcon />,
      },
      {
        label: "Users",
        path: "users",
        icon: () => <GroupIcon />,
      },
      {
        label: "Appointments",
        path: "appointments",
        icon: () => <CalendarMonthIcon />,
      },
      {
        label: "Departments",
        icon: () => <DomainIcon />,
        subLinks: [
          {
            label: "Clinical Departments",
            path: "clinical-departments",
          },
          {
            label: "Service Departments",
            path: "service-departments",
          },
        ],
      },
      {
        label: "Drugs",
        path: "drugs",
        icon: () => <MedicationIcon />,
      },
      {
        label: "Roles and permissions",
        path: "roles-and-permissions",
        icon: () => <LockPersonIcon />,
      },
    ],
  },
  {
    label: "Account Settings",
    links: [
      {
        label: "Settings",
        path: "settings",
        icon: () => <SettingsIcon />,
      },
      {
        label: "Logs",
        icon: () => <ArticleOutlinedIcon />,
        subLinks: [
          {
            label: "Login",
            path: "login-logs",
          },
          {
            label: "Error",
            path: "error-logs",
          },
        ],
      },
    ],
  },
];

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  // setOpen(prev => {return {...prev, asdlfk: true}})
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

      {sidebarLinks.map(({ label, links }, i) => {
        return (
          <Box key={label + String(i)}>
            {label && <ListSubheader component="div">{label}</ListSubheader>}

            {links.map(({ label, icon, subLinks }, i) => {
              if (subLinks) {
                return (
                  <Box key={label + i}>
                    <ListItemButton>
                      <ListItemIcon>{icon()}</ListItemIcon>
                      <ListItemText primary={label} />
                    </ListItemButton>
                    <List component="div" disablePadding>
                      {subLinks.map(({ label, path }, j) => {
                        if (path)
                          return (
                            <ListItemButton
                              sx={{ pl: 4 }}
                              LinkComponent={Link}
                              href={path}
                              key={j}
                            >
                              <ListItemIcon>
                                <FiberManualRecordIcon sx={{ fontSize: 12 }} />
                              </ListItemIcon>
                              <ListItemText primary={label} />
                            </ListItemButton>
                          );
                        else
                          return (
                            <ListItemButton sx={{ pl: 4 }} key={j}>
                              <ListItemIcon>
                                <FiberManualRecordIcon sx={{ fontSize: 12 }} />
                              </ListItemIcon>
                              <ListItemText primary={label} />
                            </ListItemButton>
                          );
                      })}
                    </List>
                  </Box>
                );
              } else
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
                );
            })}
          </Box>
        );
      })}
    </List>
  );
}
