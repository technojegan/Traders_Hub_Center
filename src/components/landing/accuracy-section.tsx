"use client";

import { motion } from "framer-motion";
import { AccuracyTarget } from "@/components/landing/accuracy-target";

export function AccuracySection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl items-center gap-10 sm:grid-cols-2">
        <AccuracyTarget />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center sm:text-left"
        >
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Precision, <span className="thc-gold-text">not luck</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Every call gets a defined entry, stop loss, and target before it&apos;s posted —
            no vague hunches, no moving the goalposts after the fact. Our live Win Rate and
            Total Capture % above are the same numbers you can verify on{" "}
            <span className="text-foreground">Signals Overview</span>, trade by trade.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
