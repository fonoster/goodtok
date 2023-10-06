import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../mods/apiserver/src/utils";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
      username: "goodtok",
      email: "goodtok@goodtok.io",
      password: hashPassword("changeme"),
      name: "GoodTok"
    }
  });

  await prisma.user.create({
    data: {
      id: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc2",
      username: "member",
      email: "member@goodtok.io",
      password: hashPassword("changeme"),
      name: "GoodTok Member"
    },
  });

  await prisma.workspace.create({
    data: {
      id: "default",
      name: "Default",
      ownerId: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1"
    },
  });

  await prisma.workspaceMember.create({
    data: {
      userId: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
      workspaceId: "default",
      status: "ACTIVE",
      role: "MEMBER"
    },
  });

  await prisma.queueEntry.create({
    data: {
      customerId: "external-customer-id-1",
      workspaceId: "default",
      status: "ONLINE"
    },
  });

  await prisma.queueEntry.create({
    data: {
      customerId: "external-customer-id-2",
      workspaceId: "default",
      status: "OFFLINE"
    },
  });

  await prisma.queueEntry.create({
    data: {
      customerId: "external-customer-id-3",
      workspaceId: "default",
      status: "ONLINE"
    },
  });

  await prisma.queueEntry.create({
    data: {
      customerId: "external-customer-id-5",
      workspaceId: "default",
      status: "DEQUEUED"
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
