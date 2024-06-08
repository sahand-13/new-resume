import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Link, Typography } from "@mui/material";
// hooks
import useAuth from "../../../hooks/useAuth";
// components
import MyAvatar from "../../../components/MyAvatar";
import profile from "../../../assets/profile/profile.jpg";
// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "block",
  alignItems: "center",
  background: theme.palette.background.default,
  zIndex: 10000,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  width: "100%",
  // backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
  textAlign: "center",
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
  const { user } = useAuth();

  return (
    <RootStyle
      sx={{
        justifyContent: "center",
        py: 3,
      }}
    >
      <MyAvatar
        src={profile.src}
        alt="Sahand Golkar"
        sx={{
          width: 150,
          height: 150,
          mx: "auto",
          border: (theme) => `4px ${theme.palette.primary.main} solid`,
          ...(isCollapse && {
            width: 70,
            height: 70,
          }),
        }}
      />

      <Box
        sx={{
          transition: (theme) =>
            theme.transitions.create(
              ["width", "writingMode", "textOrientation", "opacity"],
              {
                duration: theme.transitions.duration.shorter,
              }
            ),
          ...(isCollapse && {
            ml: 3,
            textAlign: "center",
            writingMode: "vertical-rl",
            textOrientation: "upright",
          }),

          mt: 3,
        }}
      >
        <Typography variant="subtitle2" noWrap>
          Sahand Golkar
        </Typography>
        {!isCollapse && (
          <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
            Fullstack developer
          </Typography>
        )}
      </Box>
    </RootStyle>
  );
}
