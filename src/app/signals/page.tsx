import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SignalsExplorer } from "@/components/signals/signals-explorer";
import { OngoingSignals } from "@/components/signals/ongoing-signals";
import { SoundAlertToggle } from "@/components/signals/sound-alert-toggle";
import { prisma } from "@/lib/prisma";
import type { SignalRow } from "@/components/signals/signals-explorer";

export const revalidate = 60;

async function getSignals() {
  return prisma.signal.findMany({ orderBy: { signalTime: "desc" } });
}

export default async function SignalsPage() {
  const signals = await getSignals();
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
  const ongoing = rows.filter((r) => r.status === "OPEN");
  const initialUpdatedAt = signals.reduce<string | null>((latest, s) => {
    const t = s.updatedAt.toISOString();
    return !latest || t > latest ? t : latest;
  }, null);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto flex-1 w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold sm:text-4xl">
              Trade <span className="thc-gold-text">Log</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Every intraday options-buying call we&apos;ve published — transparent, unedited
              track record.
            </p>
          </div>
          <SoundAlertToggle initialUpdatedAt={initialUpdatedAt} />
        </div>
        <OngoingSignals signals={ongoing} />
        <SignalsExplorer signals={rows} />
      </main>
      <Footer />
    </div>
  );
}
