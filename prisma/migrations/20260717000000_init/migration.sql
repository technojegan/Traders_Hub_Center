-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "OptionType" AS ENUM ('CE', 'PE');

-- CreateEnum
CREATE TYPE "SignalStatus" AS ENUM ('OPEN', 'TARGET_HIT', 'SL_HIT', 'CLOSED_MANUAL');

-- CreateEnum
CREATE TYPE "SubscriberPlan" AS ENUM ('PREMIUM');

-- CreateTable
CREATE TABLE "Signal" (
    "id" TEXT NOT NULL,
    "strike" INTEGER NOT NULL,
    "optionType" "OptionType" NOT NULL,
    "entryPrice" DOUBLE PRECISION NOT NULL,
    "stopLoss" DOUBLE PRECISION NOT NULL,
    "targets" DOUBLE PRECISION[],
    "priceAtSignal" DOUBLE PRECISION NOT NULL,
    "sellPrice" DOUBLE PRECISION,
    "status" "SignalStatus" NOT NULL DEFAULT 'OPEN',
    "pnlPercent" DOUBLE PRECISION,
    "signalTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedTime" TIMESTAMP(3),
    "rawMessage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Signal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "plan" "SubscriberPlan" NOT NULL DEFAULT 'PREMIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Signal_signalTime_idx" ON "Signal"("signalTime");

-- CreateIndex
CREATE INDEX "Signal_status_idx" ON "Signal"("status");

