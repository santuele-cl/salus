import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "./app/_lib/db";
import { UserRole } from "@prisma/client";
import { getUserById } from "./app/_data/user";

declare module "next-auth" {
  interface User {
    role: UserRole;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("user", user, "account: ", account);

      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent signin user does not exist and without email verification
      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      return true;
    },

    async session({ session, token }) {
      console.log("token : ", token);

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (!user) return token;

      token.role = user.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db) as any,
  session: { strategy: "jwt" },
  ...authConfig,
});
