import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(dateTimeStr: string): string {
  if (!dateTimeStr) return "";
  
  // Handle different date formats
  let time;
  if (dateTimeStr.length === 4) {
    // Format like "0800"
    time = `${dateTimeStr.substring(0, 2)}:${dateTimeStr.substring(2, 4)}`;
  } else {
    // Try to parse as ISO date string
    try {
      const date = new Date(dateTimeStr);
      time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      time = dateTimeStr;
    }
  }
  return time;
}

export function generateSessionId(): string {
  return Date.now().toString();
}

export function limitHistory(history: { user: string; bot: string }[], limit = 5): { user: string; bot: string }[] {
  if (history.length <= limit) return history;
  return history.slice(history.length - limit);
}
