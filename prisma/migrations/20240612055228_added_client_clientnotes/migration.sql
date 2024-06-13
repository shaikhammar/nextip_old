-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,
    `code` VARCHAR(6) NOT NULL,
    `address` LONGTEXT NULL,
    `email` VARCHAR(50) NULL,
    `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NULL,
    `isDisabled` BOOLEAN NOT NULL DEFAULT false,
    `disabledAt` TIMESTAMP(6) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` TIMESTAMP(6) NULL,

    UNIQUE INDEX `Client_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientNote` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `note` LONGTEXT NOT NULL,
    `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `clientId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClientNote` ADD CONSTRAINT `ClientNote_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
