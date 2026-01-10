"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link as MuiLink,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { MouseEvent, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangePassword = () => {
    handleMenuClose();
    router.push("/user/password");
  };

  const handleLogout = () => {
    handleMenuClose();
    signOut({ callbackUrl: "/" });
  };

  const menuItems = [
    { label: "TOP 100", href: "/top" },
    { label: "教學", href: "/docs" },
  ];

  const authMenuItems = isAuthenticated
    ? [{ label: "訂閱管理", href: "/subscriptions" }]
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
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/user/password"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="變更密碼" />
              </ListItemButton>
            </ListItem>
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
          </>
        )}
      </List>
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
                <Button
                  component={NextLink}
                  href="/subscriptions"
                  variant="text"
                  color="inherit"
                  sx={{ fontSize: "15px" }}
                >
                  訂閱管理
                </Button>
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  aria-controls={menuOpen ? "settings-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? "true" : undefined}
                >
                  <SettingsIcon />
                </IconButton>
                <Menu
                  id="settings-menu"
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    "aria-labelledby": "settings-button",
                  }}
                >
                  <MenuItem onClick={handleChangePassword}>變更密碼</MenuItem>
                  <MenuItem onClick={handleLogout}>登出</MenuItem>
                </Menu>
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
