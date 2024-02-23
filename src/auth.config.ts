import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./app/_util/users";
import { compare } from "bcryptjs";
import { LoginSchema } from "../prisma/schema";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log(credentials);

        const validatedCredentials = LoginSchema.safeParse(credentials);

        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;

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
