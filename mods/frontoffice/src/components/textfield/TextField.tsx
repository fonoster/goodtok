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
import React from "react";
import { TextFieldStyled } from "./styles";

type TextFieldProps = {
  helperText?: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "time";
  value?: string;
  readonly?: boolean;
  sx?: any;
  error?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextField: React.FC<TextFieldProps> = ({
  value,
  type = "text",
  helperText,
  label,
  placeholder,
  readonly,
  error = false,
  sx,
  onChange,
  ...props
}) => {
  return (
    <TextFieldStyled
      {...props}
      sx={sx || { mb: 4 }}
      error={error}
      value={value}
      fullWidth
      disabled={readonly}
      InputLabelProps={{ shrink: true }}
      label={label}
      type={type}
      placeholder={placeholder}
      helperText={helperText}
      onChange={onChange}
    />
  );
};
