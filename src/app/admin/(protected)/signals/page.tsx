import { prisma } from "@/lib/prisma";
import { ManageSignalsTable, type ManageSignalRow } from "@/components/admin/manage-signals-table";

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
  }));

  const openCount = rows.filter((r) => r.status === "OPEN").length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">Manage Signals</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {openCount} open trade{openCount === 1 ? "" : "s"} — closing one sends a Telegram
          update to the group.
        </p>
      </div>
      <ManageSignalsTable signals={rows} />
    </div>
  );
}
