"use client"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import {BrandLogos} from "@/components/brand-logos"
import FeaturedListings from "@/components/featured-listings"
import RoRoDealers from "@/components/roro-dealers"
import BottomCTA from "@/components/bottom-cta"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* MAIN HEADER NAVIGATION - Contains logo, menu, and search button */}
      <Header />

      {/* HERO SECTION - Main banner with search form and car image */}
      {/* CUSTOMIZATION: Edit title, subtitle, search filters, and hero image in hero-section.tsx */}
      <HeroSection />

      {/* CAR BRAND LOGOS - Horizontal strip of car manufacturer logos */}
      {/* CUSTOMIZATION: Add/remove brand logos and replace with actual brand images in brand-logos.tsx */}
      <BrandLogos />

      {/* FEATURED CAR LISTINGS - Grid of featured cars for sale */}
      {/* CUSTOMIZATION: Replace with actual car data, images, and pricing in featured-listings.tsx */}
      <FeaturedListings />

      {/* RORO CERTIFIED DEALERS SECTION - Showcase of verified dealers */}
      {/* CUSTOMIZATION: Add actual dealer information, logos, and car inventory in roro-dealers.tsx */}
      <RoRoDealers />

      {/* BOTTOM CALL-TO-ACTION - Encourages users to sell their cars */}
      {/* CUSTOMIZATION: Edit CTA text, description, and button in bottom-cta.tsx */}
      <BottomCTA />

      {/* FOOTER - Social media links and copyright */}
      {/* CUSTOMIZATION: Update social media links, contact info, and copyright in footer.tsx */}
      <Footer />
    </div>
  )
}
