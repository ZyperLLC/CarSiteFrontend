"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Upload, Camera, Check, X, Eye } from "lucide-react"

export default function SellCarPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)

  const [formData, setFormData] = useState({
    // Car Info
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

  const totalSteps = 3
  const maxImages = 6

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const remainingSlots = maxImages - uploadedImages.length
    const filesToAdd = files.slice(0, remainingSlots)

    setUploadedImages((prev) => [...prev, ...filesToAdd])

    // Create preview URLs
    filesToAdd.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImages((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
  }

  const photoGuideSteps = [
    { title: "FRONT ANGLE SHOT", description: "Take from the front-left or front-right corner" },
    { title: "SIDE PROFILE", description: "Take from the full side (driver or passenger set side)" },
    { title: "REAR SHOT", description: "Take from directly behind the car" },
    { title: "INTERIOR - DASHBOARD VIEW", description: "Take from back seat, facing the dash" },
    { title: "INTERIOR - FRONT SEATS", description: "Open driver door" },
    { title: "ENGINE BAY", description: "(Optional but encouraged)" },
  ]

  const publishListing = () => {
    // In real app, this would submit to API
    console.log("Publishing listing:", { formData, images: uploadedImages })
    alert("Listing published successfully!")
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

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step < currentStep ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 3 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-8">
            <span className={`text-sm ${currentStep >= 1 ? "text-blue-600 font-medium" : "text-gray-500"}`}>
              Car Details
            </span>
            <span className={`text-sm ${currentStep >= 2 ? "text-blue-600 font-medium" : "text-gray-500"}`}>
              Photos
            </span>
            <span className={`text-sm ${currentStep >= 3 ? "text-blue-600 font-medium" : "text-gray-500"}`}>
              Contact & Preview
            </span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {/* Step 1: Car Details */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about your car</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Make *</label>
                  <select
                    value={formData.make}
                    onChange={(e) => handleInputChange("make", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Make</option>
                    <option value="toyota">Toyota</option>
                    <option value="honda">Honda</option>
                    <option value="nissan">Nissan</option>
                    <option value="ford">Ford</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                    placeholder="e.g. RAV4, Civic, Altima"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                  <select
                    value={formData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mileage (km) *</label>
                  <input
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => handleInputChange("mileage", e.target.value)}
                    placeholder="e.g. 45000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition *</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => handleInputChange("condition", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Condition</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="needs-work">Needs Work</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asking Price (TT$) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="e.g. 180000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Tell buyers about your car's features, maintenance history, etc."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 2: Enhanced Photos */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add photos of your car</h2>

              {/* Photo Guide */}
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">6 Simple Shots for Every Listing</h3>
                <img
                  src="/sell-car-guide.png"
                  alt="Photo guide showing 6 different angles"
                  className="w-full max-w-2xl mx-auto rounded-lg mb-4"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {photoGuideSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-blue-900 text-sm">{step.title}</div>
                        <div className="text-blue-800 text-xs">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Upload Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {Array.from({ length: maxImages }).map((_, index) => (
                  <div key={index} className="aspect-square border-2 border-dashed border-gray-300 rounded-lg relative">
                    {previewImages[index] ? (
                      <div className="relative w-full h-full">
                        <img
                          src={previewImages[index] || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                          {photoGuideSteps[index]?.title.split(" ")[0] || `Photo ${index + 1}`}
                        </div>
                      </div>
                    ) : (
                      <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                        <Camera className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500 text-center px-2">
                          {photoGuideSteps[index]?.title || `Photo ${index + 1}`}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadedImages.length >= maxImages}
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>

              {/* Upload Button */}
              <div className="text-center">
                <label className="inline-block">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={uploadedImages.length >= maxImages}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Photos ({uploadedImages.length}/{maxImages})
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadedImages.length >= maxImages}
                  />
                </label>
              </div>

              {/* Photo Tips */}
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Photo Tips:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Take photos in good lighting (daylight works best)</li>
                  <li>• Clean your car before taking photos</li>
                  <li>• Follow the 6-shot guide for best results</li>
                  <li>• Show any damage or wear honestly</li>
                  <li>• First photo will be your main listing image</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Contact Info & Preview */}
          {currentStep === 3 && (
            <div>
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
                  </div>

                  {/* Safety Tips */}
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
                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                      {/* Main Image */}
                      {previewImages[0] && (
                        <div className="h-64 overflow-hidden">
                          <img
                            src={previewImages[0] || "/placeholder.svg"}
                            alt="Main car image"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Car Details */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {formData.make} {formData.model}
                        </h3>
                        <p className="text-gray-600 mb-1">{formData.location}</p>
                        <p className="text-gray-600 mb-4">{formData.year}</p>

                        <div className="text-2xl font-bold text-blue-600 mb-4">
                          TT${formData.price ? Number.parseInt(formData.price).toLocaleString() : "0"}
                        </div>

                        {formData.description && <p className="text-gray-600 mb-4">{formData.description}</p>}

                        {/* Quick Specs */}
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <strong>Year:</strong> {formData.year}
                          </div>
                          <div>
                            <strong>Mileage:</strong> {formData.mileage} km
                          </div>
                          <div>
                            <strong>Condition:</strong> {formData.condition}
                          </div>
                          <div>
                            <strong>Photos:</strong> {uploadedImages.length}
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="border-t pt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Seller Contact</h4>
                          <div className="text-sm text-gray-600 space-y-1">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confirmation */}
                  <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Ready to publish?</h4>
                    <p className="text-sm text-green-700">
                      Your listing will be live immediately and visible to thousands of potential buyers.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center bg-transparent"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : !showPreview ? (
              <Button
                onClick={() => setShowPreview(true)}
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
