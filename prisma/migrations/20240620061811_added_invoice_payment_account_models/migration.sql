/*
 Warnings:
 
 - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
 - You are about to drop the column `id` on the `Client` table. All the data in the column will be lost.
 - The primary key for the `ClientNote` table will be changed. If it partially fails, the table could be left without primary key constraint.
 - You are about to drop the column `id` on the `ClientNote` table. All the data in the column will be lost.
 - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
 - You are about to drop the column `id` on the `Company` table. All the data in the column will be lost.
 - The primary key for the `Currency` table will be changed. If it partially fails, the table could be left without primary key constraint.
 - You are about to drop the column `id` on the `Currency` table. All the data in the column will be lost.
 - The primary key for the `ExchangeRate` table will be changed. If it partially fails, the table could be left without primary key constraint.
 - You are about to drop the column `id` on the `ExchangeRate` table. All the data in the column will be lost.
 - Added the required column `clientId` to the `Client` table without a default value. This is not possible if the table is not empty.
 - Added the required column `clientNoteId` to the `ClientNote` table without a default value. This is not possible if the table is not empty.
 - Added the required column `companyId` to the `Company` table without a default value. This is not possible if the table is not empty.
 - Added the required column `currencyId` to the `Currency` table without a default value. This is not possible if the table is not empty.
 - Added the required column `exchangeRateId` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
 
 */
-- DropForeignKey
ALTER TABLE
    `Client` DROP FOREIGN KEY `Client_currencyId_fkey`;

-- DropForeignKey
ALTER TABLE
    `ClientNote` DROP FOREIGN KEY `ClientNote_clientId_fkey`;

-- DropForeignKey
ALTER TABLE
    `ExchangeRate` DROP FOREIGN KEY `ExchangeRate_currencyId_fkey`;

-- AlterTable
ALTER TABLE
    `Client` DROP PRIMARY KEY,
    DROP COLUMN `id`,
ADD
    COLUMN `clientId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
ADD
    PRIMARY KEY (`clientId`);

-- AlterTable
ALTER TABLE
    `ClientNote` DROP PRIMARY KEY,
    DROP COLUMN `id`,
ADD
    COLUMN `clientNoteId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
ADD
    PRIMARY KEY (`clientNoteId`);

-- AlterTable
ALTER TABLE
    `Company` DROP PRIMARY KEY,
    DROP COLUMN `id`,
ADD
    COLUMN `companyId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
ADD
    PRIMARY KEY (`companyId`);

-- AlterTable
ALTER TABLE
    `Currency` DROP PRIMARY KEY,
    DROP COLUMN `id`,
ADD
    COLUMN `currencyId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
ADD
    PRIMARY KEY (`currencyId`);

-- AlterTable
ALTER TABLE
    `ExchangeRate` DROP PRIMARY KEY,
    DROP COLUMN `id`,
ADD
    COLUMN `exchangeRateId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
ADD
    PRIMARY KEY (`exchangeRateId`);

-- CreateTable
CREATE TABLE `Account` (
    `accountId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `openingBalance` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `balance` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `isDisabled` BOOLEAN NOT NULL DEFAULT false,
    `disabledAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `currencyId` INTEGER UNSIGNED NOT NULL,
    PRIMARY KEY (`accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `invoiceId` VARCHAR(191) NOT NULL,
    `invoiceNumber` VARCHAR(191) NOT NULL,
    `invoiceDate` TIMESTAMP(6) NOT NULL,
    `poNumber` VARCHAR(191) NULL,
    `clientId` INTEGER UNSIGNED NOT NULL,
    `notes` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Draft',
    `invoiceTotal` DECIMAL(10, 2) NOT NULL,
    `baseCurrencyInvoiceTotal` DECIMAL(10, 2) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NULL,
    `deletedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    UNIQUE INDEX `Invoice_invoiceNumber_key`(`invoiceNumber`),
    PRIMARY KEY (`invoiceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvoiceLineItem` (
    `invoiceLineItemId` VARCHAR(191) NOT NULL,
    `itemOrder` INTEGER NOT NULL,
    `invoiceId` VARCHAR(191) NOT NULL,
    `itemDescription` LONGTEXT NOT NULL,
    `itemUnitCost` DECIMAL(10, 2) NOT NULL,
    `itemQuantity` DECIMAL(10, 2) NOT NULL,
    `itemTotal` DECIMAL(10, 2) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (`invoiceLineItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `paymentId` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `paymentDate` TIMESTAMP(6) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`paymentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_InvoiceToPayment` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,
    UNIQUE INDEX `_InvoiceToPayment_AB_unique`(`A`, `B`),
    INDEX `_InvoiceToPayment_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE
    `Account`
ADD
    CONSTRAINT `Account_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`currencyId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE
    `Client`
ADD
    CONSTRAINT `Client_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`currencyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `ClientNote`
ADD
    CONSTRAINT `ClientNote_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`clientId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `ExchangeRate`
ADD
    CONSTRAINT `ExchangeRate_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`currencyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `Invoice`
ADD
    CONSTRAINT `Invoice_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`clientId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE
    `InvoiceLineItem`
ADD
    CONSTRAINT `InvoiceLineItem_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`invoiceId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE
    `Payment`
ADD
    CONSTRAINT `Payment_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`accountId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE
    `_InvoiceToPayment`
ADD
    CONSTRAINT `_InvoiceToPayment_A_fkey` FOREIGN KEY (`A`) REFERENCES `Invoice`(`invoiceId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `_InvoiceToPayment`
ADD
    CONSTRAINT `_InvoiceToPayment_B_fkey` FOREIGN KEY (`B`) REFERENCES `Payment`(`paymentId`) ON DELETE CASCADE ON UPDATE CASCADE;