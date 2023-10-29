import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fontsource/open-sans/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/500.css";

export const StyledHomePageTitle = styled(Typography)(() => ({
  color: "var(--tertiary-dark, #27150C)",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "48px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "56px",
  letterSpacing: "-0.75px"
}));

export const StyledHomePageSubTitle = styled(Typography)(() => ({
  color: "var(--tertiary-dark, #27150C)",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "24px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "28px",
  letterSpacing: "0.5px"
}));

export const StyleHomePAgeDescription = styled(Typography)(() => ({
  color: "var(--tertiary-dark, #27150C)",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "open sans",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "24px",
  letterSpacing: "-0.176px"
}));
