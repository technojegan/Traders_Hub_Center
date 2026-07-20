"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface SignalRow {
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

const STATUS_LABEL: Record<SignalRow["status"], string> = {
  OPEN: "Open",
  TARGET_HIT: "Target Hit",
  SL_HIT: "SL Hit",
  CLOSED_MANUAL: "Closed",
};

type OptionFilter = "ALL" | "CE" | "PE";
type ResultFilter = "ALL" | "WIN" | "LOSS" | "OPEN";
type SortOrder = "NEWEST" | "OLDEST";

function outcomeClass(pnlPercent: number | null) {
  if (pnlPercent == null) return "border-l-[var(--thc-gold-start)]";
  if (pnlPercent > 0) return "border-l-[var(--thc-win)]";
  if (pnlPercent < 0) return "border-l-[var(--thc-loss)]";
  return "border-l-[var(--thc-gold-start)]";
}

export function SignalsExplorer({ signals }: { signals: SignalRow[] }) {
  const [optionFilter, setOptionFilter] = useState<OptionFilter>("ALL");
  const [resultFilter, setResultFilter] = useState<ResultFilter>("ALL");
  const [sortOrder, setSortOrder] = useState<SortOrder>("NEWEST");

  const filtered = useMemo(() => {
    let list = signals;

    if (optionFilter !== "ALL") {
      list = list.filter((s) => s.optionType === optionFilter);
    }

    if (resultFilter === "WIN") {
      list = list.filter((s) => s.pnlPercent != null && s.pnlPercent > 0);
    } else if (resultFilter === "LOSS") {
      list = list.filter((s) => s.pnlPercent != null && s.pnlPercent < 0);
    } else if (resultFilter === "OPEN") {
      list = list.filter((s) => s.status === "OPEN");
    }

    return [...list].sort((a, b) => {
      const diff = new Date(a.signalTime).getTime() - new Date(b.signalTime).getTime();
      return sortOrder === "NEWEST" ? -diff : diff;
    });
  }, [signals, optionFilter, resultFilter, sortOrder]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={optionFilter} onValueChange={(v) => setOptionFilter(v as OptionFilter)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="CE">CE only</SelectItem>
            <SelectItem value="PE">PE only</SelectItem>
          </SelectContent>
        </Select>

        <Select value={resultFilter} onValueChange={(v) => setResultFilter(v as ResultFilter)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Result" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Results</SelectItem>
            <SelectItem value="WIN">Wins</SelectItem>
            <SelectItem value="LOSS">Losses</SelectItem>
            <SelectItem value="OPEN">Open</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as SortOrder)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NEWEST">Newest first</SelectItem>
            <SelectItem value="OLDEST">Oldest first</SelectItem>
          </SelectContent>
        </Select>

        <span className="ml-auto text-sm text-muted-foreground">
          {filtered.length} signal{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No signals match these filters.
        </p>
      ) : (
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
                  <TableHead className="hidden lg:table-cell">Sell Price</TableHead>
                  <TableHead>P&amp;L %</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((signal) => {
                  const isWin = signal.pnlPercent != null && signal.pnlPercent > 0;
                  const isLoss = signal.pnlPercent != null && signal.pnlPercent < 0;
                  const pnlClass = isWin
                    ? "text-[var(--thc-win)]"
                    : isLoss
                      ? "text-[var(--thc-loss)]"
                      : "text-primary";

                  return (
                    <TableRow
                      key={signal.id}
                      className={cn(
                        "border-l-2 border-b-white/5 transition-colors hover:bg-white/[0.03]",
                        outcomeClass(signal.pnlPercent),
                      )}
                    >
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
                      <TableCell className="hidden lg:table-cell">
                        {signal.sellPrice ?? "—"}
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
      )}
    </div>
  );
}
