import { prisma } from "@/lib/prisma";
import { ManageSignalsTable, type ManageSignalRow } from "@/components/admin/manage-signals-table";
import { OngoingSignals } from "@/components/signals/ongoing-signals";
import { RefreshButton } from "@/components/site/refresh-button";

export const dynamic = "force-dynamic";

export default async function ManageSignalsPage() {
  const signals = await prisma.signal.findMany({ orderBy: { signalTime: "desc" } });

  const rows: ManageSignalRow[] = signals.map((s) => ({
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
    adminNote: s.adminNote,
  }));

  const ongoing = rows.filter((r) => r.status === "OPEN");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">Manage Signals</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {ongoing.length} open trade{ongoing.length === 1 ? "" : "s"} — closing one sends a
            Telegram update to the group.
          </p>
        </div>
        <RefreshButton />
      </div>
      <OngoingSignals signals={ongoing} />
      {ongoing.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-lg font-bold">Ongoing Trades</h2>
          <ManageSignalsTable signals={ongoing} />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-lg font-bold">All Signals</h2>
        <ManageSignalsTable signals={rows} />
      </div>
    </div>
  );
}
