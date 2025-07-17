"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { X, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ComparePage() {
  // Sample compare data - In real app, this would come from state management
  const [compareList, setCompareList] = useState([
    {
      id: 1,
      name: "Toyota RAV4",
      location: "San Fernando",
      year: 2019,
      price: "$180,000",
      image: "/placeholder.svg?height=200&width=300",
      specs: {
        engine: "2.0L Petrol",
        transmission: "Automatic",
        drivetrain: "AWD",
        mileage: "45,000 km",
        fuelType: "Petrol",
        doors: "5",
        seats: "5",
        condition: "Used",
      },
    },
    {
      id: 2,
      name: "Honda CR-V",
      location: "Port of Spain",
      year: 2020,
      price: "$195,000",
      image: "/placeholder.svg?height=200&width=300",
      specs: {
        engine: "1.5L Turbo",
        transmission: "CVT",
        drivetrain: "AWD",
        mileage: "32,000 km",
        fuelType: "Petrol",
        doors: "5",
        seats: "5",
        condition: "Used",
      },
    },
  ])

  const removeFromCompare = (id: number) => {
    setCompareList(compareList.filter((car) => car.id !== id))
  }

  const maxCompareItems = 4

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/browse">
              <Button variant="outline" size="sm" className="bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Browse
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Compare Cars</h1>
              <p className="text-gray-600">Compare up to {maxCompareItems} cars side by side</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {compareList.length} of {maxCompareItems} cars
          </div>
        </div>

        {compareList.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No cars to compare</h2>
            <p className="text-gray-600 mb-8">Add cars from the browse page to start comparing</p>
            <Link href="/browse">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Browse Cars</Button>
            </Link>
          </div>
        ) : (
          /* Compare Table */
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Car Images and Basic Info */}
                <thead>
                  <tr className="border-b">
                    <td className="p-4 font-medium text-gray-900 w-48">Car</td>
                    {compareList.map((car) => (
                      <td key={car.id} className="p-4 text-center min-w-[250px]">
                        <div className="relative">
                          <button
                            onClick={() => removeFromCompare(car.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 z-10"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <img
                            src={car.image || "/placeholder.svg"}
                            alt={car.name}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <h3 className="font-semibold text-gray-900">{car.name}</h3>
                          <p className="text-sm text-gray-600">
                            {car.location} • {car.year}
                          </p>
                          <p className="text-lg font-bold text-blue-600 mt-2">{car.price}</p>
                        </div>
                      </td>
                    ))}
                    {/* Add more cars slots */}
                    {Array.from({ length: maxCompareItems - compareList.length }).map((_, index) => (
                      <td key={`empty-${index}`} className="p-4 text-center min-w-[250px]">
                        <Link href="/browse">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center hover:border-blue-400 cursor-pointer">
                            <div className="text-center">
                              <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Add Car</p>
                            </div>
                          </div>
                        </Link>
                      </td>
                    ))}
                  </tr>
                </thead>

                {/* Specifications Comparison */}
                <tbody>
                  {[
                    { label: "Engine", key: "engine" },
                    { label: "Transmission", key: "transmission" },
                    { label: "Drivetrain", key: "drivetrain" },
                    { label: "Mileage", key: "mileage" },
                    { label: "Fuel Type", key: "fuelType" },
                    { label: "Doors", key: "doors" },
                    { label: "Seats", key: "seats" },
                    { label: "Condition", key: "condition" },
                  ].map((spec) => (
                    <tr key={spec.key} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">{spec.label}</td>
                      {compareList.map((car) => (
                        <td key={car.id} className="p-4 text-center text-gray-600">
                          {car.specs[spec.key as keyof typeof car.specs] || "N/A"}
                        </td>
                      ))}
                      {Array.from({ length: maxCompareItems - compareList.length }).map((_, index) => (
                        <td key={`empty-spec-${index}`} className="p-4 text-center text-gray-400">
                          -
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="p-6 bg-gray-50 border-t">
              <div className="flex flex-wrap gap-4">
                {compareList.map((car) => (
                  <Link key={car.id} href={`/car/${car.id}`}>
                    <Button variant="outline" className="bg-white">
                      View {car.name} Details
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
