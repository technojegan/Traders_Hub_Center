import { prisma } from "@/lib/prisma";
import {
  computeBestWorstTrades,
  computeDashboardMetrics,
  getRecentSignals,
} from "@/lib/signal-metrics";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const signals = await prisma.signal.findMany({ orderBy: { signalTime: "asc" } });
  const metrics = computeDashboardMetrics(signals);
  const bestWorst = computeBestWorstTrades(signals);
  const recentSignals = getRecentSignals(signals);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">Performance Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Live analytics computed from every signal in the database.
        </p>
      </div>
      <DashboardContent metrics={metrics} bestWorst={bestWorst} recentSignals={recentSignals} />
    </div>
  );
}
