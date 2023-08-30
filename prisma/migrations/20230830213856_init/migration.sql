/*
  Warnings:

  - You are about to drop the column `purchasedAt` on the `PurchaseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `PurchaseHistory` table. All the data in the column will be lost.
  - Added the required column `price` to the `PurchaseHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseHistory" DROP COLUMN "purchasedAt",
DROP COLUMN "totalPrice",
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "purchased_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
