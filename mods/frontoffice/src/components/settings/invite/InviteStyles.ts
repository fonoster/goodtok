import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import "@fontsource/poppins/500.css";
import "@fontsource/poppins/400.css";

export const StyledBox = styled(Box)({
  backgroundColor: "#FFFFFF",
  width: "440px",
  height: "404px",
  flexShrink: 0,
  padding: "24px"
});

export const StyledTitle = styled(Typography)({
  color: "#27150C",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "28px",
  letterSpacing: "0.5px"
});
