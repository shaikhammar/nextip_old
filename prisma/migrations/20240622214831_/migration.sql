/*
  Warnings:

  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `companyId` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(191)`.
  - You are about to drop the column `accountId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `amountReceived` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvoiceLineItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[exchangeRateId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[exchangeRateId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankAccountId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exchangeRateId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_currencyId_fkey`;

-- DropForeignKey
ALTER TABLE `InvoiceLineItem` DROP FOREIGN KEY `InvoiceLineItem_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_accountId_fkey`;

-- AlterTable
ALTER TABLE `Client` ADD COLUMN `companyId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Company` DROP PRIMARY KEY,
    MODIFY `companyId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`companyId`);

-- AlterTable
ALTER TABLE `ExchangeRate` MODIFY `date` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `rate` DECIMAL(9, 2) NOT NULL DEFAULT 1.00;

-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `companyId` VARCHAR(191) NOT NULL,
    ADD COLUMN `exchangeRateId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `accountId`,
    DROP COLUMN `amountReceived`,
    ADD COLUMN `amount` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `bankAccountId` VARCHAR(191) NOT NULL,
    ADD COLUMN `companyId` VARCHAR(191) NOT NULL,
    ADD COLUMN `exchangeRateId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Account`;

-- DropTable
DROP TABLE `InvoiceLineItem`;

-- CreateTable
CREATE TABLE `BankAccount` (
    `bankAccountId` VARCHAR(191) NOT NULL,
    `type` ENUM('Checking', 'Savings', 'Paypal', 'Venmo', 'Other') NULL DEFAULT 'Checking',
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `openingBalance` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `balance` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `isDisabled` BOOLEAN NOT NULL DEFAULT false,
    `disabledAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `currencyId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`bankAccountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvoiceItem` (
    `invoiceItemId` VARCHAR(191) NOT NULL,
    `itemOrder` INTEGER NOT NULL,
    `invoiceId` VARCHAR(191) NOT NULL,
    `itemDescription` LONGTEXT NOT NULL,
    `itemUnitCost` DECIMAL(10, 2) NOT NULL,
    `itemQuantity` DECIMAL(10, 2) NOT NULL,
    `itemTotal` DECIMAL(10, 2) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`invoiceItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Company_name_key` ON `Company`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Invoice_exchangeRateId_key` ON `Invoice`(`exchangeRateId`);

-- CreateIndex
CREATE UNIQUE INDEX `Payment_exchangeRateId_key` ON `Payment`(`exchangeRateId`);

-- AddForeignKey
ALTER TABLE `BankAccount` ADD CONSTRAINT `BankAccount_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`companyId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `BankAccount` ADD CONSTRAINT `BankAccount_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`currencyId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`companyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_exchangeRateId_fkey` FOREIGN KEY (`exchangeRateId`) REFERENCES `ExchangeRate`(`exchangeRateId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`companyId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `InvoiceItem` ADD CONSTRAINT `InvoiceItem_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`invoiceId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_exchangeRateId_fkey` FOREIGN KEY (`exchangeRateId`) REFERENCES `ExchangeRate`(`exchangeRateId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_bankAccountId_fkey` FOREIGN KEY (`bankAccountId`) REFERENCES `BankAccount`(`bankAccountId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`companyId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
