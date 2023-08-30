/*
  Warnings:

  - You are about to drop the column `bookId` on the `PurchaseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PurchaseHistory` table. All the data in the column will be lost.
  - Added the required column `book_id` to the `PurchaseHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `PurchaseHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PurchaseHistory" DROP CONSTRAINT "PurchaseHistory_bookId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseHistory" DROP CONSTRAINT "PurchaseHistory_userId_fkey";

-- DropIndex
DROP INDEX "PurchaseHistory_userId_idx";

-- AlterTable
ALTER TABLE "PurchaseHistory" DROP COLUMN "bookId",
DROP COLUMN "userId",
ADD COLUMN     "book_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "PurchaseHistory_user_id_idx" ON "PurchaseHistory"("user_id");

-- AddForeignKey
ALTER TABLE "PurchaseHistory" ADD CONSTRAINT "PurchaseHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseHistory" ADD CONSTRAINT "PurchaseHistory_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
