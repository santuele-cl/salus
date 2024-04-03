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
  adminRoutes,
  physicianRoutes,
  nurseRoutes,
} from "./routes";
import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  //@ts-expect-error
  const user = await getToken({
    req,
    secret: process.env.AUTH_SECRET!,
    // salt: process.env.AUTH_SECRET!,
  });

  console.log("middleware user : ", user);

  const { nextUrl } = req;
  const isLoggedIn = !!req?.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiRoutePrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.some((route) => {
    console.log(nextUrl.pathname, route);
    return nextUrl.pathname.startsWith(route);
  });
  const isPhysicianRoute = physicianRoutes.includes(nextUrl.pathname);
  const isNurseRoute = nurseRoutes.includes(nextUrl.pathname);

  console.log(
    `Role: ${user?.empRole} , ROUTE: ${nextUrl.pathname}, ADMIN ROUTE: ${isAdminRoute}`
  );
  console.log(
    `Role: ${user?.empRole} , ROUTE: ${nextUrl.pathname}, PHYSICIAN ROUTE: ${isPhysicianRoute}`
  );
  console.log(
    `Role: ${user?.empRole} , ROUTE: ${nextUrl.pathname}, NURSE ROUTE: ${isNurseRoute}`
  );

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      // Pass nextUrl as 2nd argument to make an absolute url
      if (user?.role) {
        if (user.role === "EMPLOYEE") {
          return Response.redirect(
            new URL(DEFAULT_EMPLOYEE_LOGIN_REDIRECT, nextUrl)
          );
          ``;
        } else {
          return Response.redirect(
            new URL(DEFAULT_PATIENT_LOGIN_REDIRECT, nextUrl)
          );
        }
      } else {
        return Response.redirect(new URL("/", nextUrl));
      }
    }
    return;
  }

  // if (isAdminRoute) {
  //   if (user?.empRole !== "ADMIN") {
  //     return Response.redirect(new URL("/unauthorized", nextUrl));
  //   } else return;
  // }

  // if (isPhysicianRoute) {
  //   if (user?.empRole !== "PHYSICIAN") {
  //     return Response.redirect(new URL("/unauthorized", nextUrl));
  //   } else return;
  // }

  // if (isNurseRoute) {
  //   if (user?.empRole !== "NURSE") {
  //     return Response.redirect(new URL("/unauthorized", nextUrl));
  //   } else return;
  // }

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
