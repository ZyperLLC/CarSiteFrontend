"use client"

import { useState } from "react"

export default function FilterTabs() {
  const filters = [
    "SUVs under $200k",
    "Hybrid",
    "Electric Cars",
    "Sports Cars",
    "Family Vans",
    "4x4 Pickup",
    "Trucks",
  ]

  // Optional: can remove state if not needed anymore
  const [activeFilter, setActiveFilter] = useState("")

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className="px-4 py-2 rounded-md text-sm font-medium border border-gray-200 bg-white text-[#0e3087] hover:bg-gray-50 transition-colors"
        >
          {filter}
        </button>
      ))}
    </div>
  )
}