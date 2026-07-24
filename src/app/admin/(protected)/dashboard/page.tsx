import { prisma } from "@/lib/prisma";
import {
  computeBestWorstTrades,
  computeDashboardMetrics,
  getRecentSignals,
} from "@/lib/signal-metrics";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { InstrumentFilter } from "@/components/dashboard/instrument-filter";
import { RefreshButton } from "@/components/site/refresh-button";
import type { InstrumentLiteral } from "@/lib/instruments";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ instrument?: string }>;
}) {
  const { instrument } = await searchParams;
  const allSignals = await prisma.signal.findMany({ orderBy: { signalTime: "asc" } });
  const signals = instrument
    ? allSignals.filter((s) => s.instrument === (instrument as InstrumentLiteral))
    : allSignals;
  const metrics = computeDashboardMetrics(signals);
  const bestWorst = computeBestWorstTrades(signals);
  const recentSignals = getRecentSignals(signals);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">Performance Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Live analytics computed from every signal in the database.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <InstrumentFilter />
          <RefreshButton />
        </div>
      </div>
      <DashboardContent metrics={metrics} bestWorst={bestWorst} recentSignals={recentSignals} />
    </div>
  );
}
