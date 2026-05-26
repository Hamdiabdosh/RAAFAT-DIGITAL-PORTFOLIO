-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "architectureImage" TEXT,
ADD COLUMN     "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "liveUrl" TEXT,
ADD COLUMN     "nextSteps" TEXT,
ADD COLUMN     "technicalNotes" TEXT,
ADD COLUMN     "videoUrl" TEXT;
