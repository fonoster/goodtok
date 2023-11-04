import { InputLabel, Select } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SelectStyled = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E0E3E7"
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E0E3E7"
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#6F7E8C"
  },
  "& .MuiListItem-root.Mui-selected, & .MuiListItem-root.Mui-selected:hover": {
    backgroundColor: "#6F7E8C"
  },
  "&.Mui-focused:not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E0E3E7"
  }
}));

export const InputLabelStyled = styled(InputLabel)({
  color: "#27150C",
  backgroundColor: "transparent",
  padding: "0 8px",
  "&.MuiInputLabel-shrink": {
    backgroundColor: "#F1DED7",
    padding: "0 8px",
    color: "#00000099"
  }
});
