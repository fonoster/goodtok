import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/400.css";

export const StyledWorkspaceCard = styled("div")(() => ({
  width: "265px",
  height: "279px",
  display: "flex",
  padding: "30px 30px 16px 30px",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  background: "var(--tertiary-light, #FFF4F0)"
}));

export const StyledWorkspaceCardCircle = styled("div")(() => ({
  width: "88px",
  height: "88px",
  flexShrink: 0,
  borderRadius: "1000px",
  background: "var(--tertiary-prime, #FF9965)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}));

export const StyledWorkspaceCardCircleText = styled(Typography)(() => ({
  color: "var(--tertiary-light, #FFF4F0)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "28px"
}));

export const StyledWorkspaceCardNameContainer = styled("div")(() => ({
  height: "66px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start"
}));

export const StyledWorkspaceCardName = styled(Typography)(() => ({
  color: "var(--tertiary-dark, #27150C)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "28px"
}));

export const StyledWorkspaceCardDate = styled(Typography)(() => ({
  color: "var(--tertiary-dark, #27150C)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "28px"
}));
