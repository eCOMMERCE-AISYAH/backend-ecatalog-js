/*
  Warnings:

  - You are about to drop the `Order_item` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `SubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CartProduct` DROP FOREIGN KEY `CartProduct_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Order_item` DROP FOREIGN KEY `Order_item_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `Order_item` DROP FOREIGN KEY `Order_item_productId_fkey`;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `slug` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `slug` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `SubCategory` ADD COLUMN `slug` VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE `Order_item`;

-- CreateTable
CREATE TABLE `OrderHistory` (
    `id` VARCHAR(100) NOT NULL,
    `productName` VARCHAR(100) NOT NULL,
    `subCategory` VARCHAR(50) NOT NULL,
    `quantity` SMALLINT NOT NULL,
    `price` INTEGER NOT NULL,
    `totalPrice` INTEGER NOT NULL,
    `productImage` VARCHAR(100) NOT NULL,
    `orderId` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Category_slug_key` ON `Category`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_slug_key` ON `Product`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `SubCategory_slug_key` ON `SubCategory`(`slug`);

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderHistory` ADD CONSTRAINT `OrderHistory_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
