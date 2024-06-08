import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import Iconify from "../../../components/Iconify";

const NavbarLanguage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: 2,
        zIndex: -1,
      }}
    >
      <CircularProgressWithLabel
        value={100}
        text={"Persian"}
        icon={"emojione-v1:flag-for-iran"}
      />
      <CircularProgressWithLabel
        value={80}
        text={"English"}
        icon="emojione-v1:flag-for-united-states"
      />
    </Box>
  );
};
function CircularProgressWithLabel({ value, text, icon }) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <Iconify icon={icon} width={30} height={30} />
      </Box>
      <Typography fontSize={"10px"} variant="caption" component="div">
        {text}
      </Typography>
    </Box>
  );
}
export default NavbarLanguage;
