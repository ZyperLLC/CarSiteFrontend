"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

export default function SignInChoice() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmation, setConfirmation] = useState<"individual" | "dealer" | null>(null);
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/browse?query=${encodeURIComponent(searchQuery.trim())}`);
    setMenuOpen(false);
  };

  const handleContinue = (role: "individual" | "dealer") => {
    if (isSignedIn) {
      setConfirmation(role);
      setTimeout(() => {
        // Redirecting to dealer-dashboard regardless of role who is signed in
        router.push("/dealer-dashboard");
      }, 1500);
    } else {
      router.push(`/auth/${role}?redirect_url=/select`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <img src="/logo.jpg" alt="Website Logo" className="h-12 w-auto" />
            </Link>
            <nav className="hidden md:flex space-x-8 items-center">
              <Link href="/browse" className="text-gray-700 hover:text-blue-600 font-medium">
                Browse Cars
              </Link>
              <Link href="/dealers" className="text-gray-700 hover:text-blue-600 font-medium">
                Dealers
              </Link>
              <Link
                href={isSignedIn ? "/dealer-dashboard" : "/select"}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {isSignedIn ? "Dealer Dashboard" : "Sell Your Car"}
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                About
              </Link>
              <Link href="/help" className="text-gray-700 hover:text-blue-600 font-medium">
                Help
              </Link>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-blue-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  variant="outline"
                  type="submit"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  <Search className="w-4 h-4 mr-2" /> Search
                </Button>
              </form>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
            <div className="flex md:hidden items-center space-x-2">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden px-4 pb-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/browse"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Browse Cars
              </Link>
              <Link
                href="/dealers"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Dealers
              </Link>
              <Link
                href={isSignedIn ? "/dealer-dashboard" : "/select"}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {isSignedIn ? "Dealer Dashboard" : "Sell Your Car"}
              </Link>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                About
              </Link>
              <Link
                href="/help"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Help
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Body */}
      <main className="flex-grow px-4 py-10 flex flex-col items-center space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Sell Your Car Fast on TTRIDZ</h1>
          <p className="text-gray-700">
            Turn your ride into cash in 3 simple steps.
            <br />
            No dealers. No hassle. Just pure convenience.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-center">🚀 Step 1: Choose Your Seller Type</h2>

        {/* Cards side by side always */}
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
          {["individual", "dealer"].map((role, idx) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="flex-1 min-w-[270px] max-w-[300px] bg-white shadow-xl rounded-xl border border-gray-200 p-6 flex flex-col items-center justify-between hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-center mb-2">
                Sign In / Sign Up <br /> as {role === "individual" ? "an Individual" : "a Dealer"}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                {role === "individual"
                  ? "Selling your personal car?"
                  : "Have multiple vehicles to list?"}
              </p>
              <Button
                onClick={() => handleContinue(role as "individual" | "dealer")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={confirmation === role}
              >
                {confirmation === role ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Already Signed In
                  </span>
                ) : (
                  "Continue →"
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Why Sell Section */}
        <section className="text-center max-w-xl space-y-4">
          <h3 className="text-lg font-semibold">💰 Why Sell on TTRIDZ?</h3>
          <ul className="text-left space-y-2 text-gray-700">
            <li>
              ✅ <strong>Free Listings</strong> for Individuals
            </li>
            <li>✅ <strong>Real Buyers</strong> from Trinidad & Tobago</li>
            <li>✅ <strong>Instant Exposure</strong> on Facebook, TikTok + & More</li>
            <li>✅ <strong>Verified Buyer Messages</strong> Only</li>
            <li>✅ <strong>Optional Boosts</strong> for Faster Sales</li>
          </ul>
        </section>

        {/* Testimonials */}
        <section className="text-center max-w-xl space-y-4">
          <h3 className="text-lg font-semibold">⭐ What Sellers Say</h3>
          <blockquote className="italic text-gray-800">
            "I sold my car in 2 days through TTRIDZ. The process was smoother than I expected!”
            <br />
            – Daniel, San Fernando
          </blockquote>
          <blockquote className="italic text-gray-800">
            "As a small dealer, I love the control and reach this platform gives me.”
            <br />
            – Anisha, Chaguanas
          </blockquote>
        </section>

        {/* FAQs and Estimate */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* FAQ */}
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
            <h4 className="text-lg font-semibold mb-2">FAQs</h4>
            <p className="mb-2">
              <strong>Q:</strong> How much does it cost to list a car?
              <br />
              <strong>A:</strong> It’s free for individuals. Dealers have access to boosts.
            </p>
            <p>
              <strong>Q:</strong> Do I need professional photos?
              <br />
              <strong>A:</strong> No, just snap a few clear shots with your phone.
            </p>
          </div>
          {/* Estimate */}
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-semibold mb-2">📊 Estimate Your Value</h4>
              <p>Coming Soon; instant valuation tool for Trinidad’s market.</p>
            </div>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white self-start">Get Notified →</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
