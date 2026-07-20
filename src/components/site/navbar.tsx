import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/signals", label: "Past Signals" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 thc-glass">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/login"
            className="hidden text-xs text-muted-foreground/70 transition-colors hover:text-primary sm:inline"
          >
            Admin
          </Link>
          <Button asChild size="sm" className="thc-glow thc-btn-gradient">
            <Link href="/register">Register Premium</Link>
          </Button>
        </div>
      </div>
      <nav className="flex items-center gap-4 overflow-x-auto border-t border-white/5 px-4 py-2 md:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
