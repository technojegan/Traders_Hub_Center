import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSignalDate(date: string | Date) {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, "0")
  const month = d.toLocaleDateString("en-IN", { month: "short" })
  return `${day}${month}`
}

export function formatSignalTime(date: string | Date) {
  return new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}
