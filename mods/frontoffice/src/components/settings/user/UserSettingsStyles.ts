import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fontsource/poppins/500.css";

export const StyledBox = styled(Box)(() => ({
  width: "440px",
  height: "399px",
  background: "var(--base-01, #FFF)",
  padding: "32px 24px 24px 24px"
}));

export const UserSettingsTitle = styled(Typography)(() => ({
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

export const StyledAvatar = styled(Avatar)(() => ({
  cursor: "pointer",
  width: "96px",
  height: "96px"
}));
