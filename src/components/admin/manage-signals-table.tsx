"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { closeSignal } from "@/app/admin/(protected)/signals/actions";

export interface ManageSignalRow {
  id: string;
  strike: number;
  optionType: "CE" | "PE";
  entryPrice: number;
  stopLoss: number;
  targets: number[];
  sellPrice: number | null;
  pnlPercent: number | null;
  status: "OPEN" | "TARGET_HIT" | "SL_HIT" | "CLOSED_MANUAL";
  signalTime: string;
}

const STATUS_LABEL: Record<ManageSignalRow["status"], string> = {
  OPEN: "Open",
  TARGET_HIT: "Target Hit",
  SL_HIT: "SL Hit",
  CLOSED_MANUAL: "Closed",
};

function CloseTradeCell({ signal }: { signal: ManageSignalRow }) {
  const [sellPrice, setSellPrice] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleClose() {
    const value = parseFloat(sellPrice);
    if (!Number.isFinite(value)) {
      toast.error("Enter a valid sell price.");
      return;
    }
    startTransition(async () => {
      const result = await closeSignal(signal.id, value);
      if (result.success) {
        toast.success(`${signal.strike} ${signal.optionType} closed — update sent to Telegram.`);
      } else {
        toast.error(result.error ?? "Failed to close trade.");
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        value={sellPrice}
        onChange={(e) => setSellPrice(e.target.value)}
        placeholder="Sell price"
        className="h-8 w-24"
        inputMode="decimal"
      />
      <Button size="sm" className="thc-glow thc-btn-gradient h-8" disabled={isPending} onClick={handleClose}>
        {isPending ? "Closing…" : "Close"}
      </Button>
    </div>
  );
}

export function ManageSignalsTable({ signals }: { signals: ManageSignalRow[] }) {
  return (
    <div className="thc-glass overflow-hidden rounded-xl border border-white/5">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b-white/10 hover:bg-transparent">
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead>Strike</TableHead>
              <TableHead className="hidden sm:table-cell">Entry</TableHead>
              <TableHead className="hidden md:table-cell">SL</TableHead>
              <TableHead className="hidden md:table-cell">Target(s)</TableHead>
              <TableHead>Sell / Close</TableHead>
              <TableHead>P&amp;L %</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {signals.map((signal) => {
              const isWin = signal.pnlPercent != null && signal.pnlPercent > 0;
              const isLoss = signal.pnlPercent != null && signal.pnlPercent < 0;
              const pnlClass = isWin
                ? "text-[var(--thc-win)]"
                : isLoss
                  ? "text-[var(--thc-loss)]"
                  : "text-primary";

              return (
                <TableRow key={signal.id} className="border-b-white/5">
                  <TableCell className="hidden whitespace-nowrap text-muted-foreground sm:table-cell">
                    {new Date(signal.signalTime).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </TableCell>
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
                  <TableCell className="hidden sm:table-cell">{signal.entryPrice}</TableCell>
                  <TableCell className="hidden md:table-cell">{signal.stopLoss}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {signal.targets.join(", ")}
                  </TableCell>
                  <TableCell>
                    {signal.status === "OPEN" ? (
                      <CloseTradeCell signal={signal} />
                    ) : (
                      signal.sellPrice ?? "—"
                    )}
                  </TableCell>
                  <TableCell className={cn("font-heading font-bold", pnlClass)}>
                    {signal.pnlPercent != null
                      ? `${signal.pnlPercent > 0 ? "+" : ""}${signal.pnlPercent.toFixed(1)}%`
                      : "—"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {STATUS_LABEL[signal.status]}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
