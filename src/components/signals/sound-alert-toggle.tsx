"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "thc-sound-alerts-enabled";
const POLL_INTERVAL_MS = 15000;

function playAlertTone(ctx: AudioContext) {
  const now = ctx.currentTime;
  const notes = [660, 880, 1320];
  const noteGap = 0.14;
  const noteDuration = 0.18;

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const start = now + i * noteGap;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.4, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, start + noteDuration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + noteDuration + 0.02);
  });
}

export function SoundAlertToggle({ initialUpdatedAt }: { initialUpdatedAt: string | null }) {
  const [enabled, setEnabled] = useState(false);
  const [justAlerted, setJustAlerted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastSeenRef = useRef<string | null>(initialUpdatedAt);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/signals/latest-update", { cache: "no-store" });
        if (!res.ok) return;
        const data: { updatedAt: string | null } = await res.json();
        if (
          data.updatedAt &&
          (!lastSeenRef.current || new Date(data.updatedAt) > new Date(lastSeenRef.current))
        ) {
          lastSeenRef.current = data.updatedAt;
          if (audioCtxRef.current) {
            playAlertTone(audioCtxRef.current);
            setJustAlerted(true);
            setTimeout(() => setJustAlerted(false), 1500);
          }
        }
      } catch {
        // transient network error — next poll retries
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [enabled]);

  function handleToggle() {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(STORAGE_KEY, String(next));

    if (next) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      playAlertTone(audioCtxRef.current);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={enabled}
      title={
        enabled
          ? "Sound alerts on — click to mute"
          : "Click to get a sound alert whenever admin posts or updates a signal"
      }
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
        enabled
          ? "border-[var(--thc-win)]/50 bg-[var(--thc-win)]/10 text-[var(--thc-win)]"
          : "border-white/10 text-muted-foreground hover:text-foreground",
        justAlerted && "animate-pulse",
      )}
    >
      {enabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
    </button>
  );
}
