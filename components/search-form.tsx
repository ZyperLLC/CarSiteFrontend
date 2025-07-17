import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function SearchForm() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Make Dropdown - Customize options here */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
          <div className="relative">
            <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Select Make</option>
              <option>Toyota</option>
              <option>Honda</option>
              <option>Ford</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Model Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
          <div className="relative">
            <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Select Model</option>
              <option>RAV4</option>
              <option>Camry</option>
              <option>Corolla</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Min Price Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
          <div className="relative">
            <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Any Price</option>
              <option>$10,000</option>
              <option>$20,000</option>
              <option>$50,000</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Region Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
          <div className="relative">
            <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Regions</option>
              <option>San Fernando</option>
              <option>Los Angeles</option>
              <option>Orange County</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Search Button - Customize button text here */}
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium">
        Search Listings
      </Button>
    </div>
  )
}
