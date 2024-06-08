import { Box, Typography } from "@mui/material";

const NavbarInfo = ({ isCollapse }) => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        bgcolor: (theme) => theme.palette.grey["900"],
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
          sx={{ color: "text.secondary" }}
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
          sx={{ color: "text.secondary" }}
        >
          Tehran
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
          sx={{ color: "text.secondary" }}
        >
          27
        </Typography>
      </Box>
    </Box>
  );
};

export default NavbarInfo;
