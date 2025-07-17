"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Shield, Star, MapPin, Phone, MessageCircle, Car, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function DealersPage() {
  const [sortBy, setSortBy] = useState("rating")
  const [filterLocation, setFilterLocation] = useState("all")

  // DEALER DATA - Replace with your actual dealer information
  const dealers = [
    {
      id: 1,
      name: "Premium Auto Imports",
      // LOGO IMAGE - Replace with actual dealer logo
      logo: "/placeholder.svg?height=80&width=160",
      verified: true,
      rating: 4.8,
      totalReviews: 156,
      totalCars: 45,
      location: "Port of Spain",
      phone: "868-555-0123",
      whatsapp: "868-555-0123",
      description: "Specializing in Japanese imports with full inspection reports and warranties.",
      // FEATURED CARS - Replace with actual car images
      featuredCars: [
        {
          name: "Toyota Prius",
          price: "$95,000",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          name: "Honda Vezel",
          price: "$120,000",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          name: "Nissan Note",
          price: "$85,000",
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
    },
    {
      id: 2,
      name: "Island Auto Gallery",
      // LOGO IMAGE - Replace with actual dealer logo
      logo: "/placeholder.svg?height=80&width=160",
      verified: true,
      rating: 4.9,
      totalReviews: 203,
      totalCars: 32,
      location: "San Fernando",
      phone: "868-555-0456",
      whatsapp: "868-555-0456",
      description: "Trusted RoRo dealer with 15+ years experience in quality imports.",
      // FEATURED CARS - Replace with actual car images
      featuredCars: [
        {
          name: "Toyota Aqua",
          price: "$75,000",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          name: "Honda Fit",
          price: "$90,000",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          name: "Suzuki Swift",
          price: "$80,000",
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
    },
    {
      id: 3,
      name: "Elite Motors TT",
      // LOGO IMAGE - Replace with actual dealer logo
      logo: "/placeholder.svg?height=80&width=160",
      verified: true,
      rating: 4.7,
      totalReviews: 89,
      totalCars: 28,
      location: "Chaguanas",
      phone: "868-555-0789",
      whatsapp: "868-555-0789",
      description: "Premium European and Japanese imports with comprehensive warranties.",
      // FEATURED CARS - Replace with actual car images
      featuredCars: [
        {
          name: "BMW 3 Series",
          price: "$250,000",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          name: "Audi A4",
          price: "$280,000",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          name: "Mercedes C-Class",
          price: "$320,000",
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
    },
    {
      id: 4,
      name: "Caribbean Auto Hub",
      // LOGO IMAGE - Replace with actual dealer logo
      logo: "/placeholder.svg?height=80&width=160",
      verified: false,
      rating: 4.5,
      totalReviews: 67,
      totalCars: 19,
      location: "Arima",
      phone: "868-555-0321",
      whatsapp: "868-555-0321",
      description: "Affordable quality cars with flexible financing options available.",
      // FEATURED CARS - Replace with actual car images
      featuredCars: [
        {
          name: "Hyundai Elantra",
          price: "$110,000",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          name: "Kia Sportage",
          price: "$140,000",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          name: "Mazda CX-5",
          price: "$160,000",
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
    },
  ]

  // FILTER AND SORT LOGIC - Customize based on your needs
  const filteredDealers = dealers
    .filter((dealer) => filterLocation === "all" || dealer.location.toLowerCase().includes(filterLocation))
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "cars":
          return b.totalCars - a.totalCars
        case "reviews":
          return b.totalReviews - a.totalReviews
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PAGE HEADER - Customize title and description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Certified RoRo Dealers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our network of verified dealers specializing in quality imported vehicles with full warranties and
            inspection reports.
          </p>
        </div>

        {/* FILTERS AND SORTING */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-4">
              {/* LOCATION FILTER - Add/remove locations as needed */}
              <div className="relative">
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="all">All Locations</option>
                  <option value="port of spain">Port of Spain</option>
                  <option value="san fernando">San Fernando</option>
                  <option value="chaguanas">Chaguanas</option>
                  <option value="arima">Arima</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* VERIFICATION FILTER */}
              <Button variant="outline" className="bg-transparent">
                <Shield className="w-4 h-4 mr-2" />
                Verified Only
              </Button>
            </div>

            {/* SORT OPTIONS - Customize sorting criteria */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="cars">Most Cars</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="name">Name A-Z</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* DEALERS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDealers.map((dealer) => (
            <div
              key={dealer.id}
              className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* DEALER HEADER */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {/* DEALER LOGO - Replace with actual logos */}
                    <img
                      src={dealer.logo || "/placeholder.svg"}
                      alt={`${dealer.name} logo`}
                      className="h-16 w-auto object-contain"
                    />
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-xl font-bold text-gray-900">{dealer.name}</h3>
                        {/* VERIFIED BADGE - Customize verification criteria */}
                        {dealer.verified && (
                          <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{dealer.rating}</span>
                          <span className="ml-1">({dealer.totalReviews})</span>
                        </div>
                        <div className="flex items-center">
                          <Car className="w-4 h-4 mr-1" />
                          <span>{dealer.totalCars} cars</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{dealer.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DEALER DESCRIPTION - Customize for each dealer */}
                <p className="text-gray-600 mb-4">{dealer.description}</p>

                {/* CONTACT BUTTONS - Update with actual contact info */}
                <div className="flex space-x-3">
                  <Button className="bg-green-600 hover:bg-green-700 text-white flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="bg-transparent flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Link href={`/dealers/${dealer.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Store
                    </Button>
                  </Link>
                </div>
              </div>

              {/* FEATURED CARS - Replace with actual car images and data */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Featured Cars</h4>
                <div className="grid grid-cols-3 gap-4">
                  {dealer.featuredCars.map((car, index) => (
                    <div key={index} className="group cursor-pointer">
                      {/* CAR IMAGE - Replace with actual car photos */}
                      <img
                        src={car.image || "/placeholder.svg"}
                        alt={car.name}
                        className="w-full h-20 object-cover rounded-lg mb-2 group-hover:opacity-80 transition-opacity"
                      />
                      <div className="text-center">
                        <p className="text-xs font-medium text-gray-900 truncate">{car.name}</p>
                        <p className="text-xs text-blue-600 font-semibold">{car.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CALL TO ACTION - Customize message and button */}
        <div className="text-center mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to become a certified dealer?</h2>
          <p className="text-gray-600 mb-6">
            Join our network of trusted dealers and reach thousands of potential customers.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Apply to Become a Dealer</Button>
        </div>
      </div>
    </div>
  )
}
