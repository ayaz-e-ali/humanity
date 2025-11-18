import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import AmbientAudio from "@/components/AmbientAudio";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weights: ["400", "700"],
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "From Spirit to Human",
  description: "an assignment for BrainTech company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${sourceSans.variable} antialiased`}>
        <SmoothScroll />
        <AmbientAudio />

        {children}
      </body>
    </html>
  );
}
