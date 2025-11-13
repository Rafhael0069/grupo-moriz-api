/*
  Warnings:

  - You are about to drop the column `name` on the `silo_level_data` table. All the data in the column will be lost.
  - Added the required column `name` to the `environmental_metrics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."environmental_metrics" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."silo_level_data" DROP COLUMN "name";
