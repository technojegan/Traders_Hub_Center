"use client";

import { useMemo, useState } from "react";
import { SignalCard, type SignalCardData } from "@/components/signals/signal-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OptionFilter = "ALL" | "CE" | "PE";
type ResultFilter = "ALL" | "WIN" | "LOSS" | "OPEN";
type SortOrder = "NEWEST" | "OLDEST";

export function SignalsExplorer({ signals }: { signals: SignalCardData[] }) {
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {filtered.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      )}
    </div>
  );
}
