"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, X } from "lucide-react";
import { cn, formatSignalDate, formatSignalTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  closeSignal,
  deleteSignal,
  updateSignal,
  type SignalUpdateInput,
} from "@/app/admin/(protected)/signals/actions";

export interface ManageSignalRow {
  id: string;
  strike: number;
  optionType: "CE" | "PE";
  entryPrice: number;
  stopLoss: number;
  targets: number[];
  sellPrice: number | null;
  pnlPercent: number | null;
  status: "OPEN" | "TARGET_HIT" | "SL_HIT" | "CLOSED_MANUAL";
  signalTime: string;
}

const STATUS_LABEL: Record<ManageSignalRow["status"], string> = {
  OPEN: "Open",
  TARGET_HIT: "Target Hit",
  SL_HIT: "SL Hit",
  CLOSED_MANUAL: "Closed",
};

function CloseTradeCell({ signal }: { signal: ManageSignalRow }) {
  const [sellPrice, setSellPrice] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleClose() {
    const value = parseFloat(sellPrice);
    if (!Number.isFinite(value)) {
      toast.error("Enter a valid sell price.");
      return;
    }
    startTransition(async () => {
      const result = await closeSignal(signal.id, value);
      if (result.success) {
        toast.success(`${signal.strike} ${signal.optionType} closed — update sent to Telegram.`);
      } else {
        toast.error(result.error ?? "Failed to close trade.");
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        value={sellPrice}
        onChange={(e) => setSellPrice(e.target.value)}
        placeholder="Sell price"
        className="h-8 w-24"
        inputMode="decimal"
      />
      <Button size="sm" className="thc-glow thc-btn-gradient h-8" disabled={isPending} onClick={handleClose}>
        {isPending ? "Closing…" : "Close"}
      </Button>
    </div>
  );
}

interface EditDraft {
  strike: string;
  optionType: "CE" | "PE";
  entryPrice: string;
  stopLoss: string;
  targets: string;
  sellPrice: string;
}

function toDraft(signal: ManageSignalRow): EditDraft {
  return {
    strike: String(signal.strike),
    optionType: signal.optionType,
    entryPrice: String(signal.entryPrice),
    stopLoss: String(signal.stopLoss),
    targets: signal.targets.join(", "),
    sellPrice: signal.sellPrice != null ? String(signal.sellPrice) : "",
  };
}

function ManageSignalRowItem({ signal }: { signal: ManageSignalRow }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<EditDraft>(() => toDraft(signal));
  const [deleteArmed, setDeleteArmed] = useState(false);
  const [isSaving, startSaving] = useTransition();
  const [isDeleting, startDeleting] = useTransition();

  const isWin = signal.pnlPercent != null && signal.pnlPercent > 0;
  const isLoss = signal.pnlPercent != null && signal.pnlPercent < 0;
  const pnlClass = isWin
    ? "text-[var(--thc-win)]"
    : isLoss
      ? "text-[var(--thc-loss)]"
      : "text-primary";

  function startEdit() {
    setDraft(toDraft(signal));
    setIsEditing(true);
  }

  function handleSave() {
    const strike = parseInt(draft.strike, 10);
    const entryPrice = parseFloat(draft.entryPrice);
    const stopLoss = parseFloat(draft.stopLoss);
    const targets = draft.targets
      .split(",")
      .map((t) => parseFloat(t.trim()))
      .filter((t) => Number.isFinite(t));
    const sellPrice = draft.sellPrice.trim() === "" ? null : parseFloat(draft.sellPrice);

    if (!Number.isFinite(strike) || !Number.isFinite(entryPrice) || !Number.isFinite(stopLoss)) {
      toast.error("Strike, Entry, and SL must be valid numbers.");
      return;
    }
    if (targets.length === 0) {
      toast.error("Enter at least one valid target.");
      return;
    }
    if (sellPrice != null && !Number.isFinite(sellPrice)) {
      toast.error("Sell price must be a valid number.");
      return;
    }

    const input: SignalUpdateInput = {
      strike,
      optionType: draft.optionType,
      entryPrice,
      stopLoss,
      targets,
      sellPrice,
    };

    startSaving(async () => {
      const result = await updateSignal(signal.id, input);
      if (result.success) {
        toast.success(`${strike} ${draft.optionType} updated.`);
        setIsEditing(false);
      } else {
        toast.error(result.error ?? "Failed to update signal.");
      }
    });
  }

  function handleDeleteClick() {
    if (!deleteArmed) {
      setDeleteArmed(true);
      setTimeout(() => setDeleteArmed(false), 4000);
      return;
    }
    startDeleting(async () => {
      const result = await deleteSignal(signal.id);
      if (result.success) {
        toast.success(`${signal.strike} ${signal.optionType} deleted.`);
      } else {
        toast.error(result.error ?? "Failed to delete signal.");
      }
    });
  }

  if (isEditing) {
    return (
      <TableRow className="border-b-white/5 bg-white/[0.02]">
        <TableCell className="hidden whitespace-nowrap text-muted-foreground sm:table-cell">
          {formatSignalDate(signal.signalTime)}{" "}
          <span className="text-xs">{formatSignalTime(signal.signalTime)}</span>
        </TableCell>
        <TableCell className="whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            <Input
              value={draft.strike}
              onChange={(e) => setDraft((d) => ({ ...d, strike: e.target.value }))}
              className="h-8 w-20"
              inputMode="numeric"
            />
            <Select
              value={draft.optionType}
              onValueChange={(v) => setDraft((d) => ({ ...d, optionType: v as "CE" | "PE" }))}
            >
              <SelectTrigger size="sm" className="h-8 w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CE">CE</SelectItem>
                <SelectItem value="PE">PE</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          <Input
            value={draft.entryPrice}
            onChange={(e) => setDraft((d) => ({ ...d, entryPrice: e.target.value }))}
            className="h-8 w-20"
            inputMode="decimal"
          />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Input
            value={draft.stopLoss}
            onChange={(e) => setDraft((d) => ({ ...d, stopLoss: e.target.value }))}
            className="h-8 w-20"
            inputMode="decimal"
          />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Input
            value={draft.targets}
            onChange={(e) => setDraft((d) => ({ ...d, targets: e.target.value }))}
            placeholder="e.g. 40, 50"
            className="h-8 w-28"
          />
        </TableCell>
        <TableCell>
          <Input
            value={draft.sellPrice}
            onChange={(e) => setDraft((d) => ({ ...d, sellPrice: e.target.value }))}
            placeholder="Sell price"
            className="h-8 w-24"
            inputMode="decimal"
          />
        </TableCell>
        <TableCell className="text-xs text-muted-foreground">Auto</TableCell>
        <TableCell colSpan={2}>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="thc-glow thc-btn-gradient h-8"
              disabled={isSaving}
              onClick={handleSave}
            >
              {isSaving ? "Saving…" : "Save"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8"
              disabled={isSaving}
              onClick={() => setIsEditing(false)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow className="border-b-white/5">
      <TableCell className="hidden whitespace-nowrap text-muted-foreground sm:table-cell">
        {formatSignalDate(signal.signalTime)}{" "}
        <span className="text-xs">{formatSignalTime(signal.signalTime)}</span>
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium">
        <div className="flex items-center gap-1.5">
          <span className="font-heading font-bold">{signal.strike}</span>
          <Badge
            variant="outline"
            className={cn(
              "px-1.5 py-0 text-[10px] font-bold",
              signal.optionType === "CE"
                ? "border-[var(--thc-ce)]/50 text-[var(--thc-ce)]"
                : "border-[var(--thc-pe)]/50 text-[var(--thc-pe)]",
            )}
          >
            {signal.optionType}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">{signal.entryPrice}</TableCell>
      <TableCell className="hidden md:table-cell">{signal.stopLoss}</TableCell>
      <TableCell className="hidden md:table-cell">{signal.targets.join(", ")}</TableCell>
      <TableCell>
        {signal.status === "OPEN" ? <CloseTradeCell signal={signal} /> : (signal.sellPrice ?? "—")}
      </TableCell>
      <TableCell className={cn("font-heading font-bold", pnlClass)}>
        {signal.pnlPercent != null
          ? `${signal.pnlPercent > 0 ? "+" : ""}${signal.pnlPercent.toFixed(1)}%`
          : "—"}
      </TableCell>
      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
        {STATUS_LABEL[signal.status]}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            title="Edit signal"
            onClick={startEdit}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={isDeleting}
            className={cn(
              "h-8 gap-1 px-2",
              deleteArmed
                ? "border-[var(--thc-loss)]/60 text-[var(--thc-loss)]"
                : "text-muted-foreground",
            )}
            title={deleteArmed ? "Click again to confirm delete" : "Delete signal"}
            onClick={handleDeleteClick}
          >
            <Trash2 className="h-3.5 w-3.5" />
            {deleteArmed && <span className="text-xs">Confirm?</span>}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function ManageSignalsTable({ signals }: { signals: ManageSignalRow[] }) {
  return (
    <div className="thc-glass overflow-hidden rounded-xl border border-white/5">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b-white/10 hover:bg-transparent">
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead>Strike</TableHead>
              <TableHead className="hidden sm:table-cell">Entry</TableHead>
              <TableHead className="hidden md:table-cell">SL</TableHead>
              <TableHead className="hidden md:table-cell">Target(s)</TableHead>
              <TableHead>Sell / Close</TableHead>
              <TableHead>P&amp;L %</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {signals.map((signal) => (
              <ManageSignalRowItem key={signal.id} signal={signal} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
