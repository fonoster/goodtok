/*
  Warnings:

  - You are about to drop the column `shopify_store` on the `shopify_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `shopify_token` on the `shopify_accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[workspaceId]` on the table `shopify_accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `access_token` to the `shopify_accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `shopify_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "shopify_accounts" DROP CONSTRAINT "shopify_accounts_workspaceId_fkey";

-- AlterTable
ALTER TABLE "shopify_accounts" DROP COLUMN "shopify_store",
DROP COLUMN "shopify_token",
ADD COLUMN     "access_token" TEXT NOT NULL,
ADD COLUMN     "store_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "shopify_accounts_workspaceId_key" ON "shopify_accounts"("workspaceId");

-- AddForeignKey
ALTER TABLE "shopify_accounts" ADD CONSTRAINT "shopify_accounts_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
