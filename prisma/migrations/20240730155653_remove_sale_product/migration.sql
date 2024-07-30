-- AlterTable
ALTER TABLE `Product` ADD COLUMN `categoryId` VARCHAR(100) NULL,
    ADD COLUMN `purchasePrice` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
