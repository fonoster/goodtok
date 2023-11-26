/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of Goodtok
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SelectStyled = styled(Select)(() => ({
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
  },
  "& .MuiSelect-select": {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.5px",
    color: "#333"
  }
}));

export const StyledMenuItem = styled(MenuItem)({
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "24px",
  letterSpacing: "0.5px",
  color: "#333",
  "&.Mui-selected": {
    backgroundColor: "#F1DED7 !important"
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#F1DED7"
  }
});

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
