import { CumulativeLineChart, TpSlComparisonChart } from "@/components/admin/dashboard-charts";
import type { DashboardMetrics } from "@/lib/signal-metrics";

type Accent = "win" | "loss" | "neutral";
interface StatTile {
  label: string;
  value: string;
  accent: Accent;
}

export function SignalsInsights({ metrics }: { metrics: DashboardMetrics }) {
  const pct = (n: number) => `${n.toFixed(1)}%`;

  const stats: StatTile[] = [
    { label: "Total Signals", value: String(metrics.totalSignals), accent: "neutral" },
    { label: "Win Rate", value: pct(metrics.winRate), accent: "win" },
    {
      label: "Total Capture %",
      value: pct(metrics.totalCapturePercent),
      accent: metrics.totalCapturePercent >= 0 ? "win" : "loss",
    },
    { label: "CE / PE", value: `${metrics.ceCount} / ${metrics.peCount}`, accent: "neutral" },
    {
      label: "Best Trade",
      value: metrics.bestTradePercent != null ? pct(metrics.bestTradePercent) : "—",
      accent: "win",
    },
    {
      label: "Worst Trade",
      value: metrics.worstTradePercent != null ? pct(metrics.worstTradePercent) : "—",
      accent: "loss",
    },
  ];

  return (
    <div className="thc-glass thc-gold-border mb-8 rounded-2xl p-4 sm:p-6">
      <h2 className="font-heading text-sm font-semibold text-muted-foreground">
        Performance at a glance
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-xl border border-white/5 bg-black/20 px-3 py-3 text-center"
          >
            <span
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{
                backgroundImage:
                  stat.accent === "win"
                    ? "linear-gradient(90deg, color-mix(in oklab, var(--thc-win) 60%, transparent), var(--thc-win))"
                    : stat.accent === "loss"
                      ? "linear-gradient(90deg, color-mix(in oklab, var(--thc-loss) 60%, transparent), var(--thc-loss))"
                      : "var(--thc-gold-gradient)",
              }}
            />
            <p
              className={
                "font-heading text-lg font-bold sm:text-xl " +
                (stat.accent === "win"
                  ? "text-[var(--thc-win)]"
                  : stat.accent === "loss"
                    ? "text-[var(--thc-loss)]"
                    : "thc-gold-text")
              }
            >
              {stat.value}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {metrics.cumulativeSeries.length > 1 && (
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div>
            <p className="mb-1 text-xs text-muted-foreground">Cumulative % over time</p>
            <CumulativeLineChart data={metrics.cumulativeSeries} />
          </div>
          <div>
            <p className="mb-1 text-xs text-muted-foreground">
              Target Hit % vs SL Hit % (cumulative)
            </p>
            <TpSlComparisonChart data={metrics.tpSlComparison} />
          </div>
        </div>
      )}
    </div>
  );
}
