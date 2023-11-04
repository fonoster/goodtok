import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import "@fontsource/poppins/400.css";

export const TextFieldStyled = styled(TextField)({
  "& label": {
    backgroundColor: "#F1DED7",
    padding: "0 4px"
  },
  "& label.Mui-focused": {
    color: "#27150C",
    backgroundColor: "#F1DED7"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2"
  },
  "& .MuiOutlinedInput-root": {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.5px",
    color: "#333",
    "& fieldset": {
      borderColor: "#E0E3E7"
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C"
    }
  }
});
