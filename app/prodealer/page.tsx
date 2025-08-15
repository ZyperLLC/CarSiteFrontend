"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Eye, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SellCarPage() {
  const router = useRouter()
  const [showPreview, setShowPreview] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [isDealer, setIsDealer] = useState(false)

  const [formData, setFormData] = useState({
    // Car Info (unused in preview as per your request but kept for URL params)
    make: "",
    model: "",
    year: "",
    mileage: "",
    condition: "",
    price: "",
    description: "",
    // Contact Info
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    location: "",
  })

  const handleInputChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
  }

  function checkDealer(email: string) {
    return isDealer || email.trim().endsWith("@dealer.com")
  }

  const publishListing = () => {
    console.log("Publishing listing:", { formData, images: uploadedImages, isDealer })
    alert("Listing published successfully!")

    if (checkDealer(formData.email)) {
      const mainImage = previewImages[0] ? encodeURIComponent(previewImages[0]) : ""
      const params = new URLSearchParams({
        name: formData.name,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
        location: formData.location,
        make: formData.make,
        model: formData.model,
        year: formData.year,
        mileage: formData.mileage,
        condition: formData.condition,
        price: formData.price,
        description: formData.description,
        image: mainImage,
      })
      router.push(`/dealer-dashboard?${params.toString()}`)
    }
  }

  const onPreviewClick = () => {
    if (!isDealer) {
      alert("Please select 'I am a dealer'")
      return
    }
    setShowPreview(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Your Car</h1>
          <p className="text-gray-600">List your car for free and reach thousands of buyers</p>
        </div>

        {/* Only Step 3: Contact Info & Preview */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {!showPreview ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How can buyers reach you?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="e.g. 868-123-4567"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                    placeholder="e.g. 868-123-4567"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <select
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Location</option>
                    <option value="port-of-spain">Port of Spain</option>
                    <option value="san-fernando">San Fernando</option>
                    <option value="chaguanas">Chaguanas</option>
                    <option value="arima">Arima</option>
                    <option value="point-fortin">Point Fortin</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex items-center space-x-2 mt-2">
                  <input
                    id="isDealer"
                    type="checkbox"
                    checked={isDealer}
                    onChange={() => setIsDealer(!isDealer)}
                    className="w-5 h-5 border-gray-300 rounded"
                  />
                  <label htmlFor="isDealer" className="text-xl font-medium text-blue-800 flex items-center">
                    <Shield className="w-6 h-4 mr-1 text-blue-500" />
                    I am a dealer
                  </label>
                </div>
              </div>
              <div className="mt-8 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Safety Tips:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Meet buyers in public, well-lit locations</li>
                  <li>• Verify buyer's identity before test drives</li>
                  <li>• Accept secure payment methods only</li>
                  <li>• Trust your instincts - if something feels wrong, walk away</li>
                </ul>
              </div>
            </>
          ) : (
            /* Listing Preview */
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Preview Your Listing</h2>
                <Button variant="outline" onClick={() => setShowPreview(false)} className="bg-transparent">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Edit Details
                </Button>
              </div>
              {/* Preview Card */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden relative">
                  {/* Main Image */}
                  {previewImages[0] && (
                    <div className="h-64 overflow-hidden relative">
                      <img
                        src={previewImages[0] || "/placeholder.svg"}
                        alt="Main car image"
                        className="w-full h-full object-cover"
                      />
                      {/* DEALER BADGE */}
                      {checkDealer(formData.email) && (
                        <span className="absolute top-2 left-2 bg-blue-800 text-white text-xs px-3 py-1 rounded-full flex items-center font-semibold uppercase tracking-wider shadow">
                          <Shield className="w-3 h-3 mr-1" /> Dealer
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Dealer Contact Information</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      <div>
                        <strong>Name:</strong> {formData.name}
                      </div>
                      <div>
                        <strong>Phone:</strong> {formData.phone}
                      </div>
                      {formData.whatsapp && (
                        <div>
                          <strong>WhatsApp:</strong> {formData.whatsapp}
                        </div>
                      )}
                      <div>
                        <strong>Email:</strong> {formData.email}
                      </div>
                      <div>
                        <strong>Location:</strong> {formData.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Ready to publish?</h4>
                <p className="text-sm text-green-700">
                  Your listing will be live immediately and visible to thousands of potential buyers.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => showPreview && setShowPreview(false)}
              disabled={!showPreview}
              className="flex items-center bg-transparent"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            {!showPreview ? (
              <Button
                onClick={onPreviewClick}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Listing
              </Button>
            ) : (
              <Button onClick={publishListing} className="bg-green-600 hover:bg-green-700 text-white">
                Publish Listing
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
