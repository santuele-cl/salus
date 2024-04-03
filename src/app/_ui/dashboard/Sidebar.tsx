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
import { useSession } from "next-auth/react";
import { EmployeeRole } from "@prisma/client";

type SidebarLink = {
  label: string;
  path?: string;
  icon: () => React.ReactNode;
  access: string[];
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
        path: "/dashboard/patients",
        icon: () => <FamilyRestroomIcon />,
        access: ["PHYSICIAN", "NURSE"],
      },
      {
        label: "Users",
        path: "/dashboard/users",
        icon: () => <GroupIcon />,
        access: ["ADMIN"],
      },
      {
        label: "Appointments",
        path: "/dashboard/appointments",
        icon: () => <CalendarMonthIcon />,
        access: ["PHYSICIAN", "NURSE"],
      },

      {
        label: "Audit Trails",
        icon: () => <ArticleOutlinedIcon />,
        path: "/dashboard/logs/login",
        access: ["ADMIN"],
      },
    ],
  },
  {
    label: "Content Management",
    links: [
      {
        label: "Departments",
        path: "/dashboard/departments/clinical-departments",
        icon: () => <DomainIcon />,
        access: ["ADMIN"],
      },
      {
        label: "Drugs",
        path: "/dashboard/drugs",
        icon: () => <MedicationIcon />,
        access: ["ADMIN"],
      },
      {
        label: "Roles and permissions",
        path: "/dashboard/roles-and-permissions",
        icon: () => <LockPersonIcon />,
        access: ["ADMIN"],
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
        access: ["PHYSICIAN", "NURSE", "ADMIN"],
      },
    ],
  },
];

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  // setOpen(prev => {return {...prev, asdlfk: true}})

  const pathname = usePathname();
  const session = useSession();
  // console.log(pathname);
  // console.log(pathname.startsWith("/dashboard/logs"));
  console.log("sidebar", pathname.startsWith("/dashboard/logs"!));
  return (
    <List
      sx={{
        height: "100%",
        width: 300,

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

            {links.map(({ label, icon, path, access }, i) => {
              if (!access?.includes(session.data?.user.empRole!)) return;
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
                  selected={pathname.startsWith(path!)}
                  LinkComponent={Link}
                  href={`${path}`}
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
