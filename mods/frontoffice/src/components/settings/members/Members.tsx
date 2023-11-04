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
import { Member, Status } from "./types";
import {
  Box,
  IconButton,
  Paper,
  TableBody,
  TableHead,
  TableRow
} from "@mui/material";
import {
  StyledBox,
  StyledLink,
  StyledTable,
  StyledTableCell,
  StyledTableContainer,
  StyledTableHeadCell,
  StyledTitle
} from "./MembersStyles";
import { Delete as DeleteIcon, Email as EmailIcon } from "@mui/icons-material";
import React from "react";

type MembersProps = {
  data?: Member[];
  onDelete?: (id: string) => void;
  onResend?: (id: string) => void;
};

export const Members: React.FC<MembersProps> = ({
  onResend,
  onDelete,
  data = []
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          alignItems: "center"
        }}
      >
        <StyledTitle>Workspace Members</StyledTitle>
        <StyledLink href="#">+ Invite New Member</StyledLink>
      </Box>
      <StyledBox sx={{ p: 2, backgroundColor: "#FFFFFF" }}>
        <StyledTableContainer component={Paper}>
          <StyledTable aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableHeadCell>Name</StyledTableHeadCell>
                <StyledTableHeadCell>Email</StyledTableHeadCell>
                <StyledTableHeadCell>Role</StyledTableHeadCell>
                <StyledTableHeadCell>Date Added</StyledTableHeadCell>
                <StyledTableHeadCell>Status</StyledTableHeadCell>
                <StyledTableHeadCell align="right">Actions</StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.role}</StyledTableCell>
                  <StyledTableCell>
                    {row.createdAt.toDateString()}
                  </StyledTableCell>
                  <StyledTableCell>{row.status}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.status === Status.PENDING && (
                      <IconButton
                        aria-label="resend-invite"
                        onClick={() => onResend && onResend(row.id)}
                      >
                        <EmailIcon />
                      </IconButton>
                    )}
                    <IconButton
                      aria-label="delete"
                      onClick={() => onDelete && onDelete(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      </StyledBox>
    </>
  );
};
