import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface SignalCardData {
  id: string;
  strike: number;
  optionType: "CE" | "PE";
  entryPrice: number;
  stopLoss: number;
  targets: number[];
  sellPrice: number | null;
  pnlPercent: number | null;
  status: "OPEN" | "TARGET_HIT" | "SL_HIT" | "CLOSED_MANUAL";
  signalTime: string | Date;
}

const STATUS_LABEL: Record<SignalCardData["status"], string> = {
  OPEN: "Open",
  TARGET_HIT: "Target Hit",
  SL_HIT: "SL Hit",
  CLOSED_MANUAL: "Closed",
};

export function SignalCard({ signal }: { signal: SignalCardData }) {
  const isWin = signal.pnlPercent != null && signal.pnlPercent > 0;
  const isLoss = signal.pnlPercent != null && signal.pnlPercent < 0;

  const borderClass = isWin
    ? "thc-win-border"
    : isLoss
      ? "thc-loss-border"
      : "thc-neutral-border";

  const pnlClass = isWin
    ? "text-[var(--thc-win)]"
    : isLoss
      ? "text-[var(--thc-loss)]"
      : "text-primary";

  return (
    <div
      className={cn(
        "thc-glass thc-glow flex flex-col gap-2.5 rounded-xl border p-3.5",
        borderClass,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="font-heading text-base font-bold leading-none">
            {signal.strike}
          </span>
          <Badge
            variant="outline"
            className={cn(
              "px-1.5 py-0 text-[10px] font-bold",
              signal.optionType === "CE"
                ? "border-[var(--thc-win)]/50 text-[var(--thc-win)]"
                : "border-[var(--thc-loss)]/50 text-[var(--thc-loss)]",
            )}
          >
            {signal.optionType}
          </Badge>
        </div>
        <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {STATUS_LABEL[signal.status]}
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Entry</dt>
          <dd className="font-medium">{signal.entryPrice}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">SL</dt>
          <dd className="font-medium">{signal.stopLoss}</dd>
        </div>
        <div className="flex justify-between col-span-2">
          <dt className="text-muted-foreground">Target{signal.targets.length > 1 ? "s" : ""}</dt>
          <dd className="font-medium">{signal.targets.join(", ")}</dd>
        </div>
        <div className="flex justify-between col-span-2">
          <dt className="text-muted-foreground">Sell Price</dt>
          <dd className="font-medium">{signal.sellPrice ?? "—"}</dd>
        </div>
      </dl>

      <div className="mt-1 flex items-center justify-between border-t border-white/5 pt-2">
        <time className="text-[10px] text-muted-foreground">
          {new Date(signal.signalTime).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })}
        </time>
        <span className={cn("font-heading text-lg font-bold leading-none", pnlClass)}>
          {signal.pnlPercent != null
            ? `${signal.pnlPercent > 0 ? "+" : ""}${signal.pnlPercent.toFixed(1)}%`
            : "—"}
        </span>
      </div>
    </div>
  );
}
