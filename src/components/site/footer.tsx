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
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <Link href="/signals" className="hover:text-primary">
              Signals
            </Link>
            <Link href="/contact" className="hover:text-primary">
              Contact
            </Link>
            <Link href="/faq" className="hover:text-primary">
              FAQ
            </Link>
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              T &amp; C
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-xs text-muted-foreground/70">
          <p className="font-medium text-muted-foreground">SEBI Disclaimer</p>
          <p>
            This service is conducted strictly for educational and learning purposes. We are
            not a SEBI-registered Research Analyst or Investment Adviser. No stock, index,
            option, or derivative discussed here should be considered a buy or sell
            recommendation.
          </p>
          <p>
            Never borrow money or trade with funds you cannot afford to lose. Each
            participant is solely responsible for their own trading decisions, profits, and
            losses. Trade only after understanding the strategy and always follow proper risk
            management. Capital protection first, profits come next. Past performance is not
            indicative of future results.
          </p>
          <p>
            Full{" "}
            <Link href="/terms" className="text-primary underline underline-offset-2">
              Terms &amp; Conditions
            </Link>{" "}
            apply to every batch and membership.
          </p>
        </div>
      </div>
    </footer>
  );
}
