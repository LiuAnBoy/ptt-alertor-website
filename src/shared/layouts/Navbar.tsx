"use client";

import {
  AppBar,
  Button,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  if (!session) {
    return null;
  }

  const isAuthenticated = status === "authenticated";

  return (
    <AppBar position="static">
      <Toolbar>
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link href="/" color="inherit">
            <Typography variant="h5">PTT Alertor</Typography>
          </Link>
          <Stack direction="row" alignItems="center" gap={4}>
            <Button variant="text" color="inherit" sx={{ fontSize: "15px" }}>
              <Link href="/top" color="inherit">
                TOP 100
              </Link>
            </Button>

            {isAuthenticated ? (
              <Stack direction="row" alignItems="center">
                <Typography variant="body1" sx={{ pr: 2 }}>
                  {session.user.name}
                </Typography>
                <Button
                  variant="text"
                  color="inherit"
                  sx={{ fontSize: "15px" }}
                >
                  <Link href="/settings" color="inherit">
                    設定
                  </Link>
                </Button>
                <Button
                  variant="text"
                  color="inherit"
                  sx={{ fontSize: "15px" }}
                  onClick={() => signOut()}
                >
                  登出
                </Button>
              </Stack>
            ) : (
              <Button variant="text" color="inherit">
                <Link href="/user/login" color="inherit">
                  登入
                </Link>
              </Button>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
