/*
  Warnings:

  - You are about to drop the column `creditsCost` on the `ExecutionPhase` table. All the data in the column will be lost.
  - Added the required column `name` to the `ExecutionPhase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExecutionPhase" DROP COLUMN "creditsCost",
ADD COLUMN     "creditsConsumed" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL;
