/*
  Warnings:

  - You are about to drop the column `customerID` on the `Order` table. All the data in the column will be lost.
  - Added the required column `userID` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerID_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerID",
ADD COLUMN     "userID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
