// Which brand this deployment renders as — set NEXT_PUBLIC_CLIENT in each
// Vercel project's env vars. Same repo/branch, different deployment picks a
// different entry below. See CLAUDE.md/AGENTS.md history for the multi-client
// deployment model this supports.
export type ClientId = "thc" | "stockops";

export interface BatchInfo {
  batchNumber: number;
  priceInr: number;
  existingMemberPriceInr: number;
  startDate: string;
  endDate: string;
  zoomTimings: string[];
  whatsappTimings: string;
  benefits: string[];
  refundPolicy: string;
}

export interface PaymentInfo {
  upiIds: { vpa: string; name: string }[];
  managers: { name: string; phone: string }[];
}

export interface Testimonial {
  name: string;
  role: string;
  date: string;
  quote: string;
}

export interface InstagramThumbnail {
  thumbnailUrl: string;
  videoUrl: string;
  label: string;
}

export interface ClientConfig {
  id: ClientId;
  // Gate on /admin/* login + auth-checked server actions. Set false only for
  // a deployment that's intentionally left open (e.g. a fresh client still
  // being configured) — never flip THC's to false, its admin manages real
  // subscriber/signal data.
  requireAdminAuth: boolean;
  siteName: string;
  siteNameShort: string;
  siteDescription: string;
  logoSrc: string;
  logoAlt: string;
  faviconSrc: string;
  goldStart: string;
  goldEnd: string;
  instagramUrl: string;
  whatsappUrl: string;
  telegramUrl: string;
  // Empty string means "not shown" — only render a Facebook link/icon when set.
  facebookUrl: string;
  // Overrides the default "{batchNumber}th Batch" pricing headline when a
  // client doesn't use THC's batch model.
  pricingHeadline?: string;
  dhanOfferEnabled: boolean;
  batchInfo: BatchInfo;
  paymentInfo: PaymentInfo;
  testimonials: Testimonial[];
  instagramThumbnails: InstagramThumbnail[];
}

