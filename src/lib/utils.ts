import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type DebounceFn = (...args: any[]) => void;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const debounce = (fn: DebounceFn, delay = 100) => {
  let timeoutID: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(...args), delay);
  };
};
