/*
  Warnings:

  - Added the required column `currencyId` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` ADD COLUMN `balance` DECIMAL(9, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `currencyId` INTEGER UNSIGNED NOT NULL;

-- CreateTable
CREATE TABLE `Currency` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(3) NOT NULL,
    `name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Currency_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExchangeRate` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `date` TIMESTAMP(6) NOT NULL,
    `rate` DECIMAL(9, 2) NOT NULL,
    `currencyId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExchangeRate` ADD CONSTRAINT `ExchangeRate_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
