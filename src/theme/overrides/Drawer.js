import { alpha } from "@mui/material";
import cssStyles from "../../utils/cssStyles";

// ----------------------------------------------------------------------

export default function Drawer(theme) {
  const isLight = theme.palette.mode === "light";

  return {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          "&.MuiDrawer-paper": {
            ...cssStyles(theme).bgBlur({
              color: theme.palette.common.black,
              blur: 0,
              opacity: 0.7,
            }),
          },
        },

        modal: {
          '&[role="presentation"]': {
            "& .MuiDrawer-paperAnchorLeft": {
              boxShadow: `8px 24px 24px 12px ${alpha(
                theme.palette.common.black,
                isLight ? 0.16 : 0.48
              )}`,
            },
            "& .MuiDrawer-paperAnchorRight": {
              boxShadow: `-8px 24px 24px 12px ${alpha(
                theme.palette.common.black,
                isLight ? 0.16 : 0.48
              )}`,
            },
          },
        },
      },
    },
  };
}
