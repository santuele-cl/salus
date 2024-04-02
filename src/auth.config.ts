import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { compare } from "bcryptjs";
import { LoginSchema } from "./app/_schemas/zod/schema";
import { getUserByEmail } from "./app/_data/user";

export default {
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // console.log("credentials", credentials);

        const validatedCredentials = LoginSchema.safeParse(credentials);

        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;

          try {
            const user = await getUserByEmail(email);

            if (!user?.isActive) return null;

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
