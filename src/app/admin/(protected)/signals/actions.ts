"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calcPnlPercent, deriveStatus } from "@/lib/signal-metrics";
import { formatSignalUpdateMessage, sendTelegramMessage } from "@/lib/telegram";

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    throw new Error("Not authenticated");
  }
}

export async function closeSignal(id: string, sellPrice: number) {
  await requireAdmin();

  const signal = await prisma.signal.findUnique({ where: { id } });
  if (!signal) {
    return { success: false, error: "Signal not found." };
  }

  const pnlPercent = calcPnlPercent(signal.entryPrice, sellPrice);
  const status = deriveStatus({
    entryPrice: signal.entryPrice,
    stopLoss: signal.stopLoss,
    targets: signal.targets,
    sellPrice,
  });

  await prisma.signal.update({
    where: { id },
    data: { sellPrice, pnlPercent, status, closedTime: new Date() },
  });

  await sendTelegramMessage(
    formatSignalUpdateMessage({
      strike: signal.strike,
      optionType: signal.optionType,
      sellPrice,
      pnlPercent,
      status,
    }),
  );

  revalidatePath("/admin/signals");
  revalidatePath("/signals");
  revalidatePath("/dashboard");
  revalidatePath("/admin/dashboard");
  revalidatePath("/");

  return { success: true };
}
