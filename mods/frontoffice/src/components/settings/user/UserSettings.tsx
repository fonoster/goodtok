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
import { Box } from "@mui/material";
import { TextField } from "../../textfield/TextField";
import {
  StyledAvatar,
  StyledBox,
  UserSettingsTitle
} from "./UserSettingsStyles";
import { Button } from "../../button/Button";
import React, { useState } from "react";

type UserSettingsProps = {
  initialName: string;
  email: string;
  avatarUrl?: string;
  onSave?: (name: string) => void;
};

export const UserSettings: React.FC<UserSettingsProps> = ({
  initialName,
  email,
  avatarUrl,
  onSave
}) => {
  const [name, setName] = useState(initialName);

  const handleSave = () => {
    onSave && onSave(name);
  };

  return (
    <Box>
      <UserSettingsTitle>Personal Settings</UserSettingsTitle>
      <StyledBox>
        <TextField
          label="Name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField label="Email Address" value={email} readonly />

        <TextField label="Password" placeholder="******" type="password" />

        <StyledAvatar
          alt={name || "Avatar"}
          src={avatarUrl}
          onClick={() => window.open("https://gravatar.com", "_blank")}
        />
      </StyledBox>

      <Box sx={{ width: 206, mt: 5 }}>
        <Button onClick={handleSave}>Save changes</Button>
      </Box>
    </Box>
  );
};
