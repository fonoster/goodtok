import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

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
