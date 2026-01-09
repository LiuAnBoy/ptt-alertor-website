"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link as MuiLink,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { label: "TOP 100", href: "/top" },
    { label: "教學", href: "/docs" },
  ];

  const authMenuItems = isAuthenticated
    ? [{ label: "設定", href: "/settings" }]
    : [{ label: "登入", href: "/user/login" }];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography variant="h6">選單</Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              component={NextLink}
              href={item.href}
              onClick={handleDrawerToggle}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {authMenuItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              component={NextLink}
              href={item.href}
              onClick={handleDrawerToggle}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {isAuthenticated && (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerToggle();
                signOut({ callbackUrl: "/" });
              }}
            >
              <ListItemText primary="登出" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      {isAuthenticated && (
        <Stack
          direction="row"
          alignItems="center"
          sx={{ borderTop: 1, borderColor: "divider", px: 2, py: 1 }}
          spacing={2}
        >
          <Typography variant="body2">{session?.user?.name}</Typography>
        </Stack>
      )}
    </Box>
  );

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

          {/* Desktop Menu */}
          <Stack
            direction="row"
            alignItems="center"
            gap={4}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
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

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
