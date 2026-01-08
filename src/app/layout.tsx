import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import * as React from "react";

import NotistackProvider from "@/providers/NotistackProvider";
import QueryProvider from "@/providers/QueryProvider";
import SessionProvider from "@/providers/SessionProvider";
import Navbar from "@/shared/layouts/Navbar";
import theme from "@/styles/theme";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" defaultMode="system" />
        <SessionProvider>
          <QueryProvider>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <NotistackProvider>
                  <Navbar />
                  {props.children}
                </NotistackProvider>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
