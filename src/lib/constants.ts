export const INSTAGRAM_URL = "https://www.instagram.com/traders_hub_center_/";
export const WHATSAPP_URL = "https://chat.whatsapp.com/IuWT73Az2LN9i3cfG4pLnY";

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
