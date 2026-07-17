"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { INSTAGRAM_THUMBNAILS } from "@/lib/constants";

export function InstagramGrid() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Watch us <span className="thc-gold-text">in action</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A few reels from our Instagram — tap any thumbnail to watch.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {INSTAGRAM_THUMBNAILS.map((item, i) => (
            <motion.a
              key={item.videoUrl + item.label}
              href={item.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="thc-glow group overflow-hidden rounded-xl border border-white/5"
            >
              <div className="relative aspect-[4/5] w-full bg-card">
                <Image
                  src={item.thumbnailUrl}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="thc-glass px-3 py-2 text-xs font-medium text-foreground">
                {item.label}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
