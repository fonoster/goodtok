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
import { FormControl, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { InputLabelStyled, SelectStyled } from "./SelectStyles";
import React from "react";

type SelectProps = {
  helperText?: string;
  label?: string;
  value?: string;
  readonly?: boolean;
  sx?: any;
  error?: boolean;
  data?: { label: string; value: string }[];
  onChange?: (event: SelectChangeEvent) => void;
};

export const Select: React.FC<SelectProps> = ({
  value,
  helperText,
  label,
  readonly,
  error = false,
  sx,
  onChange,
  data,
  ...props
}) => {
  return (
    <FormControl fullWidth>
      <InputLabelStyled htmlFor={"input-label-" + label}>
        {label}
      </InputLabelStyled>
      <SelectStyled
        {...props}
        fullWidth
        labelId={"input-label-" + label}
        sx={sx || { mb: 4 }}
        error={error}
        value={value}
        disabled={readonly}
        InputLabelProps={{ shrink: true }}
        helperText={helperText}
        onChange={onChange}
      >
        {data &&
          data.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
      </SelectStyled>
    </FormControl>
  );
};
