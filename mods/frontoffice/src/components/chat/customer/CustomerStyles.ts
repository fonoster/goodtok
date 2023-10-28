import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/400.css";

export const StyledTab = styled(Tab)({
  color: "#000000",
  fontFamily: "Poppins",
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "28px",
  letterSpacing: "0.5px",

  textTransform: "none",
  "&.Mui-selected": {
    color: "#000000",
    fontWeight: 500,
    textTransform: "none"
  }
});

export const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "orange"
  }
});
