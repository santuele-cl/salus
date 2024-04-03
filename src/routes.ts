/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification", "/unauthorized"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset-password",
  "/auth/new-password",
];

/**
 * The prefix for api authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiRoutePrefix = "/api/auth";

export const adminRoutes = [
  "/dashboard/users",
  "/dashboard/departments/clinical-departments",
  "/dashboard/deparments/clinical-departments",
  "/dashboard/drugs",
  "/dashboard/appointments",
  "/dashboard/roles-and-permissions",
  "/dashboard/logs/login",
  "/dashboard/logs/chart",
];

export const physicianRoutes = [
  "/dashboard/patients",
  "/dashboard/appointments",
  "/dashboard/settings",
];

export const nurseRoutes = [
  "/dashboard/patients",
  "/dashboard/appointments",
  "/dashboard/settings",
];

/**
 * The default redirect route after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export const DEFAULT_EMPLOYEE_LOGIN_REDIRECT = "/dashboard/patients";
export const DEFAULT_PATIENT_LOGIN_REDIRECT = "/";

export const roleRoute = {
  EMPLOYEE: "/dashboard/patients",
  PATIENT: "/",
};
