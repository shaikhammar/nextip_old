/*
  Warnings:

  - You are about to alter the column `status` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - You are about to drop the column `amount` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `amountReceived` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invoice` MODIFY `status` ENUM('Draft', 'Sent', 'Paid', 'PartiallyPaid', 'Revised', 'Cancelled', 'Deleted') NOT NULL DEFAULT 'Draft';

-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `amount`,
    ADD COLUMN `amountReceived` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `clientId` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `notes` LONGTEXT NULL,
    ADD COLUMN `status` ENUM('Pending', 'Cancelled', 'Failed', 'Completed', 'PartiallyRefunded', 'Refunded', 'PartiallyUnpaid', 'Deleted') NOT NULL,
    ADD COLUMN `transactionId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`clientId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
