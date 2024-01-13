/*
  Warnings:

  - You are about to drop the column `cartId` on the `CartProduct` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[invoice]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `CartProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CartProduct` DROP FOREIGN KEY `CartProduct_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_cartId_fkey`;

-- AlterTable
ALTER TABLE `CartProduct` DROP COLUMN `cartId`,
    ADD COLUMN `userId` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `cartId`,
    ADD COLUMN `description` VARCHAR(255) NULL,
    ADD COLUMN `invoice` VARCHAR(255) NOT NULL,
    ADD COLUMN `status` ENUM('BATAL', 'PROSES', 'SUKSES') NOT NULL DEFAULT 'PROSES',
    ADD COLUMN `userId` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `address` VARCHAR(500) NULL,
    ADD COLUMN `phoneNumber` VARCHAR(20) NULL,
    ADD COLUMN `role` ENUM('GUEST', 'USER', 'ADMIN') NOT NULL DEFAULT 'GUEST',
    ADD COLUMN `token` VARCHAR(255) NULL,
    MODIFY `name` VARCHAR(100) NULL,
    MODIFY `password` VARCHAR(255) NULL;

-- DropTable
DROP TABLE `Cart`;

-- DropTable
DROP TABLE `Notification`;

-- CreateTable
CREATE TABLE `Order_item` (
    `id` VARCHAR(100) NOT NULL,
    `productId` VARCHAR(100) NOT NULL,
    `orderId` VARCHAR(100) NOT NULL,
    `quantity` SMALLINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Order_invoice_key` ON `Order`(`invoice`);

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_item` ADD CONSTRAINT `Order_item_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_item` ADD CONSTRAINT `Order_item_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
