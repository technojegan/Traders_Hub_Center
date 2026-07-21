import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SignalsExplorer } from "@/components/signals/signals-explorer";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { prisma } from "@/lib/prisma";
import {
  computeBestWorstTrades,
  computeDashboardMetrics,
  getRecentSignals,
} from "@/lib/signal-metrics";
import type { SignalRow } from "@/components/signals/signals-explorer";

export const revalidate = 60;

async function getSignals() {
  return prisma.signal.findMany({ orderBy: { signalTime: "desc" } });
}

export default async function SignalsPage() {
  const signals = await getSignals();
  const metrics = computeDashboardMetrics(signals);
  const bestWorst = computeBestWorstTrades(signals);
  const recentSignals = getRecentSignals(signals);
  const rows: SignalRow[] = signals.map((s) => ({
    id: s.id,
    strike: s.strike,
    optionType: s.optionType,
    entryPrice: s.entryPrice,
    stopLoss: s.stopLoss,
    targets: s.targets,
    sellPrice: s.sellPrice,
    pnlPercent: s.pnlPercent,
    status: s.status,
    signalTime: s.signalTime.toISOString(),
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto flex-1 w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">
            Signals <span className="thc-gold-text">Overview</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Every intraday options-buying call we&apos;ve published — transparent, unedited
            track record. This dashboard is the same one our admin sees, no login required.
          </p>
        </div>
        <div className="mb-10">
          <DashboardContent
            metrics={metrics}
            bestWorst={bestWorst}
            recentSignals={recentSignals}
          />
        </div>
        <SignalsExplorer signals={rows} />
      </main>
      <Footer />
    </div>
  );
}
