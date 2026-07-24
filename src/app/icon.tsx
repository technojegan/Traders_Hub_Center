import { readFile } from "node:fs/promises";
import path from "node:path";
import { clientConfig } from "@/lib/client-config";

export const size = { width: 32, height: 32 };
export const contentType = "image/jpeg";

export default async function Icon() {
  const filePath = path.join(process.cwd(), "public", clientConfig.faviconSrc);
  const data = await readFile(filePath);
  return new Response(data, {
    headers: { "Content-Type": contentType },
  });
}
