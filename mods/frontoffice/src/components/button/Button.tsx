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
import { OutlinedButtonStyle, PrimaryButtonStyle } from "./ButtonStyles";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary";
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  sx?: any;
};

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  disabled = false,
  color = "primary",
  children,
  variant = "contained",
  sx,
  onClick,
  ...props
}) => {
  if (variant === "outlined") {
    return (
      <OutlinedButtonStyle
        {...props}
        type={type}
        color={color}
        disabled={disabled}
        sx={sx}
        onClick={onClick}
      >
        {children}
      </OutlinedButtonStyle>
    );
  }
  return (
    <PrimaryButtonStyle
      {...props}
      type={type}
      color={color}
      disabled={disabled}
      sx={sx}
      onClick={onClick}
    >
      {children}
    </PrimaryButtonStyle>
  );
};
