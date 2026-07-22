"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocEntry {
  id: string;
  label: string;
}

export function TocSidebar({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState(entries[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observedEntries) => {
        for (const entry of observedEntries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    entries.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav className="sticky top-28 hidden max-h-[calc(100vh-8rem)] w-56 shrink-0 overflow-y-auto lg:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        On this page
      </p>
      <ul className="flex flex-col gap-1 border-l border-white/10">
        {entries.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                "-ml-px block border-l-2 py-1 pl-3 text-sm transition-colors",
                activeId === id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
