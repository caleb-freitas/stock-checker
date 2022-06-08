-- CreateEnum
CREATE TYPE "CheckOrderStatus" AS ENUM ('Checking', 'Checked');

-- AlterTable
ALTER TABLE "CheckOrder" ADD COLUMN     "status" "CheckOrderStatus" NOT NULL DEFAULT E'Checking',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
