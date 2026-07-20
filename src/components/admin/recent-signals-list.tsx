import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface RecentSignalItem {
  id: string;
  strike: number;
  optionType: "CE" | "PE";
  pnlPercent: number | null;
  status: "OPEN" | "TARGET_HIT" | "SL_HIT" | "CLOSED_MANUAL";
  signalTime: string | Date;
}

const STATUS_LABEL: Record<RecentSignalItem["status"], string> = {
  OPEN: "Open",
  TARGET_HIT: "Target Hit",
  SL_HIT: "SL Hit",
  CLOSED_MANUAL: "Closed",
};

export function RecentSignalsList({ signals }: { signals: RecentSignalItem[] }) {
  return (
    <ul className="flex flex-col divide-y divide-white/5">
      {signals.map((signal) => {
        const isWin = signal.pnlPercent != null && signal.pnlPercent > 0;
        const isLoss = signal.pnlPercent != null && signal.pnlPercent < 0;
        const dotColor = isWin
          ? "bg-[var(--thc-win)]"
          : isLoss
            ? "bg-[var(--thc-loss)]"
            : "bg-primary";

        return (
          <li key={signal.id} className="flex items-center justify-between gap-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <span className={cn("h-2 w-2 shrink-0 rounded-full", dotColor)} />
              <span className="font-heading text-sm font-bold">{signal.strike}</span>
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
              <span className="text-xs text-muted-foreground">
                {STATUS_LABEL[signal.status]}
              </span>
            </div>
            <div className="flex items-center gap-3 text-right">
              <span
                className={cn(
                  "font-heading text-sm font-bold",
                  isWin
                    ? "text-[var(--thc-win)]"
                    : isLoss
                      ? "text-[var(--thc-loss)]"
                      : "text-muted-foreground",
                )}
              >
                {signal.pnlPercent != null
                  ? `${signal.pnlPercent > 0 ? "+" : ""}${signal.pnlPercent.toFixed(1)}%`
                  : "—"}
              </span>
              <span className="w-12 shrink-0 text-[11px] text-muted-foreground">
                {new Date(signal.signalTime).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
