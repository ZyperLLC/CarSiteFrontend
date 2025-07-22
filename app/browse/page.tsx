"use client"

import { useState } from "react"
import Header from "@/components/header"
import CarCard from "@/components/car-card"
import { Button } from "@/components/ui/button"
import { ChevronDown, SlidersHorizontal } from "lucide-react"

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("price-low")

  const allCars = [
    {
      id: 1,
      name: "Toyota RAV4",
      location: "San Fernando",
      year: 2019,
      price: "$180,000",
      image: "/car3.jpg?height=200&width=300",
      condition: "Used",
      mileage: "45,000 km",
    },
    {
      id: 2,
      name: "Honda Civic",
      location: "Port of Spain",
      year: 2020,
      price: "$120,000",
      image: "/car3.jpg?height=200&width=300",
      condition: "Used",
      mileage: "32,000 km",
    },
    {
      id: 3,
      name: "Toyota Aqua",
      location: "Chaguanas",
      year: 2018,
      price: "$85,000",
      image: "/car3.jpg?height=200&width=300",
      condition: "Used",
      mileage: "67,000 km",
    },
    {
      id: 4,
      name: "Nissan X-Trail",
      location: "San Fernando",
      year: 2021,
      price: "$220,000",
      image: "/car3.jpg?height=200&width=300",
      condition: "Used",
      mileage: "28,000 km",
    },
    {
      id: 5,
      name: "Honda CR-V",
      location: "Arima",
      year: 2019,
      price: "$195,000",
      image: "/car3.jpg?height=200&width=300",
      condition: "Used",
      mileage: "41,000 km",
    },
    {
      id: 6,
      name: "Toyota Corolla",
      location: "Port of Spain",
      year: 2020,
      price: "$110,000",
      image: "/car3.jpg?height=200&width=300",
      condition: "Used",
      mileage: "35,000 km",
    },
  ]

  const [filters, setFilters] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    region: "",
    condition: "",
  })

  const [filteredCars, setFilteredCars] = useState(allCars)

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const applyFilters = () => {
    const cars = allCars.filter((car) => {
      const numericPrice = parseInt(car.price.replace(/[^0-9]/g, ""))

      return (
        (!filters.make || car.name.toLowerCase().includes(filters.make.toLowerCase())) &&
        (!filters.model || car.name.toLowerCase().includes(filters.model.toLowerCase())) &&
        (!filters.year || String(car.year) === filters.year) &&
        (!filters.price ||
          (filters.price === "Under $100K" && numericPrice < 100000) ||
          (filters.price === "$100K - $200K" && numericPrice >= 100000 && numericPrice <= 200000) ||
          (filters.price === "Over $200K" && numericPrice > 200000)) &&
        (!filters.region || car.location === filters.region) &&
        (!filters.condition || car.condition === filters.condition)
      )
    })

    setFilteredCars(cars)
  }

  const renderDropdown = (options: string[], label: string, field: keyof typeof filters) => (
    <div className="relative">
      <select
        className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500"
        value={filters[field]}
        onChange={(e) => handleFilterChange(field, e.target.value)}
      >
        <option value="">{label}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse All Cars</h1>
          <p className="text-gray-600">Find your perfect car from hundreds of listings</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
            {renderDropdown(["Toyota", "Honda", "Nissan"], "Makes", "make")}
            {renderDropdown(["RAV4", "Civic", "Aqua"], "Models", "model")}
            {renderDropdown(["2023", "2022", "2021", "2020", "2019", "2018"], "Year", "year")}
            {renderDropdown(["Under $100K", "$100K - $200K", "Over $200K"], "Min Price", "price")}
            {renderDropdown(["San Fernando", "Port of Spain", "Chaguanas", "Arima"], "Regions", "region")}
            {renderDropdown(["New", "Used"], "Conditions", "condition")}
          </div>

          <Button
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 transition text-white px-8"
            onClick={applyFilters}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">{filteredCars.length} cars found</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
             
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="px-8 py-3 bg-transparent border-gray-300 text-gray-800 hover:bg-gray-100 transition"
          >
            Load More Cars
          </Button>
        </div>
      </div>
    </div>
  )
}
