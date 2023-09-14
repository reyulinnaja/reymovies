import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { Navbar, Sidebar } from "@/components/common";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${poppins.className} `}>
        <Navbar />
        <Sidebar />
        <div className="w-full pb-7 pl-56 pr-8 pt-16">
          <Component {...pageProps} />
        </div>
      </div>
    </QueryClientProvider>
  );
}
