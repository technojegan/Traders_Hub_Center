import Image from "next/image";
import { clientConfig } from "@/lib/client-config";

export function InstagramGrid() {
  // Duplicated 4x (not 2x): with only 5 thumbnails, one copy is narrower than
  // most desktop viewports, so a 2x loop ran out of content and visibly
  // paused/jumped right before resetting. 4 copies keeps the -50% keyframe
  // (still exactly "one half of the track") wide enough to always fill the
  // viewport during the whole animation cycle.
  const { instagramThumbnails } = clientConfig;
  const items = [
    ...instagramThumbnails,
    ...instagramThumbnails,
    ...instagramThumbnails,
    ...instagramThumbnails,
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          Watch us <span className="thc-gold-text">in action</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Reels from our Instagram — tap any thumbnail to watch.
        </p>
      </div>

      <div
        className="relative mt-10 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className="thc-marquee-track flex w-max"
          style={{ ["--thc-marquee-duration" as string]: "56s" }}
        >
          {items.map((item, i) => (
            <a
              key={`${item.videoUrl}-${i}`}
              href={item.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="thc-glow group mr-4 w-40 shrink-0 overflow-hidden rounded-xl border border-white/5 sm:w-48"
            >
              <div className="relative aspect-[4/5] w-full bg-card">
                <Image
                  src={item.thumbnailUrl}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="thc-glass px-2.5 py-2 text-xs font-medium text-foreground">
                {item.label}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
