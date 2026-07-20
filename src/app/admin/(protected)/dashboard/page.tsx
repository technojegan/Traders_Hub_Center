import { prisma } from "@/lib/prisma";
import { computeDashboardMetrics } from "@/lib/signal-metrics";
import { KpiCard } from "@/components/admin/kpi-card";
import { RadialGauge } from "@/components/admin/radial-gauge";
import { SliderStat } from "@/components/admin/slider-stat";
import { SectionNumber } from "@/components/admin/section-number";
import { RecentSignalsList } from "@/components/admin/recent-signals-list";
import {
  BestWorstBarChart,
  CePeDonutChart,
  CumulativeLineChart,
  MonthlyPerformanceChart,
  TpSlComparisonChart,
  WinLossBarChart,
  WinRateDonutChart,
} from "@/components/admin/dashboard-charts";
import { cn } from "@/lib/utils";

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

      <div className="thc-glass thc-gold-border relative flex justify-center rounded-2xl p-6">
        <div className="absolute left-6 top-6">
          <SectionNumber n={1} />
        </div>
        <RadialGauge
          value={
            metrics.ceCount + metrics.peCount > 0
              ? (metrics.ceCount / (metrics.ceCount + metrics.peCount)) * 100
              : 0
          }
          displayValue={`${metrics.ceCount}/${metrics.peCount}`}
          label="CE / PE Split"
          accent="gold"
        />
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <SectionNumber n={2} />
          <h2 className="font-heading text-sm font-semibold text-muted-foreground">
            Trade Stats
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <KpiCard label="Total Signals" value={String(metrics.totalSignals)} delayMs={0} />
          <SliderStat
            label="Avg % / Trade"
            value={metrics.avgPercentPerTrade}
            max={30}
            displayValue={pct(metrics.avgPercentPerTrade)}
            accent={metrics.avgPercentPerTrade >= 0 ? "win" : "loss"}
          />
          <SliderStat
            label="Best Trade"
            value={metrics.bestTradePercent ?? 0}
            max={50}
            displayValue={metrics.bestTradePercent != null ? pct(metrics.bestTradePercent) : "—"}
            accent="win"
          />
          <KpiCard
            label="Worst Trade"
            value={metrics.worstTradePercent != null ? pct(metrics.worstTradePercent) : "—"}
            accent="loss"
            delayMs={40}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="thc-glass relative rounded-xl border border-white/5 p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <SectionNumber n={3} />
              <h2 className="font-heading text-sm font-semibold">Cumulative % Over Time</h2>
            </div>
            <div className="thc-gold-border rounded-lg px-2.5 py-1 text-right">
              <p
                className={cn(
                  "font-heading text-sm font-bold leading-none",
                  metrics.totalCapturePercent >= 0
                    ? "text-[var(--thc-win)]"
                    : "text-[var(--thc-loss)]",
                )}
              >
                {pct(metrics.totalCapturePercent)}
              </p>
              <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
                Total Capture
              </p>
            </div>
          </div>
          <CumulativeLineChart data={metrics.cumulativeSeries} />
        </div>
        <div className="thc-glass rounded-xl border border-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <SectionNumber n={4} />
            <h2 className="font-heading text-sm font-semibold">Win Rate</h2>
          </div>
          <WinRateDonutChart wins={metrics.winCount} losses={metrics.lossCount} />
        </div>
        <div className="thc-glass rounded-xl border border-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <SectionNumber n={5} />
            <h2 className="font-heading text-sm font-semibold">Win % vs Loss % by Day</h2>
          </div>
          <WinLossBarChart data={metrics.winLossByDay} />
        </div>
        <div className="thc-glass rounded-xl border border-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <SectionNumber n={6} />
            <h2 className="font-heading text-sm font-semibold">
              CE vs PE ({metrics.ceCount} / {metrics.peCount})
            </h2>
          </div>
          <CePeDonutChart ceCount={metrics.ceCount} peCount={metrics.peCount} />
        </div>
        <div className="thc-glass rounded-xl border border-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <SectionNumber n={7} />
            <h2 className="font-heading text-sm font-semibold">Best &amp; Worst Trades</h2>
          </div>
          <BestWorstBarChart data={bestWorst} />
        </div>
        <div className="thc-glass rounded-xl border border-white/5 p-4 lg:col-span-2">
          <div className="mb-2 flex items-center gap-2">
            <SectionNumber n={8} />
            <h2 className="font-heading text-sm font-semibold">Monthly Performance</h2>
          </div>
          <MonthlyPerformanceChart data={metrics.monthlyPerformance} />
        </div>
        <div className="thc-glass rounded-xl border border-white/5 p-4 lg:col-span-2">
          <div className="mb-2 flex items-center gap-2">
            <SectionNumber n={9} />
            <h2 className="font-heading text-sm font-semibold">
              Target Hit % vs SL Hit % (Cumulative)
            </h2>
          </div>
          <TpSlComparisonChart data={metrics.tpSlComparison} />
        </div>
        <div className="thc-glass rounded-xl border border-white/5 p-4 lg:col-span-2">
          <div className="mb-2 flex items-center gap-2">
            <SectionNumber n={10} />
            <h2 className="font-heading text-sm font-semibold">Recent Signals</h2>
          </div>
          <RecentSignalsList signals={recentSignals} />
        </div>
      </div>
    </div>
  );
}
