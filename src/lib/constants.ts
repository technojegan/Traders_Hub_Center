export const INSTAGRAM_URL = "https://www.instagram.com/traders_hub_center_/";
export const WHATSAPP_URL = "https://chat.whatsapp.com/IuWT73Az2LN9i3cfG4pLnY";

export const BATCH_INFO = {
  batchNumber: 13,
  priceInr: 4999,
  startDate: "2026-07-16",
  endDate: "2026-08-15",
  zoomTimings: ["9:00 AM – 11:30 AM", "2:00 PM – 3:30 PM"],
  whatsappTimings: "9:15 AM – 3:30 PM",
  benefits: [
    "Unlimited intraday CE/PE calls on WhatsApp during market hours",
    "Live Zoom sessions — trades explained and copy-traded live",
    "Every Friday off",
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

export interface InstagramThumbnail {
  thumbnailUrl: string;
  videoUrl: string;
  label: string;
}

// Placeholder entries — swap thumbnailUrl/videoUrl/label with real Instagram
// reels once they're supplied. Add or remove entries freely.
export const INSTAGRAM_THUMBNAILS: InstagramThumbnail[] = [
  {
    thumbnailUrl: "/instagram/placeholder-1.svg",
    videoUrl: INSTAGRAM_URL,
    label: "How we call intraday CE/PE entries",
  },
  {
    thumbnailUrl: "/instagram/placeholder-2.svg",
    videoUrl: INSTAGRAM_URL,
    label: "Reading SL & target levels",
  },
  {
    thumbnailUrl: "/instagram/placeholder-3.svg",
    videoUrl: INSTAGRAM_URL,
    label: "Inside a winning trade, start to finish",
  },
  {
    thumbnailUrl: "/instagram/placeholder-4.svg",
    videoUrl: INSTAGRAM_URL,
    label: "Risk management on options buying",
  },
];
