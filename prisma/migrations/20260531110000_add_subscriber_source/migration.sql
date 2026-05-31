-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN "source" TEXT;

-- CreateIndex
CREATE INDEX "Subscriber_source_idx" ON "Subscriber"("source");
