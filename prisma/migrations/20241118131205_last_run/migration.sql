-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "lastRunAt" TIMESTAMP(3),
ADD COLUMN     "lastRunId" TEXT,
ADD COLUMN     "lastRunStatus" TEXT;
