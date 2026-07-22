import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { RefreshButton } from "@/components/site/refresh-button";
import { prisma } from "@/lib/prisma";
import {
  computeBestWorstTrades,
  computeDashboardMetrics,
  getRecentSignals,
} from "@/lib/signal-metrics";

export const revalidate = 60;

export default async function PublicDashboardPage() {
  const signals = await prisma.signal.findMany({ orderBy: { signalTime: "desc" } });
  const metrics = computeDashboardMetrics(signals);
  const bestWorst = computeBestWorstTrades(signals);
  const recentSignals = getRecentSignals(signals);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto flex-1 w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold sm:text-4xl">
              <span className="thc-gold-text">Dashboard</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Live performance analytics computed from every signal we&apos;ve published — no
              login required, same numbers our admin sees.
            </p>
          </div>
          <RefreshButton />
        </div>
        <DashboardContent metrics={metrics} bestWorst={bestWorst} recentSignals={recentSignals} />
      </main>
      <Footer />
    </div>
  );
}
