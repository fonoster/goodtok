/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
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
  AddWorkspaceMemberRequest,
  Member,
  WorkspaceMemberRole,
  WorkspaceMemberStatus
} from "./types";
import { Context } from "../context";
import { getLogger } from "@fonoster/logger";
import {
  WorkspaceMemberStatus as PrismaWorkspaceMemberStatus,
  WorkspaceMemberRole as PrismaWorkspaceMemberRole
} from "@prisma/client";
import { customAlphabet } from "nanoid";
import { sendInvite } from "../notifications/sendInvite";
import { getGravatarURL } from "../users/getGravatar";

const logger = getLogger({ service: "apiserver", filePath: __filename });

function toMember(
  userId: string,
  request: AddWorkspaceMemberRequest,
  member: {
    id: string;
    status: PrismaWorkspaceMemberStatus;
    role: PrismaWorkspaceMemberRole;
  }
): Member {
  return {
    id: member.id,
    name: request.name,
    email: request.email,
    status: member.status as WorkspaceMemberStatus,
    userId,
    role: member.role as WorkspaceMemberRole,
    createdAt: new Date()
  };
}

export async function addWorkspaceMember(
  ctx: Context,
  input: AddWorkspaceMemberRequest
): Promise<Member> {
  const { name, email, workspaceId, role } = input;

  logger.verbose("verifying if user exists", { email });

  let user = await ctx.prisma.user.findUnique({
    where: {
      email: input.email
    }
  });

  let oneTimePassword: string;

  if (!user) {
    oneTimePassword = customAlphabet("1234567890abcdef", 10)();
    // Let's create a new user with a one time password
    logger.verbose("user does not exists, creating a new one", {
      email
    });

    user = await ctx.prisma.user.create({
      data: {
        email,
        name,
        avatar: getGravatarURL(email),
        password: oneTimePassword
      }
    });
  }

  // Let's see if the user is already a member of the workspace
  logger.verbose("verifying if user is already a member", {
    email,
    workspaceId
  });

  const member = await ctx.prisma.workspaceMember.findFirst({
    where: {
      userId: user.id,
      workspaceId
    }
  });

  if (member) {
    logger.verbose("user is already a member", {
      email,
      workspaceId
    });

    return toMember(user.id, input, member);
  }

  // Let's add the user to the workspace
  logger.verbose("adding user to workspace", {
    email,
    workspaceId,
    role
  });

  const newMember = await ctx.prisma.workspaceMember.create({
    data: {
      userId: user.id,
      workspaceId: input.workspaceId,
      role: role as WorkspaceMemberRole,
      status: WorkspaceMemberStatus.PENDING
    },
    include: {
      workspace: true
    }
  });

  sendInvite({
    recipient: email,
    oneTimePassword,
    workspaceId,
    workspaceName: newMember.workspace.name
  }).catch((err) => {
    logger.error(err);
  });

  return toMember(user.id, input, newMember);
}
