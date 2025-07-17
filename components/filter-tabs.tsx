"use client"

import { useState } from "react"

export default function FilterTabs() {
  // Add/remove filter options here
  const filters = [
    "SUVs under $200k",
    "Used Sedans",
    "Electric Cars",
    "Sports Cars",
    "Family Vans",
    "Luxury Brands",
    "Trucks",
  ]

  const [activeFilter, setActiveFilter] = useState("SUVs under $200k")

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
