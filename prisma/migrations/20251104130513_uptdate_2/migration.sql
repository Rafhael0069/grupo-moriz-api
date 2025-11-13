/*
  Warnings:

  - Added the required column `name` to the `silo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `silo_level_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."silo" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."silo_level_data" ADD COLUMN     "name" TEXT NOT NULL;
