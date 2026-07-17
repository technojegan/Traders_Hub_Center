import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  accent,
  delayMs = 0,
}: {
  label: string;
  value: string;
  accent?: "win" | "loss" | "neutral";
  delayMs?: number;
}) {
  const valueClass =
    accent === "win"
      ? "text-[var(--thc-win)]"
      : accent === "loss"
        ? "text-[var(--thc-loss)]"
        : "thc-gold-text";

  return (
    <div
      className="thc-glass thc-glow thc-reveal rounded-xl border border-white/5 p-4"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className={cn("mt-2 font-heading text-2xl font-bold", valueClass)}>{value}</p>
    </div>
  );
}
