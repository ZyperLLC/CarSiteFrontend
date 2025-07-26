"use client"

import { useState } from "react"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

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
            <img
              src="/logo.jpg"
              alt="Website Logo"
              className="h-14 w-auto"
            />
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

          {/* Search Form for Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-blue-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button variant="outline" type="submit" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
              <Search className="w-4 h-4 mr-2" />
              Search Listings
            </Button>
          </form>

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

            {/* Search Form for Mobile */}
            <form onSubmit={handleSearch} className="flex flex-col space-y-2 mt-2">
              <input
                type="text"
                placeholder="Search cars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-blue-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button variant="outline" type="submit" className="text-blue-600 border-blue-600 w-full">
                <Search className="w-4 h-4 mr-2" />
                Search Listings
              </Button>
            </form>
          </nav>
        </div>
      )}
    </header>
  )
}
