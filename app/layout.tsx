"use client";

import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import { Sora, Space_Grotesk } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BottomCTA from "@/components/bottom-cta";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const soraFont = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: "variable",
});
const spaceGroteskFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: "variable",
});

export const metadata: Metadata = {
  title: {
    template: "TTRidz",
    default: "TTRidz | Car Marketplace",
  },
  description: "TTRidz is a Marketplace to Buy and Sell new and Used Cars.",
  keywords: [
    "car", "cars", "SUV", "sedan", "hatchback", "pickup", "truck", "buy car", "sell car",
    "used car", "new car", "car marketplace", "car dealership", "car listings",
    "car sales", "car buying", "car selling", "car search", "car search engine",
    "car reviews", "car prices", "car deals", "car offers", "car inventory",
  ],
  category: "Business",
  metadataBase: new URL("https://www.ttridz.com"),
  openGraph: {
    title: "TTRidz | Car Marketplace",
    description: "Car Marketplace.",
    url: "https://www.ttridz.com",
    images: [
      {
        url: "/logo.png",
        alt: "TTRidz Logo",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    title: "TTRidz | Car Marketplace",
    description: "Car Marketplace.",
    images: [
      {
        url: "/logo.png",
        alt: "TTRidz Logo",
        width: 1200,
        height: 630,
      },
    ],
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Only hide the header on /select
  const hideHeaderOn = ["/select", "/dealer-dashboard"];

  const shouldHideHeader = hideHeaderOn.includes(pathname);
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="robots" content="index, follow" />
        </head>
        <body
          className={`${soraFont.variable} ${spaceGroteskFont.variable} antialiased`}
        >
          {!shouldHideHeader && <Header />}
          {children}
          <BottomCTA />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
