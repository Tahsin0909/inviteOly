import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTo12Hour(timeStr?: string): string {
  if (!timeStr) return "";
  const trimmed = timeStr.trim();
  if (!trimmed) return "";
  if (/AM|PM/i.test(trimmed)) return trimmed;
  const parts = trimmed.split(":");
  if (parts.length < 2) return trimmed;
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  if (isNaN(hours)) return trimmed;
  const modifier = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${modifier}`;
}
