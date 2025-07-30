"use client"

import { useEffect, useState } from "react"
import CarCard from "@/components/car-card"
import { Button } from "@/components/ui/button"

export default function FeaturedListings() {
  // Car listings data - Add/edit car information here
  const carsData = [
    {
      id: 1,
      name: "Toyota RAV4",
      location: "San Fernando",
      year: 2019,
      price: "$180,000",
      image: "/car1.jpg?height=200&width=300",
      specs: {
        engine: "2.0L Petrol / Automatic",
        mileage: "45,000 km",
        drivetrain: "All Wheel Drive (AWD)",
      },
      description: "The smart choice for comfort, safety, and performance",
    },
    {
      id: 2,
      name: "Toyota RAV4",
      location: "San Fernando",
      year: 2019,
      price: "$180,000",
      image: "/car3.jpg?height=200&width=300",
    },
    {
      id: 3,
      name: "Toyota RAV4",
      location: "San Fernando",
      year: 2019,
      price: "$180,000",
      image: "/car1.jpg", // Use full-size image
      imageStyle: {
        width: "100%",
        height: "200px", // Adjust height as needed
        objectFit: "contain" // Ensures full image fits inside the box
      },
      featured: true,
      specs: {
        engine: "2.0L Petrol / Automatic",
        mileage: "45,000 km",
        drivetrain: "All-Wheel Drive (AWD)",
      },
      description: "The smart choice for comfort, safety, and performance",
    },
    {
      id: 4,
      name: "Toyota RAV4",
      location: "San Fernando",
      year: 2019,
      price: "$180,000",
      image: "/car3.jpg?height=200&width=300",
    },
    {
      id: 5,
      name: "Toyota RAV4",
      location: "San Fernando",
      year: 2019,
      price: "$180,000",
      image: "/car4.jpg?height=200&width=300",
    },
    {
      id: 6,
      name: "Toyota RAV4",
      location: "San Fernando",
      year: 2019,
      price: "$160,000",
      image: "/car5.jpg?height=200&width=300",
    },
    {
      id: 7,
      name: "Toyota RAV4",
      location: "San Fernando",
      year: 2018,
      price: "$180,000",
      image: "/car3.jpg?height=200&width=300",
    },
  ]

  const [featuredCars, setFeaturedCars] = useState(carsData)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // On mobile view (<md)
        const id3Car = carsData.find((car) => car.id === 3)
        const otherCars = carsData.filter((car) => car.id !== 3)
        setFeaturedCars([id3Car!, ...otherCars])
      } else {
        // On desktop view
        setFeaturedCars(carsData)
      }
    }

    handleResize() // Run on mount
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Edit title here */}
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Listings</h2>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-900">
              All cars on one platform — simple and reliable
            </h3>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
            Explore More Cars
          </Button>
        </div>
      </div>
    </section>
  )
}