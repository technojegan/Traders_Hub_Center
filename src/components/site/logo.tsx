import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      <Image
        src="/thc-logo.jpg"
        alt="Traders Hub Center"
        width={36}
        height={36}
        className="h-9 w-9 rounded-full shadow-[0_2px_16px_-4px_var(--thc-gold-start)] transition-transform group-hover:scale-105"
        priority
      />
      <span className="font-heading text-lg font-bold tracking-tight text-foreground">
        Traders Hub Center
      </span>
    </Link>
  );
}
