"use client";

import { motion } from "framer-motion";

interface Candle {
  x: number;
  bodyTop: number;
  bodyBottom: number;
  wickTop: number;
  wickBottom: number;
  up: boolean;
}

const WIDTH = 560;
const HEIGHT = 280;
const CANDLE_WIDTH = 26;

// Hand-authored OHLC-style data (not random, so SSR/CSR always match) —
// a rough uptrend with pullbacks, mirroring an intraday winning session.
const CANDLES: Candle[] = [
  { x: 10, bodyTop: 205, bodyBottom: 232, wickTop: 195, wickBottom: 240, up: true },
  { x: 46, bodyTop: 192, bodyBottom: 214, wickTop: 182, wickBottom: 222, up: false },
  { x: 82, bodyTop: 160, bodyBottom: 196, wickTop: 150, wickBottom: 204, up: true },
  { x: 118, bodyTop: 140, bodyBottom: 164, wickTop: 130, wickBottom: 172, up: true },
  { x: 154, bodyTop: 150, bodyBottom: 176, wickTop: 142, wickBottom: 184, up: false },
  { x: 190, bodyTop: 112, bodyBottom: 146, wickTop: 102, wickBottom: 154, up: true },
  { x: 226, bodyTop: 92, bodyBottom: 116, wickTop: 82, wickBottom: 124, up: true },
  { x: 262, bodyTop: 100, bodyBottom: 126, wickTop: 92, wickBottom: 134, up: false },
  { x: 298, bodyTop: 70, bodyBottom: 96, wickTop: 62, wickBottom: 104, up: true },
  { x: 334, bodyTop: 55, bodyBottom: 76, wickTop: 46, wickBottom: 84, up: true },
  { x: 370, bodyTop: 64, bodyBottom: 88, wickTop: 56, wickBottom: 96, up: false },
  { x: 406, bodyTop: 40, bodyBottom: 62, wickTop: 32, wickBottom: 70, up: true },
  { x: 442, bodyTop: 30, bodyBottom: 48, wickTop: 22, wickBottom: 56, up: true },
  { x: 478, bodyTop: 20, bodyBottom: 38, wickTop: 12, wickBottom: 46, up: true },
];

export function CandlestickAnimation({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {CANDLES.map((c, i) => (
        <motion.g
          key={c.x}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.4 + i * 0.06, ease: "easeOut" }}
          style={{ transformOrigin: `${c.x + CANDLE_WIDTH / 2}px ${HEIGHT}px` }}
        >
          <line
            x1={c.x + CANDLE_WIDTH / 2}
            x2={c.x + CANDLE_WIDTH / 2}
            y1={c.wickTop}
            y2={c.wickBottom}
            stroke={c.up ? "var(--thc-win)" : "var(--thc-loss)"}
            strokeWidth={2}
            opacity={0.7}
          />
          <rect
            x={c.x}
            y={c.bodyTop}
            width={CANDLE_WIDTH}
            height={c.bodyBottom - c.bodyTop}
            rx={3}
            fill={c.up ? "var(--thc-win)" : "var(--thc-loss)"}
            opacity={0.85}
          />
        </motion.g>
      ))}
    </svg>
  );
}
