"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import CarCard from "@/components/car-card"
import { Button } from "@/components/ui/button"

export default function FeaturedListings() {
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
      image: "/car1.jpg",
      imageStyle: {
        width: "100%",
        height: "200px",
        objectFit: "contain",
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
        const id3Car = carsData.find((car) => car.id === 3)
        const otherCars = carsData.filter((car) => car.id !== 3)
        setFeaturedCars([id3Car!, ...otherCars])
      } else {
        setFeaturedCars(carsData)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const MotionCard = ({ car, index }: { car: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      <CarCard car={car} />
    </motion.div>
  )

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Listings</h2>

        {/* First row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {featuredCars.slice(0, 3).map((car, index) => (
            <MotionCard key={car.id} car={car} index={index} />
          ))}
        </div>

        {/* Second row - 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {featuredCars.slice(3, 7).map((car, index) => (
            <MotionCard key={car.id} car={car} index={index} />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-6 rounded-lg shadow-sm">
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
