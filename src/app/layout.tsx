// import "react-big-calendar/lib/css/react-big-calendar.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { CssBaseline } from "@mui/material";
import { auth } from "@/auth";

import "react-big-calendar/lib/css/react-big-calendar.css";
import MuiXDateProvider from "@/providers/MuiXDateProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salus",
  description: "Electronic Health Record System by Triz",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MuiXDateProvider>
              <body className={inter.className}>{children}</body>
            </MuiXDateProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </html>
    </SessionProvider>
  );
}
