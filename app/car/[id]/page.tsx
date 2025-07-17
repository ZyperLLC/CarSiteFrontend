"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react"
import Link from "next/link"

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [is360View, setIs360View] = useState(false)
  const [rotation, setRotation] = useState(0)

  // Sample car data - In real app, fetch based on params.id
  const car = {
    id: 1,
    name: "Toyota RAV4",
    location: "San Fernando",
    year: 2019,
    price: "$180,000",
    description:
      "The smart choice for comfort, safety, and performance. This well-maintained RAV4 comes with full service history and is perfect for families.",
    images: [
      "/placeholder.svg?height=400&width=600", // Front angle
      "/placeholder.svg?height=400&width=600", // Side profile
      "/placeholder.svg?height=400&width=600", // Rear shot
      "/placeholder.svg?height=400&width=600", // Interior dashboard
      "/placeholder.svg?height=400&width=600", // Interior seats
      "/placeholder.svg?height=400&width=600", // Engine bay
    ],
    specs: {
      engine: "2.0L Petrol",
      transmission: "Automatic",
      drivetrain: "All Wheel Drive (AWD)",
      mileage: "45,000 km",
      fuelType: "Petrol",
      doors: "5",
      seats: "5",
      condition: "Used",
      bodyType: "SUV",
      color: "White",
      vin: "JTMRF4DV8KD123456",
    },
    seller: {
      name: "John Smith",
      phone: "868-123-4567",
      whatsapp: "868-123-4567",
      location: "San Fernando",
      memberSince: "2020",
    },
    features: [
      "Air Conditioning",
      "Power Steering",
      "Electric Windows",
      "Central Locking",
      "ABS Brakes",
      "Airbags",
      "Bluetooth",
      "Backup Camera",
      "Cruise Control",
      "Keyless Entry",
    ],
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
  }

  const handle360Drag = (e: React.MouseEvent) => {
    if (is360View) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const newRotation = (x / rect.width) * 360
      setRotation(newRotation)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/browse">
            <Button variant="outline" size="sm" className="bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Browse
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-4">
              <div className="relative">
                <div
                  className="relative h-96 bg-gray-100 cursor-pointer"
                  onMouseMove={handle360Drag}
                  style={{
                    transform: is360View ? `rotateY(${rotation}deg)` : "none",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <img
                    src={car.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${car.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* 360 Toggle */}
                  <button
                    onClick={() => setIs360View(!is360View)}
                    className={`absolute top-4 right-4 px-3 py-2 rounded-lg text-sm font-medium ${
                      is360View ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"
                    }`}
                  >
                    <RotateCcw className="w-4 h-4 mr-1 inline" />
                    360° View
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {car.images.length}
                  </div>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="p-4 border-t">
                <div className="flex space-x-2 overflow-x-auto">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index ? "border-blue-600" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Car Details */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Details</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {Object.entries(car.specs).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-100 pb-2">
                    <dt className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}</dt>
                    <dd className="font-medium text-gray-900">{value}</dd>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Car Info & Contact */}
          <div className="space-y-6">
            {/* Car Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{car.name}</h1>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{car.location}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{car.year}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="text-3xl font-bold text-blue-600 mb-4">{car.price}</div>

              <p className="text-gray-600 mb-6">{car.description}</p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Settings className="w-4 h-4 mr-2" />
                  {car.specs.engine}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Gauge className="w-4 h-4 mr-2" />
                  {car.specs.mileage}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Fuel className="w-4 h-4 mr-2" />
                  {car.specs.drivetrain}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {car.year}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Add to Compare</Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Schedule Test Drive
                </Button>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>

              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold">
                    {car.seller.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{car.seller.name}</div>
                  <div className="text-sm text-gray-600">Member since {car.seller.memberSince}</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Seller
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Seller
                </Button>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <Shield className="w-4 h-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <strong>Safety Tip:</strong> Meet in a public place, verify documents, and inspect the vehicle
                    thoroughly before making any payment.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
