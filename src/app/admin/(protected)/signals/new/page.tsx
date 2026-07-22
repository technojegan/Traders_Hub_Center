import { prisma } from "@/lib/prisma";
import { AddSignalForm } from "@/components/admin/add-signal-form";

export const dynamic = "force-dynamic";

export default async function AddSignalPage() {
  const ongoing = await prisma.signal.findMany({
    where: { status: "OPEN" },
    orderBy: { signalTime: "desc" },
  });

  const ongoingTrades = ongoing.map((s) => ({
    id: s.id,
    strike: s.strike,
    optionType: s.optionType,
    adminNote: s.adminNote,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">Add New Signal</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Paste the raw message and hit Parse, or use the manual form. Nothing saves until you
          confirm.
        </p>
      </div>
      <AddSignalForm ongoingTrades={ongoingTrades} />
    </div>
  );
}
