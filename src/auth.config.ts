import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { db } from "./lib/db";
import { getUserByEmail } from "./app/_util/users";
import { compare } from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const isCredentialValid = await LoginSchema.isValid(credentials);
        if (isCredentialValid) {
          const { email, password } = await LoginSchema.validate(credentials);
          try {
            const user = await getUserByEmail(email);
            if (!user || !user.password) return null;
            const passwordMatch = await compare(password, user.password);
            if (passwordMatch) return user;
          } catch {
            return null;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
