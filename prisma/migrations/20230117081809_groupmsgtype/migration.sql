/*
  Warnings:

  - Added the required column `group` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Message` ADD COLUMN `group` INTEGER NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'dm';
