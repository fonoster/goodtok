import "@fontsource/poppins/600.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const PrimaryButtonStyle = styled(Button)(({ color }) => ({
  background:
    color === "primary"
      ? "linear-gradient(323deg, #FF9965 30.56%, #DF682B 118.19%)"
      : "var(--base-05, #8D8D8D)",
  width: "100%",
  height: "37px",
  flexShrink: "0",
  display: "flex",
  padding: "8px 16px",
  justifyContent: "center",
  alignItems: "flex-start",
  color: "var(--base-01, #FFF)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: 11,
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "21px",
  letterSpacing: "1.32px",
  textTransform: "uppercase",
  borderRadius: "40px",
  border: "none",
  boxShadow: "none",
  "&:hover": {
    border: "none",
    boxShadow: "none",
    background:
      color === "primary"
        ? "linear-gradient(323deg, #FF9965 30.56%, #DF682B 118.19%)"
        : "var(--base-05, #8D8D8D)"
  }
}));

export const OutlinedButtonStyle = styled(Button)(({ color }) => ({
  border:
    color === "primary"
      ? "2px solid var(--base-01, #FF9965)"
      : "2px solid var(--base-01, #8D8D8D)",
  width: "100%",
  height: "37px",
  flexShrink: "0",
  display: "flex",
  padding: "8px 16px",
  justifyContent: "center",
  alignItems: "flex-start",
  fontFamily: "Poppins",
  fontSize: 11,
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "21px",
  letterSpacing: "1.32px",
  textTransform: "uppercase",
  borderRadius: "40px",
  boxShadow: "none",
  background: "transparent",
  color: "var(--base-01, #000)",
  "&:hover": {
    background:
      color === "primary"
        ? "linear-gradient(323deg, #FF9965 30.56%, #DF682B 118.19%)"
        : "var(--base-05, #8D8D8D)",
    border:
      color === "primary"
        ? "2px solid var(--base-01, #FF9965)"
        : "2px solid var(--base-01, #8D8D8D)"
  }
}));
