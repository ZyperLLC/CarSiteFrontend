"use client"

import { useState } from "react"
import Header from "@/components/header"
import CarCard from "@/components/car-card"
import { Button } from "@/components/ui/button"
import { ChevronDown, Grid, List, SlidersHorizontal } from "lucide-react"

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")

  // Sample car data - Replace with API data
  const allCars = [
    {
      id: 1,
      name: "Toyota RAV4",
      location: "San Fernando",
      year: 2019,
      price: "$180,000",
      image: "/placeholder.svg?height=200&width=300",
      condition: "Used",
      mileage: "45,000 km",
    },
    {
      id: 2,
      name: "Honda Civic",
      location: "Port of Spain",
      year: 2020,
      price: "$120,000",
      image: "/placeholder.svg?height=200&width=300",
      condition: "Used",
      mileage: "32,000 km",
    },
    {
      id: 3,
      name: "Toyota Aqua",
      location: "Chaguanas",
      year: 2018,
      price: "$85,000",
      image: "/placeholder.svg?height=200&width=300",
      condition: "Used",
      mileage: "67,000 km",
    },
    {
      id: 4,
      name: "Nissan X-Trail",
      location: "San Fernando",
      year: 2021,
      price: "$220,000",
      image: "/placeholder.svg?height=200&width=300",
      condition: "Used",
      mileage: "28,000 km",
    },
    {
      id: 5,
      name: "Honda CR-V",
      location: "Arima",
      year: 2019,
      price: "$195,000",
      image: "/placeholder.svg?height=200&width=300",
      condition: "Used",
      mileage: "41,000 km",
    },
    {
      id: 6,
      name: "Toyota Corolla",
      location: "Port of Spain",
      year: 2020,
      price: "$110,000",
      image: "/placeholder.svg?height=200&width=300",
      condition: "Used",
      mileage: "35,000 km",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse All Cars</h1>
          <p className="text-gray-600">Find your perfect car from hundreds of listings</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
            {/* Make Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500">
                <option>All Makes</option>
                <option>Toyota</option>
                <option>Honda</option>
                <option>Nissan</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform translate-y-1 w-4 h-4 text-gray-400" />
            </div>

            {/* Model Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500">
                <option>All Models</option>
                <option>RAV4</option>
                <option>Civic</option>
                <option>Aqua</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform translate-y-1 w-4 h-4 text-gray-400" />
            </div>

            {/* Year Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500">
                <option>Any Year</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform translate-y-1 w-4 h-4 text-gray-400" />
            </div>

            {/* Price Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500">
                <option>Any Price</option>
                <option>Under $100K</option>
                <option>$100K - $200K</option>
                <option>Over $200K</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform translate-y-1 w-4 h-4 text-gray-400" />
            </div>

            {/* Region Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500">
                <option>All Regions</option>
                <option>San Fernando</option>
                <option>Port of Spain</option>
                <option>Chaguanas</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform translate-y-1 w-4 h-4 text-gray-400" />
            </div>

            {/* Condition Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500">
                <option>All Conditions</option>
                <option>New</option>
                <option>Used</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform translate-y-1 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">{allCars.length} cars found</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="mileage">Lowest Mileage</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* View Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Car Grid/List */}
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {allCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3 bg-transparent">
            Load More Cars
          </Button>
        </div>
      </div>
    </div>
  )
}
