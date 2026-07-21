import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SignalRow } from "@/components/signals/signals-explorer";

export function OngoingSignals({ signals }: { signals: SignalRow[] }) {
  if (signals.length === 0) return null;

  return (
    <div className="thc-glass thc-neutral-border mb-8 rounded-2xl border p-4 sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
        <h2 className="font-heading text-sm font-semibold">
          {signals.length} Ongoing Trade{signals.length === 1 ? "" : "s"}
        </h2>
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
            {signals.map((signal) => (
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
                  {new Date(signal.signalTime).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
