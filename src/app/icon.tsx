import { readFile } from "node:fs/promises";
import path from "node:path";
import { clientConfig } from "@/lib/client-config";

const EXTENSION_CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export const size = { width: 32, height: 32 };
export const contentType =
  EXTENSION_CONTENT_TYPES[path.extname(clientConfig.faviconSrc)] ?? "image/jpeg";

export default async function Icon() {
  const filePath = path.join(process.cwd(), "public", clientConfig.faviconSrc);
  const data = await readFile(filePath);
  return new Response(data, {
    headers: { "Content-Type": contentType },
  });
}
