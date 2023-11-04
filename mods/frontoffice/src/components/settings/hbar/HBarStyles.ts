import { Drawer, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import "@fontsource/poppins/600.css";
import "@fontsource/poppins/500.css";

export const StyledDrawer = styled(Drawer)({
  padding: "24px",
  "& .MuiDrawer-paper": {
    backgroundColor: "#FFFFFF",
    boxShadow: "5px 0px 40px 5px rgba(0, 0, 0, 0.10)",
    borderRight: "none !important",
    marginTop: "75px",
    paddingTop: "24px",
    height: "calc(100% - 75px - 24px)",
    width: "250px"
  },
  "& .Mui-selected": {
    backgroundColor: "#FFF4F0 !important"
  },
  "& .Mui-selected .MuiTypography-root": {
    fontWeight: 500
  },
  "& .MuiTypography-root": {
    fontFamily: "Poppins"
  }
});

export const StyledTitle = styled(Typography)({
  color: "#27150C",
  fontFamily: "Poppins",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "28px",
  letterSpacing: "0.5px"
});

export const StyledLink = styled(Link)({
  color: "#000",
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "150%",
  textDecoration: "none",
  "&:hover": {
    textDecorationLine: "underline"
  },
  cursor: "pointer"
});
