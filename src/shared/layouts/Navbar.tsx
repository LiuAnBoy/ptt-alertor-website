"use client";

import {
  AppBar,
  Button,
  Link as MuiLink,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <MuiLink
            component={NextLink}
            href="/"
            color="inherit"
            underline="none"
          >
            <Typography variant="h5">PTT Alertor</Typography>
          </MuiLink>
          <Stack direction="row" alignItems="center" gap={4}>
            <Button
              component={NextLink}
              href="/top"
              variant="text"
              color="inherit"
              sx={{ fontSize: "15px" }}
            >
              TOP 100
            </Button>
            <Button
              component={NextLink}
              href="/docs"
              variant="text"
              color="inherit"
              sx={{ fontSize: "15px" }}
            >
              教學
            </Button>

            {isAuthenticated ? (
              <Stack direction="row" alignItems="center">
                <Typography variant="body1" sx={{ pr: 2 }}>
                  {session?.user?.name}
                </Typography>
                <Button
                  component={NextLink}
                  href="/settings"
                  variant="text"
                  color="inherit"
                  sx={{ fontSize: "15px" }}
                >
                  設定
                </Button>
                <Button
                  variant="text"
                  color="inherit"
                  sx={{ fontSize: "15px" }}
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  登出
                </Button>
              </Stack>
            ) : (
              <Button
                component={NextLink}
                href="/user/login"
                variant="text"
                color="inherit"
                sx={{ fontSize: "15px" }}
              >
                登入
              </Button>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
