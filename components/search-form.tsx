"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function SearchForm() {
  const router = useRouter()

  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [price, setPrice] = useState("")
  const [region, setRegion] = useState("")

  const handleSearch = () => {
    const query = new URLSearchParams()

    if (make) query.set("make", make)
    if (model) query.set("model", model)
    if (price) query.set("price", price)
    if (region) query.set("region", region)

    router.push(`/browse?${query.toString()}`)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Make Dropdown */}
        <div className="relative">
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-inter"
          >
            <option value="">Make</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Model Dropdown */}
        <div className="relative">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-inter"
          >
            <option value="">Model</option>
            <option value="RAV4">RAV4</option>
            <option value="Camry">Camry</option>
            <option value="Corolla">Corolla</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Min Price Dropdown */}
        <div className="relative">
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-inter"
          >
            <option value="">Min Price</option>
            <option value="10000">$100,000</option>
            <option value="20000">$150,000</option>
            <option value="50000">$200,000</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Region Dropdown */}
        <div className="relative">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-inter"
          >
            <option value="">Region</option>
            <option value="San Fernando">San Fernando</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Orange County">Orange County</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium font-inter"
        onClick={handleSearch}
      >
        Search Listings
      </Button>
    </div>
  )
}