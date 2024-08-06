/*
  Warnings:

  - Added the required column `productId` to the `OrderHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderHistory` ADD COLUMN `productId` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `totalSold` INTEGER NULL;
