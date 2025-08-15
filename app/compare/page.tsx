"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ComparePage() {
  const [compareList, setCompareList] = useState<any[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("compareList")
    if (stored) {
      setCompareList(JSON.parse(stored))
    }
  }, [])

  const removeFromCompare = (id: number) => {
    const updatedList = compareList.filter((car) => car.id !== id)
    setCompareList(updatedList)
    localStorage.setItem("compareList", JSON.stringify(updatedList))
  }

  const maxCompareItems = 2

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center flex-wrap gap-4">
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

        {/* Empty State */}
        {compareList.length === 0 ? (
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
          <>
            {/* Desktop Compare Table */}
            <div className="hidden md:block bg-white rounded-lg shadow-sm border overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b align-top">
                    <td className="p-4 font-medium text-gray-900 w-48 align-top">Car</td>
                    {compareList.map((car) => (
                      <td
                        key={car.id}
                        className="p-4 text-center align-top min-w-[300px] w-[300px]"
                      >
                        <div className="relative">
                          <button
                            onClick={() => removeFromCompare(car.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 z-10"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg mb-3 overflow-hidden">
                            <img
                              src={car.image}
                              alt={car.name}
                              className="max-h-full object-contain"
                            />
                          </div>
                          <h3 className="font-semibold text-gray-900">{car.name}</h3>
                          <p className="text-sm text-gray-600">
                            {car.location} • {car.year}
                          </p>
                          <p className="text-lg font-bold text-blue-600 mt-2">{car.price}</p>
                        </div>
                      </td>
                    ))}
                  </tr>
                </thead>
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
                    <tr key={spec.key} className="border-b hover:bg-gray-50 align-top">
                      <td className="p-4 font-medium text-gray-900">{spec.label}</td>
                      {compareList.map((car) => (
                        <td
                          key={car.id}
                          className="p-4 text-center text-gray-600 min-w-[300px] align-top"
                        >
                          {car.specs?.[spec.key as keyof typeof car.specs] || "N/A"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Compare Grid */}
            <div className="md:hidden grid grid-cols-2 gap-4">
              {compareList.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-lg shadow-sm border p-3 flex flex-col items-center"
                >
                  <div className="relative w-full">
                    <button
                      onClick={() => removeFromCompare(car.id)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 z-10"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-36 object-contain rounded-lg mb-2"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-center text-gray-900">{car.name}</h3>
                  <p className="text-xs text-gray-600 text-center">
                    {car.location} • {car.year}
                  </p>
                  <p className="text-sm font-bold text-blue-600 mt-1">{car.price}</p>
                  <div className="mt-2 text-xs text-gray-700 w-full">
                    <p><strong>Engine:</strong> {car.specs?.engine || "N/A"}</p>
                    <p><strong>Transmission:</strong> {car.specs?.transmission || "N/A"}</p>
                    <p><strong>Drivetrain:</strong> {car.specs?.drivetrain || "N/A"}</p>
                    <p><strong>Mileage:</strong> {car.specs?.mileage || "N/A"}</p>
                    <p><strong>Fuel Type:</strong> {car.specs?.fuelType || "N/A"}</p>
                    <p><strong>Doors:</strong> {car.specs?.doors || "N/A"}</p>
                    <p><strong>Seats:</strong> {car.specs?.seats || "N/A"}</p>
                    <p><strong>Condition:</strong> {car.specs?.condition || "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Action Buttons */}
        {compareList.length > 0 && (
          <div className="p-6 bg-gray-50 border-t mt-4">
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
        )}
      </div>
    </div>
  )
}
