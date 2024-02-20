// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import type { NextAuthOptions } from "next-auth";
// import { db } from "@/lib/db";
// import { compare } from "bcrypt";

export { GET, POST } from "@/auth";

// const options: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. "Sign in with...")
//       name: "Credentials",
//       // `credentials` is used to generate a form on the sign in page.
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials, req) {
//         const user = await db.user.findUnique({
//           where: { email: credentials?.email },
//         });

//         if (!user) {
//           return null;
//         }

//         const passwordMatched = await compare(
//           credentials?.password as string,
//           user.password
//         );
//         console.log(credentials);
//         // Add logic here to look up the user from the credentials supplied
//         // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
//         // const user

//         // if (user) {
//         //   // Any object returned will be saved in `user` property of the JWT
//         //   return user;
//         // } else {
//         //   // If you return null then an error will be displayed advising the user to check their details.
//         //   return null;

//         //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//         // }
//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/signin",
//   },
// };

// const handler = NextAuth(options);

// export { handler as GET, handler as POST };
// //
