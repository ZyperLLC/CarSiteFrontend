"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

// Type for photo guide steps
interface PhotoGuideStep {
  title: string;
  description: string;
}

// Maximum number of images allowed
const maxImages = 6;

// Define the photo guide steps
const photoGuideSteps: PhotoGuideStep[] = [
  { title: "Front View", description: "Take a clear photo of the front of the car." },
  { title: "Rear View", description: "Take a clear photo of the back of the car." },
  { title: "Left Side", description: "Photograph the left side of the car." },
  { title: "Right Side", description: "Photograph the right side of the car." },
  { title: "Interior", description: "Show the dashboard and seats." },
  { title: "Engine", description: "Open the hood and take a photo of the engine." },
];

export default function SellCarPage() {
  const router = useRouter();

  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    location: "",
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  /** Validate contact info before continuing **/
  const validateForm = () => {
    const newErrors: string[] = [];
    if (!formData.name) newErrors.push("Name is required");
    if (!formData.phone) newErrors.push("Phone number is required");
    if (!formData.email) newErrors.push("Email is required");
    if (!formData.location) newErrors.push("Location is required");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  /** Continue to dashboard after validation **/
  const handleContinue = () => {
    if (validateForm()) {
      console.log("Contact Info Submitted:", formData);
      router.push("/dealer-dashboard");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /** Handle image uploads **/
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);

    if (uploadedImages.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images.`);
      return;
    }

    setUploadedImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  /** Remove an uploaded image **/
  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Enter Your Contact Details</h1>
          <p className="text-gray-600">Buyers will use this information to reach you</p>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-4">
            <ul className="list-disc ml-5">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

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
                  {photoGuideSteps.map((step: PhotoGuideStep, index: number) => (
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
                          src={previewImages[index]}
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
  );
}
