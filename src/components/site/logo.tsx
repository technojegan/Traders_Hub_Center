import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg thc-gold-border font-heading text-sm font-bold text-primary transition-transform group-hover:scale-105">
        THC
      </span>
      <span className="font-heading text-lg font-bold tracking-tight text-foreground">
        Traders Hub Center
      </span>
    </Link>
  );
}
