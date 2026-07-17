import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/site/icons";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-card/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Traders Hub Center on Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join Traders Hub Center on WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/5 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Traders Hub Center. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/register" className="hover:text-primary">
              Register Premium
            </Link>
            <Link href="/signals" className="hover:text-primary">
              Past Signals
            </Link>
          </div>
        </div>

        <p className="text-xs text-muted-foreground/70">
          Disclaimer: All content on this site is for educational purposes only and does
          not constitute investment advice. Trading in options involves substantial risk of
          loss and is not suitable for every investor. Past performance is not indicative
          of future results.
        </p>
      </div>
    </footer>
  );
}
