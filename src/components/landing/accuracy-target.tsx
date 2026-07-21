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

interface Shot {
  tipX: number;
  tipY: number;
  tailX: number;
  tailY: number;
  fromX: number;
  fromY: number;
  rotateFrom: number;
  delay: number;
}

// Three arrows landing in a tight cluster just off-center, each flown in from a
// different direction — the story is "consistently accurate", not a single lucky shot.
const SHOTS: Shot[] = [
  { tipX: 103, tipY: 113, tailX: 158, tailY: 58, fromX: 130, fromY: -130, rotateFrom: 40, delay: 0.5 },
  { tipX: 117, tipY: 106, tailX: 62, tailY: 50, fromX: -130, fromY: -130, rotateFrom: -40, delay: 1.1 },
  { tipX: 109, tipY: 99, tailX: 109, tailY: 44, fromX: 0, fromY: -150, rotateFrom: 0, delay: 1.7 },
];

const arrowVariants: Variants = {
  hidden: (shot: Shot) => ({ x: shot.fromX, y: shot.fromY, opacity: 0, rotate: shot.rotateFrom }),
  visible: (shot: Shot) => ({
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.5, delay: shot.delay, ease: [0.32, 0, 0.67, 0] },
  }),
};

const markVariants: Variants = {
  hidden: { scale: 0 },
  visible: (shot: Shot) => ({
    scale: 1,
    transition: { duration: 0.25, delay: shot.delay + 0.45 },
  }),
};

const rippleVariants: Variants = {
  hidden: { scale: 1, opacity: 0 },
  visible: (shot: Shot) => ({
    scale: 4,
    opacity: [0, 0.8, 0],
    transition: { duration: 0.7, delay: shot.delay + 0.45, ease: "easeOut" },
  }),
};

function ArrowShot({ shot }: { shot: Shot }) {
  return (
    <>
      <motion.g custom={shot} variants={arrowVariants}>
        <line
          x1={shot.tipX}
          y1={shot.tipY}
          x2={shot.tailX}
          y2={shot.tailY}
          stroke="var(--thc-gold-end)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <path
          d={`M${shot.tipX} ${shot.tipY} L${shot.tipX + 10} ${shot.tipY - 8} L${shot.tipX + 2} ${shot.tipY + 10} Z`}
          fill="var(--thc-gold-end)"
        />
      </motion.g>

      <motion.circle
        custom={shot}
        variants={markVariants}
        cx={shot.tipX}
        cy={shot.tipY}
        r={4}
        fill="var(--thc-gold-start)"
        style={{ transformOrigin: `${shot.tipX}px ${shot.tipY}px` }}
      />

      <motion.circle
        custom={shot}
        variants={rippleVariants}
        cx={shot.tipX}
        cy={shot.tipY}
        r={4}
        fill="none"
        stroke="var(--thc-gold-end)"
        strokeWidth={2}
        style={{ transformOrigin: `${shot.tipX}px ${shot.tipY}px` }}
      />
    </>
  );
}

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

        {SHOTS.map((shot) => (
          <ArrowShot key={`${shot.tipX}-${shot.tipY}`} shot={shot} />
        ))}
      </svg>
    </motion.div>
  );
}
