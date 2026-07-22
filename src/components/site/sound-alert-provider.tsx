"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const STORAGE_KEY = "thc-sound-alerts-enabled";

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

// Bigger, more distinct chime for a brand-new signal entry — a wider
// ascending arpeggio at a louder gain than the regular update blip, so a
// fresh call reads as a bigger deal than an in-progress note edit.
function playNewSignalTone(ctx: AudioContext) {
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 784, 1046.5, 1318.5];
  const noteGap = 0.11;
  const noteDuration = 0.32;

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    const start = now + i * noteGap;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.55, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + noteDuration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + noteDuration + 0.02);
  });
}

interface SoundAlertContextValue {
  enabled: boolean;
  justAlerted: boolean;
  toggle: () => void;
}

const SoundAlertContext = createContext<SoundAlertContextValue | null>(null);

export function SoundAlertProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [justAlerted, setJustAlerted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      setEnabled(true);
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // A freshly created AudioContext starts "suspended" until a user
    // gesture — this covers sound restored from a previous visit, where
    // there's no fresh toggle click to satisfy the browser's autoplay policy.
    function resumeOnInteraction() {
      if (audioCtxRef.current?.state === "suspended") {
        audioCtxRef.current.resume();
      }
    }
    document.addEventListener("click", resumeOnInteraction);
    document.addEventListener("keydown", resumeOnInteraction);

    const supabase = createSupabaseBrowserClient();
    const channel = supabase
      .channel("signal-alerts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Signal" },
        (payload) => {
          if (audioCtxRef.current) {
            if (payload.eventType === "INSERT") {
              playNewSignalTone(audioCtxRef.current);
            } else {
              playAlertTone(audioCtxRef.current);
            }
            setJustAlerted(true);
            setTimeout(() => setJustAlerted(false), 1500);
          }
        },
      )
      .subscribe();

    return () => {
      document.removeEventListener("click", resumeOnInteraction);
      document.removeEventListener("keydown", resumeOnInteraction);
      supabase.removeChannel(channel);
    };
  }, [enabled]);

  function toggle() {
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
    <SoundAlertContext.Provider value={{ enabled, justAlerted, toggle }}>
      {children}
    </SoundAlertContext.Provider>
  );
}

export function useSoundAlert() {
  const ctx = useContext(SoundAlertContext);
  if (!ctx) {
    throw new Error("useSoundAlert must be used within a SoundAlertProvider");
  }
  return ctx;
}
