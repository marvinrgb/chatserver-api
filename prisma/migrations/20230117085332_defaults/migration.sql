-- AlterTable
ALTER TABLE `Message` MODIFY `recipient` INTEGER NOT NULL DEFAULT 0,
    MODIFY `group` INTEGER NOT NULL DEFAULT 0;
