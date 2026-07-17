"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSignals, type SignalInput } from "@/app/admin/(protected)/signals/new/actions";

const EMPTY = {
  strike: "",
  optionType: "CE" as "CE" | "PE",
  entryPrice: "",
  stopLoss: "",
  targets: "",
  priceAtSignal: "",
  sellPrice: "",
};

export function ManualSignalForm() {
  const [form, setForm] = useState(EMPTY);
  const [isPending, startTransition] = useTransition();

  function set<K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const strike = parseInt(form.strike, 10);
    const entryPrice = parseFloat(form.entryPrice);
    const stopLoss = parseFloat(form.stopLoss);
    const priceAtSignal = parseFloat(form.priceAtSignal);
    const targets = form.targets
      .split(",")
      .map((t) => parseFloat(t.trim()))
      .filter((t) => Number.isFinite(t));
    const sellPrice = form.sellPrice.trim() === "" ? null : parseFloat(form.sellPrice);

    if (
      !Number.isFinite(strike) ||
      !Number.isFinite(entryPrice) ||
      !Number.isFinite(stopLoss) ||
      !Number.isFinite(priceAtSignal) ||
      targets.length === 0
    ) {
      toast.error("Fill in strike, entry, SL, target(s) and now price.");
      return;
    }

    const input: SignalInput = {
      strike,
      optionType: form.optionType,
      entryPrice,
      stopLoss,
      targets,
      priceAtSignal,
      sellPrice: sellPrice != null && Number.isFinite(sellPrice) ? sellPrice : null,
      rawMessage: `Manual entry: ${strike} ${form.optionType}`,
    };

    startTransition(async () => {
      const result = await createSignals([input]);
      if (result.success) {
        toast.success("Signal saved.");
        setForm(EMPTY);
      } else {
        toast.error(result.error ?? "Failed to save signal.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="flex flex-col gap-1.5">
          <Label>Strike</Label>
          <Input value={form.strike} onChange={(e) => set("strike", e.target.value)} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Type</Label>
          <Select value={form.optionType} onValueChange={(v) => set("optionType", v as "CE" | "PE")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CE">CE</SelectItem>
              <SelectItem value="PE">PE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Entry Price</Label>
          <Input value={form.entryPrice} onChange={(e) => set("entryPrice", e.target.value)} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Stop Loss</Label>
          <Input value={form.stopLoss} onChange={(e) => set("stopLoss", e.target.value)} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Target(s)</Label>
          <Input
            value={form.targets}
            onChange={(e) => set("targets", e.target.value)}
            placeholder="155,170"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Price at Signal (Now)</Label>
          <Input
            value={form.priceAtSignal}
            onChange={(e) => set("priceAtSignal", e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Sell Price (optional)</Label>
          <Input value={form.sellPrice} onChange={(e) => set("sellPrice", e.target.value)} />
        </div>
      </div>
      <Button type="submit" disabled={isPending} className="thc-glow w-fit">
        {isPending ? "Saving…" : "Save Signal"}
      </Button>
    </form>
  );
}
