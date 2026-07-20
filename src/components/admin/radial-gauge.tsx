"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

const TICK_COUNT = 36;

// Rounded to avoid SSR/CSR floating-point string mismatches (e.g.
// "121.5285115251741" vs "121.52851152517408") that trigger hydration
// warnings on every trig-derived SVG coordinate.
function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function RadialGauge({
  value,
  max = 100,
  displayValue,
  label,
  accent = "gold",
  size = 140,
}: {
  value: number;
  max?: number;
  displayValue: string;
  label: string;
  accent?: "gold" | "win" | "loss";
  size?: number;
}) {
  const gradientId = useId();
  const glowId = useId();
  const strokeWidth = 9;
  const radius = (size - strokeWidth) / 2 - 10;
  const circumference = round2(2 * Math.PI * radius);
  const pct = Math.max(0, Math.min(1, Math.abs(value) / max));
  const dash = round2(circumference * pct);
  const center = size / 2;
  const tickOuter = radius + 9;
  const tickInner = radius + 4;

  const stops =
    accent === "win"
      ? ["var(--thc-win)", "color-mix(in oklab, var(--thc-win) 55%, white)"]
      : accent === "loss"
        ? ["var(--thc-loss)", "color-mix(in oklab, var(--thc-loss) 55%, white)"]
        : ["var(--thc-gold-start)", "var(--thc-gold-end)"];

  const valueClass =
    accent === "win"
      ? "text-[var(--thc-win)]"
      : accent === "loss"
        ? "text-[var(--thc-loss)]"
        : "thc-gold-text";

  const ticks = Array.from({ length: TICK_COUNT }, (_, i) => {
    const angle = (i / TICK_COUNT) * 2 * Math.PI - Math.PI / 2;
    const filled = i / TICK_COUNT <= pct;
    return {
      key: i,
      x1: round2(center + Math.cos(angle) * tickInner),
      y1: round2(center + Math.sin(angle) * tickInner),
      x2: round2(center + Math.cos(angle) * tickOuter),
      y2: round2(center + Math.sin(angle) * tickOuter),
      filled,
    };
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={stops[0]} />
              <stop offset="100%" stopColor={stops[1]} />
            </linearGradient>
            <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {ticks.map((t) => (
            <line
              key={t.key}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.filled ? `url(#${gradientId})` : "rgba(255,255,255,0.12)"}
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          ))}

          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
            filter={`url(#${glowId})`}
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
