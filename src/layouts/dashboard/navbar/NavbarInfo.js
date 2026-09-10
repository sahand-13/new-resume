import { Box, Typography } from "@mui/material";

const NavbarInfo = ({ isCollapse }) => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        bgcolor: "rgba(255,255,255,.045)",
        border: "1px solid rgba(197,160,90,.12)",
        transition: (theme) =>
          theme.transitions.create(
            ["width", "writingMode", "textOrientation", "opacity"],
            {
              duration: theme.transitions.duration.shorter,
            }
          ),
        mt: 3,
        p: 1,
        borderRadius: 0.5 * 1.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: 2,
          my: 0.3,
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle2" fontSize={"10px"} noWrap>
          Residence :
        </Typography>
        <Typography
          variant="body2"
          fontSize={"10px"}
          noWrap
          sx={{ color: "#aeb7ae" }}
        >
          Iran
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: 2,
          my: 0.3,
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle2" fontSize={"10px"} noWrap>
          City :
        </Typography>
        <Typography
          variant="body2"
          fontSize={"10px"}
          noWrap
          sx={{ color: "#aeb7ae" }}
        >
          Karaj, Iran
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: 2,
          my: 0.3,
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle2" fontSize={"10px"} noWrap>
          Age :
        </Typography>
        <Typography
          variant="body2"
          fontSize={"10px"}
          noWrap
          sx={{ color: "#aeb7ae" }}
        >
          29
        </Typography>
      </Box>
    </Box>
  );
};

export default NavbarInfo;
