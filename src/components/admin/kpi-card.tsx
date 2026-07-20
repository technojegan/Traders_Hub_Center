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

  const barGradient =
    accent === "win"
      ? "linear-gradient(90deg, color-mix(in oklab, var(--thc-win) 60%, transparent), var(--thc-win))"
      : accent === "loss"
        ? "linear-gradient(90deg, color-mix(in oklab, var(--thc-loss) 60%, transparent), var(--thc-loss))"
        : "var(--thc-gold-gradient)";

  return (
    <div
      className="thc-glass thc-glow thc-reveal relative overflow-hidden rounded-xl border border-white/5 p-4"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <span
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ backgroundImage: barGradient }}
      />
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className={cn("mt-2 font-heading text-2xl font-bold", valueClass)}>{value}</p>
    </div>
  );
}