const CLIENTS: Record<ClientId, ClientConfig> = {
  thc: {
    id: "thc",
    requireAdminAuth: true,
    siteName: "Traders Hub Center",
    siteNameShort: "THC",
    siteDescription:
      "Traders Hub Center (THC) publishes intraday options-buying trade signals to premium subscribers, backed by transparent performance analytics.",
    logoSrc: "/thc-logo.jpg",
    logoAlt: "Traders Hub Center",
    faviconSrc: "/thc-favicon.jpg",
    goldStart: "#d4af37",
    goldEnd: "#f0c949",
    instagramUrl: "https://www.instagram.com/traders_hub_center_/",
    whatsappUrl: "https://chat.whatsapp.com/IuWT73Az2LN9i3cfG4pLnY",
    telegramUrl: "https://t.me/traders_hub_center",
    facebookUrl: "",
    dhanOfferEnabled: true,
    batchInfo: {
      batchNumber: 13,
      priceInr: 4999,
      existingMemberPriceInr: 2999,
      startDate: "2026-07-16",
      endDate: "2026-08-15",
      zoomTimings: ["9:00 AM – 11:30 AM", "2:00 PM – 3:30 PM"],
      whatsappTimings: "9:15 AM – 3:30 PM",
      benefits: [
        "Unlimited intraday CE/PE calls on WhatsApp during market hours",
        "Live Zoom sessions — trades explained and copy-traded live",
        "Better to avoid Friday market high premiums",
      ],
      refundPolicy: "Refund not applicable once a batch has started.",
    },
    paymentInfo: {
      upiIds: [
        { vpa: "7603969363@kvb", name: "Sheela Murugesan" },
        { vpa: "Q805542603@ybl", name: "Ragul V" },
      ],
      managers: [
        { name: "Vikram", phone: "+91 7603969363" },
        { name: "Ragul", phone: "+91 8524079447" },
      ],
    },
    // Quotes are still placeholder text — swap for real subscriber reviews
    // once collected. Names are real subscribers/referrals supplied for the
    // site.
    testimonials: [
      {
        name: "Veeramanikandan",
        role: "Premium Trader",
        date: "18 Jul 2026",
        quote:
          "Every call comes with an exact entry, SL and target — no guesswork. Been following for 2 batches now.",
      },
      {
        name: "Perumal Madhumani",
        role: "Premium Trader",
        date: "15 Jul 2026",
        quote:
          "What I like most is they track every signal openly on the dashboard, wins and losses both.",
      },
      {
        name: "Pavithran Krishnan",
        role: "Premium Trader",
        date: "12 Jul 2026",
        quote:
          "Live Zoom sessions actually explain the reasoning behind each trade, not just the call.",
      },
      {
        name: "Madesh Kaliyappan",
        role: "Premium Trader",
        date: "10 Jul 2026",
        quote: "Signals come on time during market hours, entries and SL are always clear.",
      },
      {
        name: "Kiran Venkataraj",
        role: "Premium Trader",
        date: "05 Jul 2026",
        quote:
          "Transparent track record is what convinced me — the win rate on the dashboard is real, not marketing.",
      },
      {
        name: "Harikrishnan Sriram",
        role: "Premium Trader",
        date: "02 Jul 2026",
        quote: "Good risk management focus — they always remind capital protection first.",
      },
    ],
    // thumbnailUrl is still a placeholder graphic — swap for a real screenshot
    // (drop a file in public/instagram/ and point to it here) whenever one's
    // supplied. videoUrl below points at the real highlights already given.
    instagramThumbnails: [
      {
        thumbnailUrl: "/instagram/placeholder-1.svg",
        videoUrl: "https://www.instagram.com/stories/highlights/17892270870592994/",
        label: "How we call intraday CE/PE entries",
      },
      {
        thumbnailUrl: "/instagram/placeholder-2.svg",
        videoUrl: "https://www.instagram.com/stories/highlights/18119944411893165/",
        label: "Reading SL & target levels",
      },
      {
        thumbnailUrl: "/instagram/placeholder-3.svg",
        videoUrl: "https://www.instagram.com/stories/highlights/18101528660276766/",
        label: "Inside a winning trade, start to finish",
      },
      {
        thumbnailUrl: "/instagram/placeholder-4.svg",
        videoUrl: "https://www.instagram.com/stories/highlights/17911968051401087/",
        label: "Risk management on options buying",
      },
      {
        thumbnailUrl: "/instagram/placeholder-5.svg",
        videoUrl: "https://www.instagram.com/stories/highlights/17962075925922683/",
        label: "More from Traders Hub Center",
      },
    ],
  },

  // Everything below is a placeholder pending real StockOps input — brand
  // assets, colors, social links, pricing, and payment details all need to be
  // swapped for the real thing before this deployment goes live. Never reuse
  // another client's payment/social identifiers here.
  stockops: {
    id: "stockops",
    // Temporary — admin area is open with no login while StockOps is being
    // set up. Flip back to true before this deployment handles real data.
    requireAdminAuth: false,
    siteName: "StockOps",
    siteNameShort: "StockOps",
    siteDescription:
      "StockOps publishes intraday options-buying trade signals to premium subscribers, backed by transparent performance analytics.",
    logoSrc: "/stockops-icon.jpg",
    logoAlt: "StockOps",
    faviconSrc: "/stockops-icon.jpg",
    goldStart: "#3b82f6",
    goldEnd: "#60a5fa",
    instagramUrl: "https://www.instagram.com/stoc_kops/",
    whatsappUrl: "#",
    telegramUrl: "https://t.me/stockopstradingcommunity",
    facebookUrl: "https://www.facebook.com/profile.php?id=61565474030137",
    pricingHeadline: "Premium Community",
    dhanOfferEnabled: false,
    batchInfo: {
      batchNumber: 1,
      priceInr: 3999,
      existingMemberPriceInr: 0,
      startDate: "2026-01-01",
      endDate: "2026-01-31",
      zoomTimings: ["9:00 AM – 11:30 AM", "2:00 PM – 3:30 PM"],
      whatsappTimings: "9:15 AM – 3:30 PM",
      benefits: ["TODO: list StockOps membership benefits"],
      refundPolicy: "TODO: set refund policy.",
    },
    paymentInfo: {
      upiIds: [{ vpa: "TODO@upi", name: "TODO: StockOps payee name" }],
      managers: [{ name: "TODO: StockOps manager", phone: "+91 00000 00000" }],
    },
    testimonials: [
      {
        name: "Sample Trader",
        role: "Premium Member",
        date: "01 Jan 2026",
        quote: "Placeholder testimonial — replace with a real StockOps subscriber quote.",
      },
      {
        name: "Sample Member",
        role: "Premium Member",
        date: "01 Jan 2026",
        quote: "Placeholder testimonial — replace with a real StockOps subscriber quote.",
      },
    ],
    instagramThumbnails: [
      {
        thumbnailUrl: "/instagram/placeholder-1.svg",
        videoUrl: "#",
        label: "Placeholder — add a real StockOps reel",
      },
      {
        thumbnailUrl: "/instagram/placeholder-2.svg",
        videoUrl: "#",
        label: "Placeholder — add a real StockOps reel",
      },
    ],
  },
};

const CLIENT_ID = ((process.env.NEXT_PUBLIC_CLIENT as ClientId | undefined) ?? "thc") in CLIENTS
  ? ((process.env.NEXT_PUBLIC_CLIENT as ClientId | undefined) ?? "thc")
  : "thc";

export const clientConfig: ClientConfig = CLIENTS[CLIENT_ID];
