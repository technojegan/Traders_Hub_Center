"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export function RadialGauge({
  value,
  max = 100,
  displayValue,
  label,
  accent = "gold",
  size = 132,
}: {
  value: number;
  max?: number;
  displayValue: string;
  label: string;
  accent?: "gold" | "win" | "loss";
  size?: number;
}) {
  const gradientId = useId();
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(1, Math.abs(value) / max));
  const dash = circumference * pct;

  const stops =
    accent === "win"
      ? ["var(--thc-win)", "color-mix(in oklab, var(--thc-win) 60%, white)"]
      : accent === "loss"
        ? ["var(--thc-loss)", "color-mix(in oklab, var(--thc-loss) 60%, white)"]
        : ["var(--thc-gold-start)", "var(--thc-gold-end)"];

  const valueClass =
    accent === "win"
      ? "text-[var(--thc-win)]"
      : accent === "loss"
        ? "text-[var(--thc-loss)]"
        : "thc-gold-text";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={stops[0]} />
              <stop offset="100%" stopColor={stops[1]} />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-heading text-2xl font-bold", valueClass)}>
            {displayValue}
          </span>
        </div>
      </div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}
