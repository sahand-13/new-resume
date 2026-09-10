import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
// hooks
// components
import MyAvatar from "../../../components/MyAvatar";
import profile from "../../../assets/profile/profile.jpg";
// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "block",
  alignItems: "center",
  background: "transparent",
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
          border: "3px solid #c5a05a",
          boxShadow: "0 0 0 5px rgba(197,160,90,.12)",
          ...(isCollapse && {
            width: 70,
            height: 70,
          }),
        }}
      />

      {!isCollapse && <Box
        sx={{
          transition: (theme) =>
            theme.transitions.create(
              ["width", "writingMode", "textOrientation", "opacity"],
              {
                duration: theme.transitions.duration.shorter,
              }
            ),
          mt: 3,
        }}
      >
        <Typography variant="subtitle2" noWrap sx={{ color: "#f1f0e8", letterSpacing: "-.02em" }}>
          Sahand Golkar
        </Typography>
        {!isCollapse && (
          <Typography variant="body2" noWrap sx={{ color: "#97a399", fontSize: ".72rem" }}>
            Fullstack developer
          </Typography>
        )}
      </Box>}
    </RootStyle>
  );
}
