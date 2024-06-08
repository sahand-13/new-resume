"use client";
import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
import useCollapseDrawer from "../../hooks/useCollapseDrawer";
// config
import { HEADER, NAVBAR } from "../../config";
//
import DashboardHeader from "./header";
import NavbarVertical from "./navbar/NavbarVertical";

// ----------------------------------------------------------------------

const MainStyle = styled("main", {
  shouldForwardProp: (prop) => prop !== "collapseClick",
})(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create("margin-left", {
      duration: theme.transitions.duration.shorter,
    }),
    // ...(collapseClick && {
    //   marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    // }),
  },
}));

// ----------------------------------------------------------------------

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function DashboardLayout({ children }) {
  const { collapseClick, isCollapse } = useCollapseDrawer();

  // const { themeLayout } = useSettings();

  const isDesktop = useResponsive("up", "lg");

  const [open, setOpen] = useState(false);

  // const verticalLayout = themeLayout === "vertical";

  return (
    <Box
      sx={{
        display: { lg: "flex" },
        maxHeight: "100vh",
        bgcolor: (theme) => theme.palette.background.default,
        position: "relative",
      }}
    >
      <DashboardHeader
        isCollapse={isCollapse}
        onOpenSidebar={() => setOpen(true)}
      />

      <NavbarVertical
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />

      <MainStyle
        collapseClick={collapseClick}
        sx={{ p: 2, ...(!isDesktop && { pt: 10 }) }}
      >
        {children}
      </MainStyle>
    </Box>
  );
}
