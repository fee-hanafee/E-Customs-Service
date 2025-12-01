"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import {
  Drawer,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  CorporateFare,
} from "@mui/icons-material";
import ThemeToggle from "../theme/ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const DRAWER_WIDTH = 280;

const GRADIENT_BLUE_DARK = "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)";
const GRADIENT_BLUE_LIGHT = "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)";
const GRADIENT_BG_DARK = "linear-gradient(180deg, #0d1117 0%, #161b22 100%)";
const GRADIENT_BG_LIGHT = "linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)";

export default function Sidebar() {
  const t = useTranslations();
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setIsClient(true);
  }, []);

  const menuItems = useMemo(
    () => [
      { text: t("sidebar.home"), icon: <HomeIcon />, path: "/" },
      { text: t("sidebar.company"), icon: <CorporateFare />, path: "/company" },
    ],
    [t]
  );

  const handleListItemClick = (path) => {
    router.push(path);
    if (isClient && isMobile) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const blueGradient =
    theme.palette.mode === "dark" ? GRADIENT_BLUE_DARK : GRADIENT_BLUE_LIGHT;
  const drawerBackground =
    theme.palette.mode === "dark" ? GRADIENT_BG_DARK : GRADIENT_BG_LIGHT;

  const drawerContent = (
    <>
      <Box
        sx={{
          p: 2,
          background: blueGradient,
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          position: "relative",
        }}
      >
        {isClient && isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.5px",
            fontFamily: "var(--font-prompt)",
            pr: isClient && isMobile ? 4 : 0,
          }}
        >
          {t("common.appName")}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            opacity: 0.9,
            fontSize: "0.75rem",
            fontFamily: "var(--font-prompt)",
          }}
        >
          {t("common.appDescription")}
        </Typography>
      </Box>
      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ pl: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              fontSize: "0.875rem",
            }}
          >
            {t("sidebar.hello")}, John Doe
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LanguageSwitcher />
          <ThemeToggle />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <List sx={{ px: 2, py: 1 }}>
          {menuItems.map((item, index) => {
            const isSelected = item.path === pathname;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => handleListItemClick(item.path)}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 2,
                    transition: "all 0.2s ease-in-out",
                    "&.Mui-selected": {
                      background: blueGradient,
                      color: "white",
                      "&:hover": {
                        background: blueGradient,
                        opacity: 0.9,
                      },
                      "& .MuiListItemIcon-root": {
                        color: "white",
                      },
                    },
                    "&:hover": {
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(25, 118, 210, 0.15)"
                          : "rgba(33, 150, 243, 0.1)",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isSelected
                        ? "white"
                        : theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.7)"
                        : "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontFamily: "var(--font-prompt)",
                      fontWeight: isSelected ? 600 : 500,
                      fontSize: "0.95rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          textAlign: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontFamily: "var(--font-prompt)",
            fontSize: "0.75rem",
          }}
        >
          {t("common.copyright")}
        </Typography>
      </Box>
    </>
  );

  const mobileMenuButtonBg =
    theme.palette.mode === "dark"
      ? "rgba(25, 118, 210, 0.8)"
      : "rgba(33, 150, 243, 0.8)";
  const mobileMenuButtonBgHover =
    theme.palette.mode === "dark"
      ? "rgba(25, 118, 210, 1)"
      : "rgba(33, 150, 243, 1)";
  const drawerShadow =
    theme.palette.mode === "dark"
      ? "2px 0 8px rgba(0,0,0,0.3)"
      : "2px 0 8px rgba(0,0,0,0.05)";

  return (
    <>
      {isClient && isMobile && !mobileOpen && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            bottom: 16,
            left: 16,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: mobileMenuButtonBg,
            color: "white",
            "&:hover": {
              backgroundColor: mobileMenuButtonBgHover,
            },
            boxShadow: theme.shadows[4],
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderRight: `1px solid ${theme.palette.divider}`,
            background: drawerBackground,
            boxShadow: drawerShadow,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
