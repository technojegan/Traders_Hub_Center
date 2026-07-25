"use client";

import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { getLatestAdminUpdate } from "@/app/admin/(protected)/signals/actions";
import { INSTRUMENT_LABEL, type InstrumentLiteral } from "@/lib/instruments";

const LAST_SEEN_KEY = "thc-notifications-last-seen-id";
const CLEARED_ID_KEY = "thc-notifications-cleared-id";

interface UpdateItem {
  id: string;
  strike: number;
  optionType: string;
  instrument: InstrumentLiteral | null;
  message: string;
  createdAt: string;
}

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [latest, setLatest] = useState<UpdateItem | null>(null);
  const [isUnread, setIsUnread] = useState(false);
  const [clearedId, setClearedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  async function load() {
    const data = await getLatestAdminUpdate();
    setLatest(data);

    const lastSeenId = localStorage.getItem(LAST_SEEN_KEY);
    setIsUnread(!!data && data.id !== lastSeenId);
  }

  useEffect(() => {
    setClearedId(localStorage.getItem(CLEARED_ID_KEY));
    load();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  async function handleToggle() {
    const next = !open;
    setOpen(next);
    if (next) {
      const data = await getLatestAdminUpdate();
      setLatest(data);
      if (data) localStorage.setItem(LAST_SEEN_KEY, data.id);
      setIsUnread(false);
    }
  }

  function handleClear() {
    if (!latest) return;
    localStorage.setItem(CLEARED_ID_KEY, latest.id);
    setClearedId(latest.id);
  }

  const visible = latest && latest.id !== clearedId ? latest : null;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Notifications"
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
      >
        <Bell className="h-4 w-4" />
        {isUnread && (
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[var(--thc-loss)]" />
        )}
      </button>

      {open && (
        <div className="thc-glass absolute right-0 top-11 z-50 w-72 rounded-xl border border-white/10 p-3 shadow-xl sm:w-80">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-heading text-sm font-semibold">Latest Update</p>
            {visible && (
              <button
                type="button"
                onClick={handleClear}
                className="text-[10px] font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Clear
              </button>
            )}
          </div>
          {visible == null ? (
            <p className="py-4 text-center text-xs text-muted-foreground">
              No updates yet — they&apos;ll show up here as trades are updated.
            </p>
          ) : (
            <div className="rounded-lg border border-white/5 bg-black/20 p-2.5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-heading text-xs font-bold thc-gold-text">
                  {visible.instrument ? `${INSTRUMENT_LABEL[visible.instrument]} ` : ""}
                  {visible.strike} {visible.optionType}
                </span>
                <span className="shrink-0 text-[10px] text-muted-foreground">
                  {new Date(visible.createdAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </div>
              <p className="mt-1 whitespace-normal break-words text-xs text-foreground/90">
                {visible.message}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
