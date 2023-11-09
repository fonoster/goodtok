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
import {
  StyledBox,
  StyledDescription,
  StyledTitle
} from "./ConfirmationFormStyles";
import { Box } from "@mui/material";
import { TextField } from "../textfield/TextField";
import { Button } from "../button/Button";
import React from "react";

type ConfirmationFormProps = {
  title: string;
  description: string;
  confirmationText: string;
  confirmationButtonText?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmationForm: React.FC<ConfirmationFormProps> = ({
  title,
  description,
  confirmationText,
  confirmationButtonText = "Confirm",
  onCancel,
  onConfirm
}) => {
  const [value, setValue] = React.useState("");

  return (
    <StyledBox>
      <StyledTitle>{title}</StyledTitle>

      <StyledDescription sx={{ mt: 2 }}>{description}</StyledDescription>

      <TextField
        helperText={"Type '" + confirmationText + "' to confirm."}
        placeholder={confirmationText}
        sx={{ mt: 4 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" sx={{ width: 210 }} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ width: 210 }}
          onClick={onConfirm}
          disabled={value.toLowerCase() !== confirmationText.toLowerCase()}
        >
          {confirmationButtonText}
        </Button>
      </Box>
    </StyledBox>
  );
};
