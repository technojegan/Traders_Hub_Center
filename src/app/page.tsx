import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/landing/hero";
import { TrustStats } from "@/components/landing/trust-stats";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { InstagramGrid } from "@/components/landing/instagram-grid";
import { prisma } from "@/lib/prisma";
import { computeDashboardMetrics } from "@/lib/signal-metrics";

export const revalidate = 60;

export default async function Home() {
  const signals = await prisma.signal.findMany({
    select: { id: true, optionType: true, pnlPercent: true, status: true, signalTime: true },
  });
  const metrics = computeDashboardMetrics(signals);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero
          stats={{
            winRate: metrics.winRate,
            totalSignals: metrics.totalSignals,
            totalCapturePercent: metrics.totalCapturePercent,
          }}
        />
        <TrustStats />
        <HowItWorks />
        <Pricing />
        <InstagramGrid />
      </main>
      <Footer />
    </div>
  );
}
