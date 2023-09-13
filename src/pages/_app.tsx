import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { Navbar, Sidebar } from "@/components/common";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${poppins.className}`}>
      <Navbar />
      <Sidebar />
      <div className="w-full pb-7 pl-52 pr-4 pt-4">
        <Component {...pageProps} />
      </div>
    </main>
  );
}
