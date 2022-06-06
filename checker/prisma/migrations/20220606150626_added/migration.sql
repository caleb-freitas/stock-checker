-- CreateTable
CREATE TABLE "CheckOrder" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "stock" TEXT NOT NULL,
    "targetPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CheckOrder_pkey" PRIMARY KEY ("id")
);
