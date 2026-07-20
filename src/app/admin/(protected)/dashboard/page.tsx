import { prisma } from "@/lib/prisma";
import { computeDashboardMetrics } from "@/lib/signal-metrics";
import { KpiCard } from "@/components/admin/kpi-card";
import { RadialGauge } from "@/components/admin/radial-gauge";
import { RecentSignalsList } from "@/components/admin/recent-signals-list";
import {
  BestWorstBarChart,
  CePeDonutChart,
  CumulativeLineChart,
  MonthlyPerformanceChart,
  WinLossBarChart,
} from "@/components/admin/dashboard-charts";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const signals = await prisma.signal.findMany({ orderBy: { signalTime: "asc" } });
  const metrics = computeDashboardMetrics(signals);

  const closed = signals.filter((s) => s.pnlPercent != null);
  const bestWorst = [...closed]
    .sort((a, b) => (b.pnlPercent ?? 0) - (a.pnlPercent ?? 0))
    .filter((_, i, arr) => i < 5 || i >= arr.length - 5)
    .map((s) => ({
      label: `${s.strike} ${s.optionType}`,
      pnlPercent: Math.round((s.pnlPercent ?? 0) * 100) / 100,
    }));

  const recentSignals = [...signals]
    .sort((a, b) => b.signalTime.getTime() - a.signalTime.getTime())
    .slice(0, 6);

  const pct = (n: number) => `${n.toFixed(1)}%`;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">Performance Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Live analytics computed from every signal in the database.
        </p>
      </div>

      <div className="thc-glass thc-gold-border flex flex-col items-center gap-8 rounded-2xl p-6 sm:flex-row sm:justify-around">
        <RadialGauge
          value={metrics.winRate}
          displayValue={pct(metrics.winRate)}
          label="Win Rate"
          accent="win"
        />
        <RadialGauge
          value={Math.min(Math.abs(metrics.totalCapturePercent), 100)}
          displayValue={pct(metrics.totalCapturePercent)}
          label="Total Capture %"
          accent={metrics.totalCapturePercent >= 0 ? "win" : "loss"}
        />
        <RadialGauge
          value={metrics.ceCount + metrics.peCount > 0 ? (metrics.ceCount / (metrics.ceCount + metrics.peCount)) * 100 : 0}
          displayValue={`${metrics.ceCount}/${metrics.peCount}`}
          label="CE / PE Split"
          accent="gold"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KpiCard label="Total Signals" value={String(metrics.totalSignals)} delayMs={0} />
        <KpiCard label="Avg % / Trade" value={pct(metrics.avgPercentPerTrade)} delayMs={40} />
        <KpiCard
          label="Best Trade"
          value={metrics.bestTradePercent != null ? pct(metrics.bestTradePercent) : "—"}
          accent="win"
          delayMs={80}
        />
        <KpiCard
          label="Worst Trade"
          value={metrics.worstTradePercent != null ? pct(metrics.worstTradePercent) : "—"}
          accent="loss"
          delayMs={120}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="thc-glass rounded-xl border border-white/5 p-4">
          <h2 className="mb-2 font-heading text-sm font-semibold">Cumulative % Over Time</h2>
          <CumulativeLineChart data={metrics.cumulativeSeries} />
        </div>
        <div className="thc-glass rounded-xl border border-white/5 p-4">
          <h2 className="mb-2 font-heading text-sm font-semibold">Win vs Loss by Day</h2>
          <WinLossBarChart data={metrics.winLossByDay} />
        </div>
        <div className="thc-glass rounded-xl border border-white/5 p-4">
          <h2 className="mb-2 font-heading text-sm font-semibold">
            CE vs PE ({metrics.ceCount} / {metrics.peCount})
          </h2>
          <CePeDonutChart ceCount={metrics.ceCount} peCount={metrics.peCount} />
        </div>
        <div className="thc-glass rounded-xl border border-white/5 p-4">
          <h2 className="mb-2 font-heading text-sm font-semibold">Best &amp; Worst Trades</h2>
          <BestWorstBarChart data={bestWorst} />
        </div>
        <div className="thc-glass rounded-xl border border-white/5 p-4 lg:col-span-2">
          <h2 className="mb-2 font-heading text-sm font-semibold">Monthly Performance</h2>
          <MonthlyPerformanceChart data={metrics.monthlyPerformance} />
        </div>
        <div className="thc-glass rounded-xl border border-white/5 p-4 lg:col-span-2">
          <h2 className="mb-2 font-heading text-sm font-semibold">Recent Signals</h2>
          <RecentSignalsList signals={recentSignals} />
        </div>
      </div>
    </div>
  );
}
