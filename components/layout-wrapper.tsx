"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BottomCTA from "@/components/bottom-cta";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide all layout parts (Header, Footer, BottomCTA)
  const shouldHideAll =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/payment");

  // Hide Header + BottomCTA (but keep Footer)
  const shouldHideHeaderAndCTA = pathname.startsWith("/sellers") || pathname.startsWith("/select");

  return (
    <>
      {!shouldHideAll && !shouldHideHeaderAndCTA && <Header />}
      {children}
      {!shouldHideAll && !shouldHideHeaderAndCTA && <BottomCTA />}
      {!shouldHideAll && <Footer />}
    </>
  );
}
