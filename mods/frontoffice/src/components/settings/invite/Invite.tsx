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
import { StyledBox, StyledTitle } from "./InviteStyles";
import { TextField } from "../../textfield/TextField";
import { Select } from "../../select/Select";
import { Role } from "../members/types";
import { Button } from "../../button/Button";
import { Box } from "@mui/material";
import React from "react";

type InviteProps = {
  onInvite?: (name: string, email: string, role: Role) => void;
};

export const Invite: React.FC<InviteProps> = ({ onInvite }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState(Role.MEMBER);

  const data = [
    { label: "Admin", value: Role.ADMIN },
    { label: "Member", value: Role.MEMBER }
  ];

  return (
    <StyledBox>
      <StyledTitle>Invite new members to your workspace</StyledTitle>
      <TextField
        sx={{ mt: 6, mb: 4 }}
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <TextField
        sx={{ mb: 4 }}
        label="Email Address"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <Select
        sx={{ mb: 6 }}
        label="Role"
        value={role}
        data={data}
        onChange={(event) => setRole(event.target.value as Role)}
      />

      <Box sx={{ width: 210 }}>
        <Button
          variant="contained"
          onClick={() => onInvite && onInvite(name, email, role)}
        >
          Send Invite
        </Button>
      </Box>
    </StyledBox>
  );
};
