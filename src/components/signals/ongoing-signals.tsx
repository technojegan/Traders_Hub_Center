import { cn, formatSignalDate, formatSignalTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OngoingRiskRewardChart } from "@/components/admin/dashboard-charts";
import type { SignalRow } from "@/components/signals/signals-explorer";

function toRiskReward(signal: SignalRow) {
  const bestTarget = signal.targets.length > 0 ? Math.max(...signal.targets) : signal.entryPrice;
  const gainPercent = Math.abs(((bestTarget - signal.entryPrice) / signal.entryPrice) * 100);
  const lossPercent = -Math.abs(
    ((signal.stopLoss - signal.entryPrice) / signal.entryPrice) * 100,
  );
  return {
    label: `${signal.strike}${signal.optionType}`,
    buyPrice: signal.entryPrice,
    sellTargetPrice: bestTarget,
    sellSlPrice: signal.stopLoss,
    gainPercent: Math.round(gainPercent * 100) / 100,
    lossPercent: Math.round(lossPercent * 100) / 100,
  };
}

export function OngoingSignals({ signals }: { signals: SignalRow[] }) {
  const isEmpty = signals.length === 0;
  const chartData = signals.map(toRiskReward);
  const avgGain = chartData.length
    ? chartData.reduce((sum, d) => sum + d.gainPercent, 0) / chartData.length
    : 0;
  const avgLoss = chartData.length
    ? chartData.reduce((sum, d) => sum + d.lossPercent, 0) / chartData.length
    : 0;

  return (
    <div className="thc-glass thc-neutral-border mb-8 rounded-2xl border p-4 sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <span
          className={cn(
            "h-2 w-2 shrink-0 rounded-full",
            isEmpty ? "bg-muted-foreground/40" : "bg-primary",
          )}
        />
        <h2 className="font-heading text-sm font-semibold">
          {signals.length} Ongoing Trade{signals.length === 1 ? "" : "s"}
        </h2>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="thc-glass rounded-xl border border-white/5 p-3">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Avg Potential Gain
          </p>
          <p
            className={cn(
              "mt-1 font-heading text-lg font-bold",
              isEmpty ? "text-muted-foreground" : "text-[var(--thc-win)]",
            )}
          >
            {isEmpty ? "—" : `+${avgGain.toFixed(1)}%`}
          </p>
        </div>
        <div className="thc-glass rounded-xl border border-white/5 p-3">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Avg Potential Risk
          </p>
          <p
            className={cn(
              "mt-1 font-heading text-lg font-bold",
              isEmpty ? "text-muted-foreground" : "text-[var(--thc-loss)]",
            )}
          >
            {isEmpty ? "—" : `${avgLoss.toFixed(1)}%`}
          </p>
        </div>
        <div className="thc-glass col-span-2 rounded-xl border border-white/5 p-3 sm:col-span-1">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Open Positions
          </p>
          <p className="mt-1 font-heading text-lg font-bold thc-gold-text">{signals.length}</p>
        </div>
      </div>

      <div className="mb-4 rounded-xl border border-white/5 bg-black/10 p-3">
        {isEmpty ? (
          <div className="flex h-[140px] flex-col items-center justify-center gap-1 text-center">
            <p className="text-xs text-muted-foreground">
              No open trades right now — the risk/reward chart will populate once a signal goes
              live.
            </p>
          </div>
        ) : (
          <OngoingRiskRewardChart data={chartData} />
        )}
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b-white/10 hover:bg-transparent">
              <TableHead>Strike</TableHead>
              <TableHead>Entry</TableHead>
              <TableHead>SL</TableHead>
              <TableHead>Target(s)</TableHead>
              <TableHead>Since</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isEmpty ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={5}
                  className="py-6 text-center text-xs text-muted-foreground"
                >
                  No ongoing trades at the moment.
                </TableCell>
              </TableRow>
            ) : (
              signals.map((signal) => (
                <TableRow key={signal.id} className="border-b-white/5">
                  <TableCell className="whitespace-nowrap font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading font-bold">{signal.strike}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-1.5 py-0 text-[10px] font-bold",
                          signal.optionType === "CE"
                            ? "border-[var(--thc-ce)]/50 text-[var(--thc-ce)]"
                            : "border-[var(--thc-pe)]/50 text-[var(--thc-pe)]",
                        )}
                      >
                        {signal.optionType}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{signal.entryPrice}</TableCell>
                  <TableCell>{signal.stopLoss}</TableCell>
                  <TableCell>{signal.targets.join(", ")}</TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {formatSignalDate(signal.signalTime)} {formatSignalTime(signal.signalTime)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
