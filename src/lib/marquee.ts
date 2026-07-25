// Seamless marquee loop: the track is built from two identical halves and
// animated by translateX(-50%), so it always loops cleanly. But if a single
// half is narrower than the viewport, the track runs out of content before
// the loop completes and visibly stutters/jumps. Clients configure a
// different number of source items (e.g. stockops currently has only 2
// testimonials vs thc's 6), so the repeat count can't be a fixed constant —
// each half must be repeated enough to stay wider than any real viewport.
export function repeatForMarquee<T>(items: T[], minPerHalf = 12): T[] {
  if (items.length === 0) return [];
  const half = Array.from({ length: Math.max(1, Math.ceil(minPerHalf / items.length)) })
    .flatMap(() => items);
  return [...half, ...half];
}
