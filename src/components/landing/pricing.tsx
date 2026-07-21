"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BATCH_INFO } from "@/lib/constants";

export function Pricing() {
  const dateRange = `${new Date(BATCH_INFO.startDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  })} – ${new Date(BATCH_INFO.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`;

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Join the <span className="thc-gold-text">{BATCH_INFO.batchNumber}th Batch</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Every call, live Zoom session, and WhatsApp signal — one flat price.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="thc-glass thc-gold-border thc-glow mt-10 rounded-2xl p-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-heading text-4xl font-bold thc-gold-text">
              ₹{BATCH_INFO.priceInr.toLocaleString("en-IN")}
            </p>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
              Batch runs {dateRange}
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
      </div>
    </section>
  );
}
