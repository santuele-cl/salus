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
  medicalProfessionalRoutes,
  DEFAULT_ADMIN_LOGIN_REDIRECT,
  DEFAULT_PROFESSIONAL_LOGIN_REDIRECT,
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

  // console.log("middleware user : ", user);

  const { nextUrl } = req;
  const isLoggedIn = !!req?.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiRoutePrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // console.log(nextUrl.pathname.replace("/dashboard", ""));

  const isAdminRoute = adminRoutes.some((route) =>
    nextUrl.pathname.replace("/dashboard", "").startsWith(route)
  );

  const isMedicalProfessionalRoute = medicalProfessionalRoutes.some((route) =>
    nextUrl.pathname.replace("/dashboard", "").startsWith(route)
  );

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      // Pass nextUrl as 2nd argument to make an absolute url
      if (user?.empRole) {
        if (user.empRole === "ADMIN") {
          return Response.redirect(
            new URL(DEFAULT_ADMIN_LOGIN_REDIRECT, nextUrl)
          );
        } else {
          return Response.redirect(
            new URL(DEFAULT_PROFESSIONAL_LOGIN_REDIRECT, nextUrl)
          );
        }
      }
      return;
      // if (user?.role) {
      //   if (user.role === "EMPLOYEE") {
      //     return Response.redirect(
      //       new URL(DEFAULT_EMPLOYEE_LOGIN_REDIRECT, nextUrl)
      //     );
      //   } else {
      //     return Response.redirect(
      //       new URL(DEFAULT_PATIENT_LOGIN_REDIRECT, nextUrl)
      //     );
      //   }
      // } else {
      //   return Response.redirect(new URL("/", nextUrl));
      // }
    }
    return;
  }

  if (isAdminRoute) {
    if (isLoggedIn) {
      if (user?.empRole !== "ADMIN") {
        return Response.redirect(new URL("/unauthorized", nextUrl));
      }
      return;
    } else return Response.redirect(new URL(`/auth/login`, nextUrl));
  }

  if (isMedicalProfessionalRoute) {
    if (isLoggedIn) {
      if (user?.empRole === "ADMIN") {
        return Response.redirect(new URL("/unauthorized", nextUrl));
      }
      return;
    } else return Response.redirect(new URL(`/auth/login`, nextUrl));
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
