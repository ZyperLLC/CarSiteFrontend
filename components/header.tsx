"use client"

import { useState } from "react"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const navLinks = [
    { href: "/browse", label: "Browse Cars" },
    { href: "/dealers", label: "Dealers" },
    { href: "/sell", label: "Sell Your Car" },
    { href: "/about", label: "About" },
    { href: "/help", label: "Help" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/browse?query=${encodeURIComponent(searchQuery.trim())}`)
    setMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="Website Logo" className="h-14 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 text-[#424242] font-inter text-[18px] font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Form for Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center space-x-2"
          >
            <Button
              variant="outline"
              className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent transition-all duration-300 hover:translate-y-1"
            >
              <h2 className="text-[#2058E6] font-inter text-[18px] font-semibold">
                Search Listings
              </h2>
            </Button>
          </form>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden px-4 pb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col mt-10 space-y-2 text-[#424242] font-inter text-[18px] font-semibold">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-blue-600 font-semibold"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Search Form for Mobile */}
              <motion.form
                onSubmit={handleSearch}
                className="flex flex-col space-y-2 mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Button
                  variant="outline"
                  type="submit"
                  className="text-blue-600 border-blue-600 w-full"
                >
                  Search Listings
                </Button>
              </motion.form>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
