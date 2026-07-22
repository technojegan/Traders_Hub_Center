export const INSTAGRAM_URL = "https://www.instagram.com/traders_hub_center_/";
export const WHATSAPP_URL = "https://chat.whatsapp.com/IuWT73Az2LN9i3cfG4pLnY";
export const TELEGRAM_URL = "https://t.me/traders_hub_center";

// Soft-gate demo credentials shown on the admin login page — not real
// security, just enough friction to keep casual visitors out. Remove this
// export (and its use in login-form.tsx) once real access control matters.
export const DEMO_ADMIN_CREDENTIALS = {
  email: "admin@demo.com",
  password: "admin$123",
};

export const BATCH_INFO = {
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
};

export const PAYMENT_INFO = {
  upiIds: [
    { vpa: "7603969363@kvb", name: "Sheela Murugesan" },
    { vpa: "Q805542603@ybl", name: "Ragul V" },
  ],
  managers: [
    { name: "Vikram", phone: "+91 7603969363" },
    { name: "Ragul", phone: "+91 8524079447" },
  ],
};

export interface Testimonial {
  name: string;
  role: string;
  date: string;
  quote: string;
}

// Quotes are still placeholder text — swap for real subscriber reviews once
// collected. Names are real subscribers/referrals supplied for the site.
export const TESTIMONIALS: Testimonial[] = [
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
];

export interface InstagramThumbnail {
  thumbnailUrl: string;
  videoUrl: string;
  label: string;
}

// thumbnailUrl is still a placeholder graphic — swap for a real screenshot
// (drop a file in public/instagram/ and point to it here) whenever one's
// supplied. videoUrl below points at the real highlights already given.
export const INSTAGRAM_THUMBNAILS: InstagramThumbnail[] = [
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
];
