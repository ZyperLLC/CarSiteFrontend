"use client"

import { useState } from "react"
import Header from "@/components/header"
import CarCard from "@/components/car-card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Shield,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  Car,
  Award,
  Clock,
  Globe,
  Users,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"

export default function DealerProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("inventory")
  const [sortBy, setSortBy] = useState("newest")
  const [filterPrice, setFilterPrice] = useState("all")

  // DEALER DATA - Replace with actual dealer information from your database
  const dealer = {
    id: 1,
    name: "Premium Auto Imports",
    // DEALER LOGO - Replace with actual high-resolution logo
    logo: "/placeholder.svg?height=100&width=200",
    // DEALER BANNER - Add a banner image for the storefront
    bannerImage: "/placeholder.svg?height=300&width=1200",
    verified: true,
    rating: 4.8,
    totalReviews: 156,
    totalCars: 45,
    memberSince: "2018",
    // BUSINESS HOURS - Customize for each dealer
    businessHours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 4:00 PM",
      sunday: "Closed",
    },
    // CONTACT INFORMATION - Update with actual contact details
    contact: {
      phone: "868-555-0123",
      whatsapp: "868-555-0123",
      email: "info@premiumautoimports.tt",
      website: "www.premiumautoimports.tt",
      address: "123 Independence Square, Port of Spain, Trinidad & Tobago",
    },
    // DEALER DESCRIPTION - Customize for each dealer
    description:
      "Premium Auto Imports has been Trinidad & Tobago's leading RoRo car dealer for over 6 years. We specialize in high-quality Japanese imports with comprehensive inspection reports and warranties. Our team of experts ensures every vehicle meets the highest standards before reaching our customers.",
    // CERTIFICATIONS - Add actual certifications
    certifications: [
      "TTRidz Verified Dealer",
      "RoRo Import License #RI-2018-001",
      "Auto Dealer Association Member",
      "ISO 9001:2015 Certified",
      "Better Business Bureau A+ Rating",
    ],
    // SERVICES OFFERED - Customize based on what each dealer offers
    services: [
      "Pre-purchase Inspection",
      "Extended Warranty Coverage",
      "Financing Assistance",
      "Trade-in Evaluation",
      "After-sales Service",
      "Documentation Support",
      "Vehicle History Reports",
      "Home Delivery Service",
    ],
    // DEALER STATS - Update with actual numbers
    stats: {
      yearsInBusiness: 6,
      totalSales: 1250,
      customerSatisfaction: 98,
      repeatCustomers: 45,
    },
    // INVENTORY - Replace with actual car data from database
    inventory: [
      {
        id: 1,
        name: "Toyota Prius",
        location: "Port of Spain",
        year: 2020,
        price: "$95,000",
        // CAR IMAGES - Replace with actual car photos
        image: "/placeholder.svg?height=200&width=300",
        condition: "Used",
        mileage: "25,000 km",
        featured: false,
      },
      {
        id: 2,
        name: "Honda Vezel",
        location: "Port of Spain",
        year: 2019,
        price: "$120,000",
        // CAR IMAGES - Replace with actual car photos
        image: "/placeholder.svg?height=200&width=300",
        condition: "Used",
        mileage: "30,000 km",
        featured: true, // This will show as featured card
      },
      {
        id: 3,
        name: "Nissan Note",
        location: "Port of Spain",
        year: 2021,
        price: "$85,000",
        // CAR IMAGES - Replace with actual car photos
        image: "/placeholder.svg?height=200&width=300",
        condition: "Used",
        mileage: "18,000 km",
        featured: false,
      },
      {
        id: 4,
        name: "Toyota Aqua",
        location: "Port of Spain",
        year: 2018,
        price: "$75,000",
        // CAR IMAGES - Replace with actual car photos
        image: "/placeholder.svg?height=200&width=300",
        condition: "Used",
        mileage: "45,000 km",
        featured: false,
      },
      {
        id: 5,
        name: "Honda Fit",
        location: "Port of Spain",
        year: 2020,
        price: "$90,000",
        // CAR IMAGES - Replace with actual car photos
        image: "/placeholder.svg?height=200&width=300",
        condition: "Used",
        mileage: "22,000 km",
        featured: false,
      },
      {
        id: 6,
        name: "Suzuki Swift",
        location: "Port of Spain",
        year: 2019,
        price: "$80,000",
        // CAR IMAGES - Replace with actual car photos
        image: "/placeholder.svg?height=200&width=300",
        condition: "Used",
        mileage: "35,000 km",
        featured: false,
      },
    ],
    // CUSTOMER REVIEWS - Replace with actual reviews
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        // CUSTOMER AVATAR - Add actual customer photos if available
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2024-01-15",
        carPurchased: "Honda Vezel 2019",
        comment:
          "Excellent service! Bought a Honda Vezel and the entire process was smooth. The team was professional and transparent about everything. Highly recommended!",
      },
      {
        id: 2,
        name: "Michael Chen",
        // CUSTOMER AVATAR - Add actual customer photos if available
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2024-01-10",
        carPurchased: "Toyota Prius 2020",
        comment:
          "Very professional dealer. Great selection of cars and transparent pricing. The warranty coverage gave me peace of mind.",
      },
      {
        id: 3,
        name: "Lisa Rodriguez",
        // CUSTOMER AVATAR - Add actual customer photos if available
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "2024-01-05",
        carPurchased: "Nissan Note 2021",
        comment:
          "Good experience overall. The car was exactly as described and in great condition. Financing process was straightforward.",
      },
    ],
  }

  // FILTER AND SORT INVENTORY
  const filteredInventory = dealer.inventory
    .filter((car) => {
      if (filterPrice === "all") return true
      const price = Number.parseInt(car.price.replace(/[$,]/g, ""))
      switch (filterPrice) {
        case "under-100k":
          return price < 100000
        case "100k-200k":
          return price >= 100000 && price <= 200000
        case "over-200k":
          return price > 200000
        default:
          return true
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number.parseInt(a.price.replace(/[$,]/g, "")) - Number.parseInt(b.price.replace(/[$,]/g, ""))
        case "price-high":
          return Number.parseInt(b.price.replace(/[$,]/g, "")) - Number.parseInt(a.price.replace(/[$,]/g, ""))
        case "year":
          return b.year - a.year
        case "mileage":
          return Number.parseInt(a.mileage.replace(/[,km]/g, "")) - Number.parseInt(b.mileage.replace(/[,km]/g, ""))
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* BACK BUTTON */}
        <div className="mb-6">
          <Link href="/dealers">
            <Button variant="outline" size="sm" className="bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dealers
            </Button>
          </Link>
        </div>

        {/* DEALER STOREFRONT HEADER */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
          {/* BANNER IMAGE - Replace with actual dealer banner */}
          <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-800 relative">
            <img
              src={dealer.bannerImage || "/placeholder.svg"}
              alt={`${dealer.name} banner`}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-800/80"></div>
          </div>

          <div className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* DEALER LOGO - Replace with high-resolution logo */}
              <div className="flex-shrink-0 -mt-16 lg:-mt-20">
                <div className="bg-white p-4 rounded-lg shadow-lg border">
                  <img
                    src={dealer.logo || "/placeholder.svg"}
                    alt={`${dealer.name} logo`}
                    className="h-20 w-auto object-contain"
                  />
                </div>
              </div>

              {/* DEALER INFO */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{dealer.name}</h1>
                      {/* VERIFIED BADGE - Customize verification criteria */}
                      {dealer.verified && (
                        <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          <Shield className="w-4 h-4 mr-1" />
                          Verified Dealer
                        </div>
                      )}
                    </div>

                    {/* DEALER STATS */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{dealer.rating}</span>
                        <span className="ml-1">({dealer.totalReviews} reviews)</span>
                      </div>
                      <div className="flex items-center">
                        <Car className="w-4 h-4 mr-1" />
                        <span>{dealer.totalCars} cars available</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Since {dealer.memberSince}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{dealer.stats.totalSales}+ cars sold</span>
                      </div>
                    </div>

                    {/* DEALER DESCRIPTION */}
                    <p className="text-gray-600 mb-6 max-w-3xl">{dealer.description}</p>
                  </div>

                  {/* CONTACT BUTTONS - Update with actual contact information */}
                  <div className="flex flex-col space-y-3 lg:ml-8">
                    <Button className="bg-green-600 hover:bg-green-700 text-white min-w-[160px]">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" className="bg-transparent min-w-[160px]">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="bg-transparent min-w-[160px]">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DEALER STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{dealer.stats.yearsInBusiness}+</div>
            <div className="text-sm text-gray-600">Years in Business</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{dealer.stats.totalSales}+</div>
            <div className="text-sm text-gray-600">Cars Sold</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{dealer.stats.customerSatisfaction}%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{dealer.stats.repeatCustomers}%</div>
            <div className="text-sm text-gray-600">Repeat Customers</div>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "inventory", label: "Inventory", count: dealer.totalCars },
                { id: "about", label: "About" },
                { id: "reviews", label: "Reviews", count: dealer.totalReviews },
                { id: "contact", label: "Contact" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {tab.count && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{tab.count}</span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* INVENTORY TAB */}
            {activeTab === "inventory" && (
              <div>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
                  <h2 className="text-xl font-semibold text-gray-900">Available Cars</h2>

                  {/* INVENTORY FILTERS */}
                  <div className="flex flex-wrap gap-4">
                    <div className="relative">
                      <select
                        value={filterPrice}
                        onChange={(e) => setFilterPrice(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 pr-8"
                      >
                        <option value="all">All Prices</option>
                        <option value="under-100k">Under $100K</option>
                        <option value="100k-200k">$100K - $200K</option>
                        <option value="over-200k">Over $200K</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>

                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 pr-8"
                      >
                        <option value="newest">Newest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="year">Year: Newest</option>
                        <option value="mileage">Lowest Mileage</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-6">{filteredInventory.length} cars found</div>

                {/* CARS GRID - Car images will be replaced with actual photos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredInventory.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === "about" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start text-gray-600">
                      <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{dealer.contact.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span>{dealer.contact.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MessageCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span>{dealer.contact.whatsapp}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span>{dealer.contact.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Globe className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span>{dealer.contact.website}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications & Awards</h3>
                  <div className="space-y-2">
                    {dealer.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <Award className="w-4 h-4 mr-3 text-blue-600 flex-shrink-0" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h3>
                  <div className="grid grid-cols-1 gap-2 mb-8">
                    {dealer.services.map((service, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
                  <div className="space-y-2">
                    {Object.entries(dealer.businessHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center text-sm">
                        <span className="capitalize font-medium text-gray-900">{day}</span>
                        <span className="text-gray-600">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-lg font-semibold">{dealer.rating}</span>
                    <span className="ml-1 text-gray-600">({dealer.totalReviews} reviews)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {dealer.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        {/* CUSTOMER AVATAR - Replace with actual customer photos if available */}
                        <img
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-medium text-gray-900">{review.name}</div>
                              <div className="text-sm text-gray-500">Purchased: {review.carPurchased}</div>
                              <div className="flex items-center mt-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT TAB */}
            {activeTab === "contact" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Get in Touch</h3>

                  {/* CONTACT FORM */}
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="868-123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="I'm interested in..."
                      />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Send Message</Button>
                  </form>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Visit Our Showroom</h3>

                  {/* LOCATION INFO */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 mr-3 mt-0.5 text-blue-600 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-gray-900">Address</div>
                          <div className="text-gray-600">{dealer.contact.address}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-gray-900">Business Hours</div>
                          <div className="text-gray-600">Mon-Fri: 8AM-6PM, Sat: 9AM-4PM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QUICK CONTACT BUTTONS */}
                  <div className="space-y-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp: {dealer.contact.whatsapp}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Phone className="w-4 h-4 mr-2" />
                      Call: {dealer.contact.phone}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Mail className="w-4 h-4 mr-2" />
                      Email: {dealer.contact.email}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
