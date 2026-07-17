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
  winLossByDay: { date: string; wins: number; losses: number }[];
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

  const byDay = new Map<string, { wins: number; losses: number }>();
  for (const s of sortedClosed) {
    const day = new Date(s.signalTime).toISOString().slice(0, 10);
    const entry = byDay.get(day) ?? { wins: 0, losses: 0 };
    if ((s.pnlPercent ?? 0) > 0) entry.wins += 1;
    else entry.losses += 1;
    byDay.set(day, entry);
  }
  const winLossByDay = Array.from(byDay.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, v]) => ({ date, ...v }));

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
  };
}
