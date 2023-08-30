/*
  Warnings:

  - A unique constraint covering the columns `[userID,bookID]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_userID_bookID_key" ON "Order"("userID", "bookID");
