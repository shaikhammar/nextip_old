/*
  Warnings:

  - You are about to alter the column `currencyId` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(191)`.
  - You are about to alter the column `currencyId` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(191)`.
  - The primary key for the `Currency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `currencyId` on the `Currency` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(191)`.
  - The primary key for the `ExchangeRate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `currencyId` on the `ExchangeRate` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(191)`.
  - You are about to alter the column `exchangeRateId` on the `ExchangeRate` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_currencyId_fkey`;

-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_currencyId_fkey`;

-- DropForeignKey
ALTER TABLE `ExchangeRate` DROP FOREIGN KEY `ExchangeRate_currencyId_fkey`;

-- AlterTable
ALTER TABLE `Account` MODIFY `currencyId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Client` MODIFY `currencyId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Currency` DROP PRIMARY KEY,
    MODIFY `currencyId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`currencyId`);

-- AlterTable
ALTER TABLE `ExchangeRate` DROP PRIMARY KEY,
    MODIFY `currencyId` VARCHAR(191) NOT NULL,
    MODIFY `exchangeRateId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`exchangeRateId`);

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`currencyId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`currencyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExchangeRate` ADD CONSTRAINT `ExchangeRate_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`currencyId`) ON DELETE CASCADE ON UPDATE CASCADE;
