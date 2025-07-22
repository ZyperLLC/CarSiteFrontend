import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function SearchForm() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Make Dropdown */}
        <div className="relative">
          <div className="relative">
            <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-inter">
              <option>Make</option>
              <option>Toyota</option>
              <option>Honda</option>
              <option>Ford</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Model Dropdown */}
        <div className="relative">
          <div className="relative">
            <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-inter">
              <option>Model</option>
              <option>RAV4</option>
              <option>Camry</option>
              <option>Corolla</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Min Price Dropdown */}
        <div className="relative">
          <div className="relative">
            <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-inter">
              <option>Min Price</option>
              <option>$10,000</option>
              <option>$20,000</option>
              <option>$50,000</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Region Dropdown */}
        <div className="relative">
          <div className="relative">
            <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-inter">
              <option>Region</option>
              <option>San Fernando</option>
              <option>Los Angeles</option>
              <option>Orange County</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium font-inter">
        Search Listings
      </Button>
    </div>
  )
}
