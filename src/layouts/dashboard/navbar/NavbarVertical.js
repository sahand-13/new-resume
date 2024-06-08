import PropTypes from "prop-types";
import { useEffect } from "react";
// next
// @mui
import { styled, useTheme } from "@mui/material/styles";
import { Box, Stack, Drawer, Container, Divider } from "@mui/material";
// hooks
import useResponsive from "../../../hooks/useResponsive";
import useCollapseDrawer from "../../../hooks/useCollapseDrawer";
// utils
import cssStyles from "../../../utils/cssStyles";
// config
import { NAVBAR } from "../../../config";
// components
import Logo from "../../../components/Logo";
import Scrollbar from "../../../components/Scrollbar";
import { NavSectionVertical } from "../../../components/nav-section";
//
import navConfig from "./NavConfig";
import NavbarDocs from "./NavbarDocs";
import NavbarAccount from "./NavbarAccount";
import CollapseButton from "./CollapseButton";
import { usePathname } from "next/navigation";
import NavbarInfo from "./NavbarInfo";
import NavbarLanguage from "./NavbarLanguage";
import NavbarSkills from "./NavbarSkills";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
  },
  transition: theme.transitions.create("width", {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarVertical.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }) {
  const theme = useTheme();

  const pathname = usePathname();

  const isDesktop = useResponsive("up", "lg");

  const {
    isCollapse,
    collapseClick,
    collapseHover,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    // <Box sx={{maxHeight:"100vh"}}>
    <Scrollbar
      sx={{
        "& .simplebar-content": {
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 1.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: "center" }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="end">
          {isDesktop && !isCollapse && (
            <CollapseButton
              onToggleCollapse={onToggleCollapse}
              collapseClick={collapseClick}
            />
          )}
        </Stack>
        <Box
          sx={{
            position: "-webkit-sticky",
            position: "sticky",
            top: 0,
          }}
        >
          <NavbarAccount isCollapse={isCollapse} />
        </Box>
        {!isCollapse && (
          <>
            <Divider />
            <NavbarInfo isCollapse={isCollapse} />
            <Divider />
            <NavbarLanguage isCollapse={isCollapse} />
            <Divider />

            <NavbarSkills isCollapse={isCollapse} />
          </>
        )}
      </Stack>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
    // </Box>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse
            ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
            : NAVBAR.DASHBOARD_WIDTH,
        },
        position: "relative",
      }}
    >
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="permanent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              "&.MuiDrawer-paper": {
                bgcolor: (theme) => theme.palette.primary.default,
              },
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: "dashed",
              bgcolor: "background.default",
              transition: (theme) =>
                theme.transitions.create("width", {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: (theme) => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
