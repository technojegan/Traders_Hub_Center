"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon, InstagramIcon } from "@/components/site/icons";
import { CandlestickAnimation } from "@/components/landing/candlestick-animation";
import { AccuracyTarget } from "@/components/landing/accuracy-target";
import { CountUp } from "@/components/landing/count-up";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/constants";

export interface HeroStats {
  winRate: number;
  totalSignals: number;
  totalCapturePercent: number;
}

export function Hero({ stats }: { stats: HeroStats }) {
  const statItems = [
    { label: "Win Rate", value: stats.winRate, decimals: 0, suffix: "%" },
    { label: "Signals Given", value: stats.totalSignals, decimals: 0, suffix: "" },
    { label: "Total Capture", value: stats.totalCapturePercent, decimals: 0, suffix: "%" },
  ];

  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 sm:pt-28 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--thc-gold-start) 22%, transparent), transparent 70%), radial-gradient(40% 35% at 85% 15%, color-mix(in oklab, var(--thc-pe) 14%, transparent), transparent 70%), radial-gradient(40% 35% at 12% 30%, color-mix(in oklab, var(--thc-ce) 12%, transparent), transparent 70%)",
        }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-2 flex flex-col items-center gap-6 lg:order-1 lg:items-start"
        >
          <CandlestickAnimation className="h-[220px] w-full max-w-md sm:h-[280px]" />
          <AccuracyTarget />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-1 text-center lg:order-2 lg:text-left"
        >
          <p className="mb-4 inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-muted-foreground">
            Intraday Options Signals · CE &amp; PE
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Trade with <span className="thc-gold-text">accuracy</span> and{" "}
            <span className="thc-gold-text">consistency</span>
          </h1>
          <div className="mx-auto mt-6 max-w-xl lg:mx-0">
            <h2 className="font-heading text-xl font-bold sm:text-2xl">
              Precision, <span className="thc-gold-text">not luck</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Every call gets a defined entry, stop loss, and target before it&apos;s posted — no
              vague hunches, no moving the goalposts after the fact. Our live Win Rate and Total
              Capture % below are the same numbers you can verify on the{" "}
              <Link href="/dashboard" className="text-primary underline underline-offset-2">
                Dashboard
              </Link>
              , trade by trade.
            </p>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0">
            Traders Hub Center publishes transparent, intraday options-buying calls to premium
            subscribers — every entry, stop loss and target tracked in the open.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button asChild size="lg" className="thc-glow thc-btn-gradient">
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4"
      >
        {statItems.map((stat) => (
          <div
            key={stat.label}
            className="thc-glass thc-glow relative overflow-hidden rounded-xl border border-white/5 px-4 py-5 text-center"
          >
            <span
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ backgroundImage: "var(--thc-gold-gradient)" }}
            />
            <p className="font-heading text-2xl font-bold thc-gold-text sm:text-3xl">
              <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
