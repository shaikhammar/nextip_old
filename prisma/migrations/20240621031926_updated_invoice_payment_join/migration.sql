/*
  Warnings:

  - You are about to drop the `_InvoiceToPayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_InvoiceToPayment` DROP FOREIGN KEY `_InvoiceToPayment_A_fkey`;

-- DropForeignKey
ALTER TABLE `_InvoiceToPayment` DROP FOREIGN KEY `_InvoiceToPayment_B_fkey`;

-- DropTable
DROP TABLE `_InvoiceToPayment`;

-- CreateTable
CREATE TABLE `PaymentInvoice` (
    `paymentInvoiceId` VARCHAR(191) NOT NULL,
    `paymentId` VARCHAR(191) NOT NULL,
    `invoiceId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`paymentInvoiceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentInvoice` ADD CONSTRAINT `PaymentInvoice_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`paymentId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PaymentInvoice` ADD CONSTRAINT `PaymentInvoice_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`invoiceId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
