"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BottomCTA from "@/components/bottom-cta";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide all layout parts (Header, Footer, BottomCTA)
  const shouldHideAll =
    pathname.startsWith("/auth/individual") ||
    pathname.startsWith("/auth/dealer");

  // Hide Header + BottomCTA (but keep Footer)
  const shouldHideHeaderAndCTA = pathname.startsWith("/dealer-dashboard")||
    pathname.startsWith("/payment");
;

  // Hide only Header
  const shouldHideHeaderOnly = pathname.startsWith("/select");

  return (
    <>
      {!shouldHideAll && !shouldHideHeaderOnly && !shouldHideHeaderAndCTA && <Header />}
      {children}
      {!shouldHideAll && !shouldHideHeaderAndCTA && <BottomCTA />}
      {!shouldHideAll && <Footer />}
    </>
  );
}
