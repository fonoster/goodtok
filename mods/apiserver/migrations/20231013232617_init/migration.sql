-- CreateTable
CREATE TABLE "shopify_accounts" (
    "id" TEXT NOT NULL,
    "shopify_token" TEXT NOT NULL,
    "shopify_store" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shopify_accounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shopify_accounts" ADD CONSTRAINT "shopify_accounts_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
