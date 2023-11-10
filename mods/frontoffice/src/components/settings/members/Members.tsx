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
import { InviteInfo, Member, Role, Status } from "./types";
import { Delete as DeleteIcon, Email as EmailIcon } from "@mui/icons-material";
import { Invite } from "../invite/Invite";
import {
  Box,
  IconButton,
  Modal,
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
import React from "react";
import { ConfirmationForm } from "../../../components/confirmation/ConfirmationForm";

type MembersProps = {
  data: Member[];
  onDelete: (id: string) => void;
  onResend: (id: string) => void;
  onInvite: (info: InviteInfo) => void;
};

export const Members: React.FC<MembersProps> = ({
  onResend,
  onDelete,
  onInvite,
  data = []
}) => {
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [memberToDelete, setMemberToDelete] = React.useState<string | null>();

  // Sort data so that OWNER is always first
  const sorterdData = data.sort((a, b) => {
    if (a.role === "OWNER") return -1;
    if (b.role === "OWNER") return 1;
    return 0;
  });

  function roleToHumanReadable(role: Role) {
    switch (role) {
      case Role.OWNER:
        return "Owner";
      case Role.ADMIN:
        return "Admin";
      case Role.MEMBER:
        return "Member";
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center"
        }}
      >
        <StyledTitle>Workspace Members</StyledTitle>
        <StyledLink onClick={() => setInviteOpen(true)}>
          + Invite New Member
        </StyledLink>
      </Box>
      <StyledBox>
        <StyledTableContainer>
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
              {sorterdData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>
                    {roleToHumanReadable(row.role)}
                  </StyledTableCell>
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

                    {row.role !== "OWNER" && (
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          setConfirmDeleteOpen(true);
                          setMemberToDelete(row.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      </StyledBox>
      <Modal
        // TODO: Fix deprecated api
        BackdropProps={{
          style: {
            backgroundColor: "#27150C",
            opacity: 0.8
          }
        }}
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Invite
          onInvite={(name, email, role) => {
            setInviteOpen(false);
            onInvite && onInvite({ name, email, role });
          }}
        />
      </Modal>
      <Modal
        BackdropProps={{
          style: {
            backgroundColor: "#27150C",
            opacity: 0.8
          }
        }}
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <ConfirmationForm
          title="Remove Member"
          description="Are you sure you want to remove this member from your workspace? This action cannot be undone."
          confirmationText="DELETE"
          onCancel={() => setConfirmDeleteOpen(false)}
          onConfirm={() => {
            setConfirmDeleteOpen(false);
            memberToDelete && onDelete(memberToDelete);
            setMemberToDelete(null);
          }}
        />
      </Modal>
    </>
  );
};
