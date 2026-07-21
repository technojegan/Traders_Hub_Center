"use client";

import { motion, type Variants } from "framer-motion";

const RINGS = [
  { r: 92, fill: "rgba(212,175,55,0.06)", stroke: "rgba(212,175,55,0.35)" },
  { r: 70, fill: "rgba(212,175,55,0.1)", stroke: "rgba(212,175,55,0.45)" },
  { r: 48, fill: "rgba(212,175,55,0.16)", stroke: "rgba(212,175,55,0.55)" },
  { r: 26, fill: "rgba(212,175,55,0.24)", stroke: "rgba(212,175,55,0.7)" },
];

const ringVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const centerVariants: Variants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { duration: 0.3, delay: 0.5 } },
};

const arrowVariants: Variants = {
  hidden: { x: 140, y: -140, opacity: 0, rotate: 45 },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.6, delay: 0.6, ease: [0.32, 0, 0.67, 0] },
  },
};

const rippleVariants: Variants = {
  hidden: { scale: 1, opacity: 0 },
  visible: {
    scale: 4.5,
    opacity: [0, 0.8, 0],
    transition: { duration: 0.9, delay: 1.15, ease: "easeOut" },
  },
};

export function AccuracyTarget() {
  return (
    <motion.div
      className="relative mx-auto h-[220px] w-[220px] sm:h-[260px] sm:w-[260px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <svg viewBox="0 0 220 220" className="h-full w-full" aria-hidden="true">
        {RINGS.map((ring, i) => (
          <motion.circle
            key={ring.r}
            custom={i}
            variants={ringVariants}
            cx={110}
            cy={110}
            r={ring.r}
            fill={ring.fill}
            stroke={ring.stroke}
            strokeWidth={1.5}
            style={{ transformOrigin: "110px 110px" }}
          />
        ))}

        <motion.circle
          variants={centerVariants}
          cx={110}
          cy={110}
          r={8}
          fill="var(--thc-gold-start)"
          style={{ transformOrigin: "110px 110px" }}
        />

        <motion.g variants={arrowVariants}>
          <line
            x1={110}
            y1={110}
            x2={166}
            y2={54}
            stroke="var(--thc-gold-end)"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <path d="M110 110 L128 100 L120 118 Z" fill="var(--thc-gold-end)" />
        </motion.g>

        <motion.circle
          variants={rippleVariants}
          cx={110}
          cy={110}
          r={8}
          fill="none"
          stroke="var(--thc-gold-end)"
          strokeWidth={2}
          style={{ transformOrigin: "110px 110px" }}
        />
      </svg>
    </motion.div>
  );
}
