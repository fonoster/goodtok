import { Box, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import "@fontsource/poppins/600.css";
import "@fontsource/poppins/500.css";
import "@fontsource/open-sans/400.css";

export const ForgotPasswordFormContainer = styled(Box)({
  width: "440px"
});

export const ForgotPasswordFormTitle = styled(Typography)({
  color: "var(--tertiary-dark, #27150C)",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "24px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "28px",
  letterSpacing: "0.5px"
});

export const ForgotPasswordFormDescription = styled(Typography)({
  color: "var(--tertiary-dark, #27150C)",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "13px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "18px"
});

export const OrDivider = styled(Divider)(() => ({
  color: "#252525",
  textAlign: "center",
  fontFamily: "Open Sans",
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "16px",
  letterSpacing: 0.25
}));
