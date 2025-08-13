"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"

export default function SellCarPage() {
  const router = useRouter()

  const [errors, setErrors] = useState<string[]>([])

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    location: "",
  })

  /** Validate contact info before continuing **/
  const validateForm = () => {
    const newErrors: string[] = []
    if (!formData.name) newErrors.push("Name is required")
    if (!formData.phone) newErrors.push("Phone number is required")
    if (!formData.email) newErrors.push("Email is required")
    if (!formData.location) newErrors.push("Location is required")
    setErrors(newErrors)
    return newErrors.length === 0
  }

  /** Continue to dashboard after validation **/
  const handleContinue = () => {
    if (validateForm()) {
      // In a real app, you could save formData to a database or global store here.
      console.log("Contact Info Submitted:", formData)
      router.push("/dealer-dashboard")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Enter Your Contact Details</h1>
          <p className="text-gray-600">Buyers will use this information to reach you</p>
        </div>

        {/* Show validation errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-4">
            <ul className="list-disc ml-5">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold mb-6">How can buyers reach you?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your full name"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="e.g. 868-123-4567"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                placeholder="e.g. 868-123-4567"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Location *</label>
              <select
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full p-3 border rounded-lg"
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

          {/* Continue Button */}
          <div className="flex justify-end mt-8 pt-6 border-t">
            <Button
              onClick={handleContinue}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
            >
              Continue to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
