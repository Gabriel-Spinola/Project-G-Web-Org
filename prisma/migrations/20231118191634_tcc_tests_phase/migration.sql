-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "parentCommentId" INTEGER;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "files" TEXT[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "image" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
