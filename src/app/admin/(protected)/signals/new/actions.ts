"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calcPnlPercent, deriveStatus } from "@/lib/signal-metrics";

export interface SignalInput {
  strike: number;
  optionType: "CE" | "PE";
  entryPrice: number;
  stopLoss: number;
  targets: number[];
  priceAtSignal: number;
  sellPrice: number | null;
  rawMessage: string;
}

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    throw new Error("Not authenticated");
  }
}

function toSignalCreateData(input: SignalInput) {
  const status = deriveStatus({
    entryPrice: input.entryPrice,
    stopLoss: input.stopLoss,
    targets: input.targets,
    sellPrice: input.sellPrice,
  });
  const pnlPercent =
    input.sellPrice != null ? calcPnlPercent(input.entryPrice, input.sellPrice) : null;

  return {
    strike: input.strike,
    optionType: input.optionType,
    entryPrice: input.entryPrice,
    stopLoss: input.stopLoss,
    targets: input.targets,
    priceAtSignal: input.priceAtSignal,
    sellPrice: input.sellPrice,
    rawMessage: input.rawMessage,
    status,
    pnlPercent,
    closedTime: input.sellPrice != null ? new Date() : null,
  };
}

export async function createSignals(inputs: SignalInput[]) {
  await requireAdmin();

  if (inputs.length === 0) {
    return { success: false, error: "No signals to save." };
  }

  await prisma.signal.createMany({
    data: inputs.map(toSignalCreateData),
  });

  revalidatePath("/signals");
  revalidatePath("/admin/dashboard");
  revalidatePath("/");

  return { success: true };
}
