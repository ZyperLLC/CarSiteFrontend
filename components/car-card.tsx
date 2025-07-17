"use client"

import { useState } from "react"
import { Fuel, Gauge, Settings } from "lucide-react"
import Link from "next/link"

interface CarCardProps {
  car: {
    id: number
    name: string
    location: string
    year: number
    price: string
    image: string
    specs?: {
      engine: string
      mileage: string
      drivetrain: string
    }
    description?: string
    featured?: boolean
  }
}

export default function CarCard({ car }: CarCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPriceHovered, setIsPriceHovered] = useState(false)

  // Featured card layout (larger card with details)
  if (car.featured) {
    return (
      <div className="md:col-span-2 lg:col-span-2 bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left side - Car details */}
          <div>
            <h3 className="text-2xl font-bold text-blue-600 mb-2">{car.name}</h3>
            <p className="text-gray-600 mb-4">{car.description}</p>

            {/* Specifications */}
            {car.specs && (
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Settings className="w-4 h-4 mr-2" />
                  <span className="text-sm">{car.specs.engine}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Gauge className="w-4 h-4 mr-2" />
                  <span className="text-sm">{car.specs.mileage}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Fuel className="w-4 h-4 mr-2" />
                  <span className="text-sm">{car.specs.drivetrain}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="text-sm">📅 {car.year}</span>
                </div>
              </div>
            )}

            {/* Price */}
            <div
              className="inline-block"
              onMouseEnter={() => setIsPriceHovered(true)}
              onMouseLeave={() => setIsPriceHovered(false)}
            >
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-center min-w-[120px] cursor-pointer transition-all duration-200">
                {isPriceHovered ? (
                  <Link href="/compare">
                    <span className="text-blue-600 font-medium">Compare</span>
                  </Link>
                ) : (
                  <span className="text-blue-600 font-bold text-lg">{car.price}</span>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Car image */}
          <div className="relative flex justify-center items-center">
            <Link href={`/car/${car.id}`}>
              <img
                src={car.image || "/placeholder.svg"}
                alt={car.name}
                className="w-full max-h-64 object-contain rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Regular card layout
  return (
    <div
      className="bg-white rounded-lg shadow-sm border overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/car/${car.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={car.image || "/placeholder.svg"}
            alt={car.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4 relative">
        <div
          className={`absolute inset-0 bg-blue-600 bg-opacity-20 transition-all duration-300 rounded-b-lg ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="relative z-10">
          <Link href={`/car/${car.id}`}>
            <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
              {car.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mb-1">{car.location}</p>
          <p className="text-sm text-gray-600 mb-4">{car.year}</p>

          <div
            className="inline-block w-full"
            onMouseEnter={() => setIsPriceHovered(true)}
            onMouseLeave={() => setIsPriceHovered(false)}
          >
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-center transition-all duration-200">
              {isPriceHovered ? (
                <Link href="/compare">
                  <span className="text-blue-600 font-medium">Add to Compare</span>
                </Link>
              ) : (
                <span className="text-blue-600 font-bold">{car.price}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
