import { Switch, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import shopifyLogo from "./shopify.png";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/500.css";

export const StyledStatusTitle = styled(Typography)({
  color: "#27150C",
  fontFamily: "Poppins",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "40px",
  letterSpacing: "-0.75px"
});

export const StyledStatusBackedBy = styled(Typography)({
  color: "#555",
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
  letterSpacing: "0.5px"
});

export const StyledStatusStoreURL = styled(Typography)({
  color: "#555",
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  letterSpacing: "0.5px"
});

export const SyledSwitch = styled(Switch)({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        background:
          "var(--Button-Gradient---Primary, linear-gradient(323deg, #FF9965 30.56%, #DF682B 118.19%))",
        opacity: 1,
        border: 0
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        background: "rgba(0, 0, 0, 0.26)",
        opacity: 0.5
      }
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff"
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "pink"
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7
    }
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
    borderRadius: "23px",
    background: "var(--base-01, #FFF)"
  },
  "& .MuiSwitch-track": {
    borderRadius: "100px",
    background: "var(--base-03, #E8E8E8)",
    opacity: 1,
    transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
  }
});

export const StyledQueueStatusText = styled(Typography)({
  marginLeft: "10px",
  color: "#27150C",
  fontFamily: "Poppins",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
  letterSpacing: "0.5px"
});

export const StyledShopifyLogo = styled("div")({
  marginLeft: "8px",
  width: "71.429px",
  height: "20px",
  flexShrink: 0,
  backgroundImage: `url(${shopifyLogo})`,
  backgroundPosition: "50%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  filter: "grayscale(100%)"
});
