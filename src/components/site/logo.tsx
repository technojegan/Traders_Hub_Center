import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      <Image
        src="/thc-logo.jpg"
        alt="Traders Hub Center"
        width={56}
        height={56}
        className="h-12 w-12 rounded-full shadow-[0_2px_16px_-4px_var(--thc-gold-start)] transition-transform group-hover:scale-105 sm:h-14 sm:w-14"
        priority
      />
      <span className="font-heading text-lg font-bold tracking-tight sm:text-xl">
        <span className="thc-gold-text">Traders</span>{" "}
        <span className="text-foreground">Hub Center</span>
      </span>
    </Link>
  );
}
