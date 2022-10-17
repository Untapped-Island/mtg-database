-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "full" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Color_full_key" ON "Color"("full");
