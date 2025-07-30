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
        if (role === "individual") {
          router.push("/sell");
        } else {
          router.push("/premium");
        }
      }, 1500);
    } else {
      router.push(`/auth/${role}?redirect_url=/select`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <img src="/logo.jpg" alt="Website Logo" className="h-12 w-auto" />
            </Link>

            <nav className="hidden md:flex space-x-8 items-center">
              <Link href="/browse" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Browse Cars
              </Link>
              <Link href="/dealers" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Dealers
              </Link>
              <Link href="/select" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Sell Your Car
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                About
              </Link>
              <Link href="/help" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Help
              </Link>
            </nav>

            {/* Search bar and user avatar */}
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
                  <Search className="w-4 h-4 mr-2" />
                  Search Listings
                </Button>
              </form>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            {/* Mobile menu toggle and user button */}
            <div className="flex md:hidden items-center space-x-2">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pb-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/browse" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium">
                Browse Cars
              </Link>
              <Link href="/dealers" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium">
                Dealers
              </Link>
              <Link href="/select" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium">
                Sell Your Car
              </Link>
              <Link href="/about" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium">
                About
              </Link>
              <Link href="/help" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium">
                Help
              </Link>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </nav>
          </div>
        )}
      </header>

      {/* Sign-in Role Selection */}
      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Individual Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-64 h-64 bg-white shadow-xl rounded-xl border border-gray-200 flex flex-col items-center justify-center p-6 hover:shadow-2xl transition-shadow duration-300 relative"
          >
            <h2 className="text-xl font-semibold text-center mb-4">
              Sign In / Sign Up <br /> as an Individual
            </h2>
            <Button
              onClick={() => handleContinue("individual")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={confirmation === "individual"}
            >
              {confirmation === "individual" ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Already Signed In
                </span>
              ) : (
                "Continue"
              )}
            </Button>
          </motion.div>

          {/* Dealer Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-64 h-64 bg-white shadow-xl rounded-xl border border-gray-200 flex flex-col items-center justify-center p-6 hover:shadow-2xl transition-shadow duration-300 relative"
          >
            <h2 className="text-xl font-semibold text-center mb-4">
              Sign In / Sign Up <br /> as a Dealer
            </h2>
            <Button
              onClick={() => handleContinue("dealer")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={confirmation === "dealer"}
            >
              {confirmation === "dealer" ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Already Signed In
                </span>
              ) : (
                "Continue"
              )}
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
