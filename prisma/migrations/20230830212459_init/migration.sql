/*
  Warnings:

  - You are about to drop the column `userId` on the `Point` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Point` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_userId_fkey";

-- DropIndex
DROP INDEX "Point_userId_key";

-- AlterTable
ALTER TABLE "Point" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Point_user_id_key" ON "Point"("user_id");

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
