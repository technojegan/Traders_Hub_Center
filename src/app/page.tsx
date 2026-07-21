import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/landing/hero";
import { TrustStats } from "@/components/landing/trust-stats";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { InstagramGrid } from "@/components/landing/instagram-grid";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStats />
        <HowItWorks />
        <Pricing />
        <InstagramGrid />
      </main>
      <Footer />
    </div>
  );
}
