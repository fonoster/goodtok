import { StepButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fontsource/open-sans/600.css";
import "@fontsource/poppins/500.css";

export const OnboardingTitle = styled("h3")(() => ({
  width: 440,
  height: 34,
  flexShrink: 0,
  color: "#27150C",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: 24,
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "28px",
  letterSpacing: 0.5
}));

export const OnboardingBody = styled(Typography)(() => ({
  width: 440,
  height: 34,
  flexShrink: 0,
  color: "#27150C",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: 13,
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "18px",
  letterSpacing: 0.5
}));

export const StyledStepButton = styled(StepButton)(({ theme }) => ({
  ".MuiStepIcon-text": { display: "none" },
  "& .MuiStepLabel-root .Mui-active": {
    color: "#FF9965"
  },
  "& .MuiStepLabel-root .Mui-completed": {
    color: "gray"
  }
}));
