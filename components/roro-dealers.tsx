"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Star, Scale } from "lucide-react"
import Link from "next/link"

export default function RoRoDealers() {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null)
  const [priceHoveredIndex, setPriceHoveredIndex] = useState<string | null>(null)

  const dealers = [
    {
      id: 1,
      name: "Premium Auto Imports",
      logo: "/car1.jpg?height=60&width=120",
      verified: true,
      rating: 4.8,
      totalCars: 45,
      description: "Specializing in Japanese imports with full inspection reports and warranties",
      cars: [
        {
          name: "Toyota Prius",
          year: 2020,
          price: "$95,000",
          image: "/car2.jpg?height=150&width=200",
        },
        {
          name: "Honda Vezel",
          year: 2019,
          price: "$120,000",
          image: "/car2.jpg?height=150&width=200",
        },
        {
          name: "Nissan Note",
          year: 2021,
          price: "$85,000",
          image: "/car2.jpg?height=150&width=200",
        },
      ],
    },
    {
      id: 2,
      name: "Island Auto Gallery",
      logo: "/placeholder.svg?height=60&width=120",
      verified: true,
      rating: 4.9,
      totalCars: 32,
      description: "Trusted RoRo dealer with 15+ years experience",
      cars: [
        {
          name: "Toyota Aqua",
          year: 2018,
          price: "$75,000",
          image: "/car2.jpg?height=150&width=200",
        },
        {
          name: "Honda Fit",
          year: 2020,
          price: "$90,000",
          image: "/car2.jpg?height=150&width=200",
        },
        {
          name: "Suzuki Swift",
          year: 2019,
          price: "$80,000",
          image: "/car2.jpg?height=150&width=200",
        },
      ],
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Imported by Certified RoRo Dealers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Only the most trusted dealers. All vehicles inspected, imported, and certified.
          </p>
        </div>

        <div className="space-y-12">
          {dealers.map((dealer) => (
            <div key={dealer.id} className="bg-gray-50 rounded-lg p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <img
                    src={dealer.logo || "/placeholder.svg"}
                    alt={`${dealer.name} logo`}
                    className="h-12 w-auto object-contain"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-gray-900">{dealer.name}</h3>
                      {dealer.verified && (
                        <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{dealer.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">{dealer.totalCars} cars available</span>
                    </div>
                  </div>
                </div>
                <Link href={`/dealers/${dealer.id}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">View Dealer Inventory</Button>
                </Link>
              </div>

              <p className="text-gray-600 mb-6">{dealer.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {dealer.cars.map((car, index) => {
                  const key = `${dealer.id}-${index}`
                  const isHovered = hoveredIndex === key
                  const isPriceHovered = priceHoveredIndex === key

                  return (
                    <div
                      key={key}
                      className="bg-white rounded-lg shadow-sm border overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md relative"
                      onMouseEnter={() => setHoveredIndex(key)}
                      onMouseLeave={() => {
                        setHoveredIndex(null)
                        setPriceHoveredIndex(null)
                      }}
                    >
                      <Link href={`/car/${key}`}>
                        <div className="relative w-full min-h-[150px] bg-white flex items-center justify-center overflow-hidden">
                          <img
                            src={car.image || "/placeholder.svg"}
                            alt={car.name}
                            className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </Link>

                      <div
                        className={`p-4 relative transition-all duration-300 ${
                          isHovered ? "bg-gradient-to-t from-[#e9eefd] to-white" : "bg-white"
                        }`}
                      >
                        <div className="relative z-10">
                          <Link href={`/car/${key}`}>
                            <h4 className="font-semibold text-gray-900 mb-1">{car.name}</h4>
                          </Link>
                          <p className="text-sm text-gray-600 mb-1">{car.year}</p>

                          <div
                            className="inline-block w-full"
                            onMouseEnter={() => setPriceHoveredIndex(key)}
                            onMouseLeave={() => setPriceHoveredIndex(null)}
                          >
                            <div
                              className={`rounded-lg px-4 py-2 text-center transition-all duration-200 border flex items-center justify-center gap-2 ${
                                isPriceHovered
                                  ? "bg-blue-600 border-blue-600 text-white"
                                  : "bg-white border-blue-200 text-blue-600"
                              }`}
                            >
                              {isPriceHovered ? (
                                <Link href="/compare" className="flex items-center gap-2">
                                  <Scale className="w-5 h-5" />
                                  <span className="font-bold">Add to Compare</span>
                                </Link>
                              ) : (
                                <span className="font-bold">{car.price}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/dealers">
            <Button variant="outline" className="px-8 py-3 bg-transparent">
              View All Certified Dealers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
