/*
  Warnings:

  - You are about to alter the column `status` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Invoice` MODIFY `status` ENUM('DRAFT', 'SENT', 'PAID', 'REVISED', 'CANCELED', 'DELETED') NOT NULL DEFAULT 'DRAFT';
