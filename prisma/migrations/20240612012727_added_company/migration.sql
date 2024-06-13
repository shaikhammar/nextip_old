-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NULL,
    `address` LONGTEXT NULL,
    `logo` VARCHAR(191) NULL,
    `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NULL,
    `isDisabled` BOOLEAN NOT NULL DEFAULT false,
    `disabledAt` TIMESTAMP(6) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` TIMESTAMP(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
