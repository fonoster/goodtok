import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fontsource/poppins/500.css";

export const StyledBox = styled(Box)(() => ({
  width: "440px",
  height: "auto",
  background: "var(--base-01, #FFF)",
  paddingTop: "32px",
  paddingLeft: "24px",
  paddingRight: "24px"
}));

export const SettingsTitle = styled(Typography)(() => ({
  color: "var(--tertiary-dark, #27150C)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "28px",
  letterSpacing: "0.5px",
  marginBottom: "8px"
}));
