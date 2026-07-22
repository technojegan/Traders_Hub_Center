import type { OptionType, Signal, SignalStatus } from "@prisma/client";

export function calcPnlPercent(entryPrice: number, sellPrice: number): number {
  return ((sellPrice - entryPrice) / entryPrice) * 100;
}

export function deriveStatus(input: {
  entryPrice: number;
  stopLoss: number;
  targets: number[];
  sellPrice: number | null | undefined;
}): SignalStatus {
  const { entryPrice, stopLoss, targets, sellPrice } = input;
  if (sellPrice == null) return "OPEN";

  const bestTarget = targets.length > 0 ? Math.max(...targets) : null;
  const isBuy = (bestTarget ?? entryPrice) >= entryPrice;

  if (bestTarget != null) {
    const hitTarget = isBuy ? sellPrice >= bestTarget : sellPrice <= bestTarget;
    if (hitTarget) return "TARGET_HIT";
  }

  const hitStopLoss = isBuy ? sellPrice <= stopLoss : sellPrice >= stopLoss;
  if (hitStopLoss) return "SL_HIT";

  return "CLOSED_MANUAL";
}

export type SignalForMetrics = Pick<
  Signal,
  "id" | "optionType" | "pnlPercent" | "status" | "signalTime"
>;

export interface DashboardMetrics {
  totalSignals: number;
  closedSignals: number;
  winRate: number;
  totalCapturePercent: number;
  avgPercentPerTrade: number;
  bestTradePercent: number | null;
  worstTradePercent: number | null;
  ceCount: number;
  peCount: number;
  ceWinRate: number;
  peWinRate: number;
  cumulativeSeries: { date: string; cumulativePercent: number }[];
  winLossByDay: {
    date: string;
    profitPercent: number;
    lossPercent: number;
    netPercent: number;
  }[];
  winCount: number;
  lossCount: number;
  totalGainPercent: number;
  totalLossPercent: number;
}

function winRateOf(signals: SignalForMetrics[]): number {
  const closed = signals.filter((s) => s.pnlPercent != null);
  if (closed.length === 0) return 0;
  const wins = closed.filter((s) => (s.pnlPercent ?? 0) > 0).length;
  return (wins / closed.length) * 100;
}

export function computeDashboardMetrics(signals: SignalForMetrics[]): DashboardMetrics {
  const closed = signals.filter((s) => s.pnlPercent != null);
  const ce = signals.filter((s) => s.optionType === ("CE" as OptionType));
  const pe = signals.filter((s) => s.optionType === ("PE" as OptionType));

  const totalCapturePercent = closed.reduce((sum, s) => sum + (s.pnlPercent ?? 0), 0);
  const avgPercentPerTrade = closed.length > 0 ? totalCapturePercent / closed.length : 0;

  const percents = closed.map((s) => s.pnlPercent ?? 0);
  const bestTradePercent = percents.length > 0 ? Math.max(...percents) : null;
  const worstTradePercent = percents.length > 0 ? Math.min(...percents) : null;
  const winCount = closed.filter((s) => (s.pnlPercent ?? 0) > 0).length;
  const lossCount = closed.length - winCount;
  const totalGainPercent = percents.filter((p) => p > 0).reduce((sum, p) => sum + p, 0);
  const totalLossPercent = percents.filter((p) => p <= 0).reduce((sum, p) => sum + p, 0);

  const sortedClosed = [...closed].sort(
    (a, b) => new Date(a.signalTime).getTime() - new Date(b.signalTime).getTime(),
  );

  let running = 0;
  const cumulativeSeries = sortedClosed.map((s) => {
    running += s.pnlPercent ?? 0;
    return {
      date: new Date(s.signalTime).toISOString().slice(0, 10),
      cumulativePercent: Math.round(running * 100) / 100,
    };
  });

  const byDay = new Map<string, { profitPercent: number; lossPercent: number }>();
  for (const s of sortedClosed) {
    const day = new Date(s.signalTime).toISOString().slice(0, 10);
    const entry = byDay.get(day) ?? { profitPercent: 0, lossPercent: 0 };
    const pnl = s.pnlPercent ?? 0;
    if (pnl > 0) entry.profitPercent += pnl;
    else entry.lossPercent += pnl;
    byDay.set(day, entry);
  }
  const winLossByDay = Array.from(byDay.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, v]) => {
      const profitPercent = Math.round(v.profitPercent * 100) / 100;
      const lossPercent = Math.round(v.lossPercent * 100) / 100;
      return {
        date,
        profitPercent,
        lossPercent,
        netPercent: Math.round((profitPercent + lossPercent) * 100) / 100,
      };
    });

  return {
    totalSignals: signals.length,
    closedSignals: closed.length,
    winRate: winRateOf(signals),
    totalCapturePercent,
    avgPercentPerTrade,
    bestTradePercent,
    worstTradePercent,
    ceCount: ce.length,
    peCount: pe.length,
    ceWinRate: winRateOf(ce),
    peWinRate: winRateOf(pe),
    cumulativeSeries,
    winLossByDay,
    winCount,
    lossCount,
    totalGainPercent,
    totalLossPercent,
  };
}

export function computeBestWorstTrades<
  T extends Pick<Signal, "strike" | "optionType" | "pnlPercent" | "signalTime">,
>(signals: T[], n = 5) {
  const closed = signals.filter((s) => s.pnlPercent != null);
  return [...closed]
    .sort((a, b) => (b.pnlPercent ?? 0) - (a.pnlPercent ?? 0))
    .filter((_, i, arr) => i < n || i >= arr.length - n)
    .map((s) => ({
      label: new Date(s.signalTime).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      pnlPercent: Math.round((s.pnlPercent ?? 0) * 100) / 100,
    }));
}

export function getRecentSignals<T extends Pick<Signal, "signalTime">>(
  signals: T[],
  n = 6,
): T[] {
  return [...signals]
    .sort((a, b) => new Date(b.signalTime).getTime() - new Date(a.signalTime).getTime())
    .slice(0, n);
}
