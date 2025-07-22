"use client"

import { useState } from "react"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-lg">
              TTRidz
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/browse" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Browse Cars
            </Link>
            <Link href="/dealers" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Dealers
            </Link>
            <Link href="/sell" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Sell Your Car
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/help" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Help
            </Link>
          </nav>

          {/* Search Button */}
          <div className="hidden md:block">
            <Link href="/browse">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
                <Search className="w-4 h-4 mr-2" />
                Search Listings
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col space-y-2">
            <Link href="/browse" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
              Browse Cars
            </Link>
            <Link href="/dealers" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
              Dealers
            </Link>
            <Link href="/sell" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
              Sell Your Car
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link href="/help" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
              Help
            </Link>
            <Link href="/browse">
              <Button variant="outline" className="mt-2 text-blue-600 border-blue-600 w-full">
                <Search className="w-4 h-4 mr-2" />
                Search Listings
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
