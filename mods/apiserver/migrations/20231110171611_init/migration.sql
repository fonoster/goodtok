/*
  Warnings:

  - You are about to alter the column `aor` on the `queue_entries` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(323)`.
  - You are about to alter the column `access_token` on the `shopify_accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `store_domain` on the `shopify_accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `avatar` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `workspaces` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `calendar_url` on the `workspaces` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterEnum
ALTER TYPE "workspace_member_role" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "queue_entries" ALTER COLUMN "aor" SET DATA TYPE VARCHAR(323);

-- AlterTable
ALTER TABLE "shopify_accounts" ALTER COLUMN "access_token" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "store_domain" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "avatar" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "workspaces" ALTER COLUMN "name" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "calendar_url" SET DATA TYPE VARCHAR(255);
