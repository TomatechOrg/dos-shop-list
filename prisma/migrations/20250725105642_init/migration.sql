-- CreateTable
CREATE TABLE "ListItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "count" INTEGER NOT NULL,

    CONSTRAINT "ListItem_pkey" PRIMARY KEY ("id")
);
