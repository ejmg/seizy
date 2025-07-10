import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function trimIsoForDateTimeLocal(isoString: string) {
  return isoString.slice(0, 16);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
