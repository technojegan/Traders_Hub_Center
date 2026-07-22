"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

export function RefreshButton({ className }: { className?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRefresh() {
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleRefresh}
      disabled={isPending}
      title="Refresh"
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-60",
        className,
      )}
    >
      <RotateCw className={cn("h-4 w-4", isPending && "animate-spin")} />
    </button>
  );
}
