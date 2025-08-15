"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BottomCTA from "@/components/bottom-cta";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide header on /select
  const shouldHideHeader =
    pathname.startsWith("/select")


   // Pages where header, footer, and CTA should be hidden
  const hideAllLayoutParts =
    pathname === "/auth/individual" || pathname === "/auth/dealer";

  return (
    <>
      {!shouldHideHeader && !hideAllLayoutParts && <Header />}
      {children}
      {!hideAllLayoutParts && <BottomCTA />}
      {!hideAllLayoutParts && <Footer />}
    </>
  );
}
