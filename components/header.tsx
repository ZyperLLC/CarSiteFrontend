"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO - Change brand name and styling here */}
          <Link href="/" className="flex items-center">
            <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-lg">TTRidz</div>
          </Link>

          {/* NAVIGATION MENU - Add/remove menu items here */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/browse" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Browse Cars
            </Link>
            {/* NEW DEALERS LINK - Links to dealers listing page */}
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

          {/* SEARCH BUTTON - Customize button text and destination here */}
          <Link href="/browse">
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
              <Search className="w-4 h-4 mr-2" />
              Search Listings
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
