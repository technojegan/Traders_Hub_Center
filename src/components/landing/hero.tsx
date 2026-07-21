"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon, InstagramIcon } from "@/components/site/icons";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex min-h-[520px] items-center overflow-hidden px-4 py-20 sm:min-h-[600px] sm:px-6 sm:py-28 lg:px-8">
      <video
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        src="/videos/trading.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-black/70" />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--thc-gold-start) 22%, transparent), transparent 70%), radial-gradient(40% 35% at 85% 15%, color-mix(in oklab, var(--thc-pe) 14%, transparent), transparent 70%), radial-gradient(40% 35% at 12% 30%, color-mix(in oklab, var(--thc-ce) 12%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <p className="mb-4 inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-muted-foreground">
          Intraday Options Signals · CE &amp; PE
        </p>
        <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Trade with <span className="thc-gold-text">accuracy</span> and{" "}
          <span className="thc-gold-text">consistency</span>
        </h1>
        <div className="mx-auto mt-6 max-w-xl">
          <h2 className="font-heading text-xl font-bold sm:text-2xl">
            Precision, <span className="thc-gold-text">not luck</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Every call gets a defined entry, stop loss, and target before it&apos;s posted — no
            vague hunches, no moving the goalposts after the fact. Our live Win Rate and Total
            Capture % are the same numbers you can verify on the{" "}
            <Link href="/dashboard" className="text-primary underline underline-offset-2">
              Dashboard
            </Link>
            , trade by trade.
          </p>
        </div>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
          Traders Hub Center publishes transparent, intraday options-buying calls to premium
          subscribers — every entry, stop loss and target tracked in the open.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
    </section>
  );
}
