"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/site/icons";
import { BATCH_INFO, WHATSAPP_URL } from "@/lib/constants";

function DhanOfferCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="thc-glass thc-glow relative overflow-hidden rounded-2xl border border-white/5 p-6 text-center lg:max-w-xs"
    >
      <span
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ backgroundImage: "var(--thc-gold-gradient)" }}
      />
      <p className="font-heading text-lg font-bold">
        Open a Demat account with <span className="thc-gold-text">Dhan</span> 🔥
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Don&apos;t miss it — pick either offer:
      </p>

      <div className="mt-4 flex flex-col gap-2.5 text-sm">
        <div className="rounded-lg border border-[var(--thc-win)]/40 bg-[var(--thc-win)]/10 px-3 py-2">
          <span className="font-semibold text-[var(--thc-win)]">₹500 off</span>{" "}
          <span className="text-foreground/90">your next premium batch</span>
        </div>
        <p className="text-center text-xs text-muted-foreground">— or —</p>
        <div className="rounded-lg border border-[var(--thc-win)]/40 bg-[var(--thc-win)]/10 px-3 py-2">
          <span className="font-semibold text-[var(--thc-win)]">15% off</span>{" "}
          <span className="text-foreground/90">your brokerage</span>
        </div>
      </div>

      <div className="mt-5 border-t border-white/5 pt-4">
        <p className="text-sm font-medium text-foreground">Already have a Dhan account?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Refer friends &amp; family and get a{" "}
          <span className="font-semibold text-primary">free premium group</span> for the next
          batch.
        </p>
        <ul className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
          <li>• Minimum 10 referrals</li>
          <li>• Minimum 50 trades in 1 account</li>
        </ul>
      </div>

      <Button asChild size="sm" variant="outline" className="thc-glow mt-5 w-full">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon className="h-4 w-4" />
          Grab this offer
        </a>
      </Button>
    </motion.div>
  );
}

export function Pricing() {
  const dateRange = `${new Date(BATCH_INFO.startDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  })} – ${new Date(BATCH_INFO.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`;

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Join the <span className="thc-gold-text">{BATCH_INFO.batchNumber}th Batch</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Every call, live Zoom session, and WhatsApp signal — one flat price.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="thc-glass thc-gold-border thc-glow rounded-2xl p-8 lg:max-w-xl lg:flex-1"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-heading text-4xl font-bold thc-gold-text">
              ₹{BATCH_INFO.priceInr.toLocaleString("en-IN")}
            </p>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
              Batch runs {dateRange}
            </span>
          </div>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--thc-win)]/40 bg-[var(--thc-win)]/10 px-3 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--thc-win)]" />
            <span className="text-foreground/90">
              2nd month onwards for Existing members:{" "}
              <span className="font-semibold text-[var(--thc-win)]">
                ₹{BATCH_INFO.existingMemberPriceInr.toLocaleString("en-IN")} only
              </span>
            </span>
          </div>

          <ul className="mt-6 flex flex-col gap-2.5 text-sm">
            {BATCH_INFO.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-foreground/90">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:grid-cols-2">
            <div>
              <p className="font-medium text-foreground">Live Zoom timings</p>
              <p>{BATCH_INFO.zoomTimings.join(" · ")}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">WhatsApp signal hours</p>
              <p>{BATCH_INFO.whatsappTimings}</p>
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            We don&apos;t promise a return number — check our actual{" "}
            <Link href="/dashboard" className="text-primary underline underline-offset-2">
              Win Rate and Total Capture %
            </Link>{" "}
            above, computed live from every signal we&apos;ve published. {BATCH_INFO.refundPolicy}
          </p>

          <Button asChild size="lg" className="thc-glow thc-btn-gradient mt-6 w-full">
            <Link href="/register">Register for this Batch</Link>
          </Button>
        </motion.div>

          <DhanOfferCard />
        </div>
      </div>
    </section>
  );
}
