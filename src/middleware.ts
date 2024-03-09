import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  apiRoutePrefix,
  publicRoutes,
  DEFAULT_EMPLOYEE_LOGIN_REDIRECT,
  DEFAULT_PATIENT_LOGIN_REDIRECT,
  roleRoute,
} from "./routes";
import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const user = await getToken({
    req,
    secret: process.env.AUTH_SECRET!,
    // salt: process.env.AUTH_SECRET!,
  });

  const { nextUrl } = req;
  const isLoggedIn = !!req?.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiRoutePrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn && user?.role) {
      // Pass nextUrl as 2nd argument to make an absolute url
      if (user.role === "EMPLOYEE") {
        return Response.redirect(
          new URL(DEFAULT_EMPLOYEE_LOGIN_REDIRECT, nextUrl)
        );
      } else if (user.role === "PATIENT") {
        return Response.redirect(
          new URL(DEFAULT_PATIENT_LOGIN_REDIRECT, nextUrl)
        );
      } else {
        return;
      }
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(`/auth/login`, nextUrl));

    // let callbackUrl = nextUrl.pathname;
    // if (nextUrl.search) {
    //   callbackUrl += nextUrl.search;
    // }

    // const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    // return Response.redirect(
    //   new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    // );
  }

  return;
});

// Whatever listed in the matcher array will invoke the auth func above
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
