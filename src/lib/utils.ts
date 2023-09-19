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

export const getLocalSessionId = () => {
  return localStorage.getItem("session_id");
};

export const getLocalRequestToken = () => {
  return localStorage.getItem("request_token");
};

export const deleteLocalSessionId = () => {
  localStorage.removeItem("session_id");
};

export const deleteLocalRequestToken = () => {
  localStorage.removeItem("request_token");
};

export const setLocalSessionId = (session_id: string) => {
  localStorage.setItem("session_id", session_id);
};

export const setLocalRequestToken = (request_token: string) => {
  localStorage.setItem("request_token", request_token);
};
