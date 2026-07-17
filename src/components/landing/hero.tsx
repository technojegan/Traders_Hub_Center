"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon, InstagramIcon } from "@/components/site/icons";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/constants";

export interface HeroStats {
  winRate: number;
  totalSignals: number;
  totalCapturePercent: number;
}

export function Hero({ stats }: { stats: HeroStats }) {
  const statItems = [
    { label: "Win Rate", value: `${stats.winRate.toFixed(0)}%` },
    { label: "Signals Given", value: `${stats.totalSignals}` },
    { label: "Total Capture", value: `${stats.totalCapturePercent.toFixed(0)}%` },
  ];

  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 sm:pt-28 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--thc-gold-start) 18%, transparent), transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="mb-4 inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-muted-foreground">
          Intraday Options Signals · CE &amp; PE
        </p>
        <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Trade with <span className="thc-gold-text">accuracy</span> and{" "}
          <span className="thc-gold-text">consistency</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
          Traders Hub Center publishes transparent, intraday options-buying calls to premium
          subscribers — every entry, stop loss and target tracked in the open.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="thc-glow">
            <Link href="/register">Register Premium</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="thc-glow">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-4 w-4" />
              Join WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="thc-glow">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </a>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4"
      >
        {statItems.map((stat) => (
          <div
            key={stat.label}
            className="thc-glass thc-glow rounded-xl border border-white/5 px-4 py-5 text-center"
          >
            <p className="font-heading text-2xl font-bold thc-gold-text sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
