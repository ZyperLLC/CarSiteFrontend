"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BottomCTA from "@/components/bottom-cta";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide header on /select, auth pages, and any dashboard page
  const shouldHideHeader =
    pathname.startsWith("/select") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.includes("dashboard");

  // Optional: Hide BottomCTA and Footer on dashboards and auth pages
  const shouldHideFooterAndCTA =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.includes("dashboard");

  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
      <BottomCTA />
      <Footer />
    </>
  );
}
