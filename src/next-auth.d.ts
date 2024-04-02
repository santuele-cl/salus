import { EmployeeRole, UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  username: string;
  email: string;
  empId: string;
  empRole?: string;
  patId: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      username: string;
    };
    empId: string;
    empRole?: string;
    patId: string;
    role: UserRole;
  }
}
