/*
  Warnings:

  - You are about to drop the column `bookID` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,book_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `book_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_bookID_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userID_fkey";

-- DropIndex
DROP INDEX "Order_userID_bookID_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "bookID",
DROP COLUMN "userID",
ADD COLUMN     "book_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_user_id_book_id_key" ON "Order"("user_id", "book_id");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
