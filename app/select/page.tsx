"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function SignInChoice() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/browse?query=${encodeURIComponent(searchQuery.trim())}`);
    setMenuOpen(false);
  };

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const navItems = [
    { label: "Browse Cars", href: "/browse" },
    { label: "Dealers", href: "/dealers" },
    {
      label: isSignedIn ? "Dealer Dashboard" : "Sell Your Car",
      href: isSignedIn ? "/dealer-dashboard" : "/select",
    },
    { label: "About", href: "/about" },
    { label: "Help", href: "/help" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Website Logo" className="h-12 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center font-inter text-[18px] font-semibold">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="text-[#424242] hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Search + User */}
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

            {/* Mobile Menu Button */}
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

        {/* Mobile Nav with Animation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden px-4 pb-4 overflow-hidden"
            >
              <nav className="flex flex-col space-y-2 mt-10">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={menuVariants}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-700 hover:text-blue-600 font-medium block"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
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

        <h2 className="text-xl font-semibold text-center">
          🚀 Step 1: Choose Your Seller Type
        </h2>

        {/* Cards */}
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

              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Continue →
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
