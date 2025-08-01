"use client"

import Header from "@/components/header"
import {
  Shield,
  Trash2,
  Car,
  PhoneCall,
  Mail,
  MapPin,
  PlusCircle,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useState, useEffect } from "react"

interface Car {
  make: string
  model: string
  year: string
  mileage: string
  condition: string
  price: string
  description: string
  images: string[]
  status: string
}

const defaultCar: Car = {
  make: "",
  model: "",
  year: "",
  mileage: "",
  condition: "",
  price: "",
  description: "",
  images: [],
  status: "Live",
}

const modelsByMake: Record<string, string[]> = {
  toyota: ["Corolla", "Camry", "RAV4", "Hilux"],
  honda: ["Civic", "Accord", "CR-V", "Fit"],
  nissan: ["Altima", "Sentra", "Rogue", "Frontier"],
  ford: ["F-150", "Mustang", "Escape", "Explorer"],
}

function getYears(): number[] {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 25 }, (_, i) => currentYear - i)
}

function getCarFromParams(searchParams: URLSearchParams | null): Car {
  if (!searchParams) {
    return { ...defaultCar }
  }
  return {
    make: searchParams.get("make") || "",
    model: searchParams.get("model") || "",
    year: searchParams.get("year") || "",
    mileage: searchParams.get("mileage") || "",
    condition: searchParams.get("condition") || "",
    price: searchParams.get("price") || "",
    description: searchParams.get("description") || "",
    images: searchParams.get("image") ? [searchParams.get("image") || ""] : [],
    status: "Live",
  }
}

export default function DealerDashboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  interface Profile {
    name: string
    phone: string
    whatsapp: string
    email: string
    location: string
  }

  const initialProfile: Profile = {
    name: searchParams?.get("name") || "Dealer",
    phone: searchParams?.get("phone") || "-",
    whatsapp: searchParams?.get("whatsapp") || "-",
    email: searchParams?.get("email") || "-",
    location: searchParams?.get("location") || "-",
  }

  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [profileEdit, setProfileEdit] = useState<Profile>(initialProfile)
  const [editProfileMode, setEditProfileMode] = useState<boolean>(false)

  const [cars, setCars] = useState<Car[]>(() => {
    if (typeof window === "undefined") return []

    try {
      const savedCars = localStorage.getItem("dealerCars")
      if (savedCars) {
        return JSON.parse(savedCars) as Car[]
      }
    } catch (e) {
      // ignore JSON parse errors
    }

    const c = getCarFromParams(searchParams)
    if (c.make || c.model || c.year || c.price) return [c]
    return []
  })

  const [addingNewCar, setAddingNewCar] = useState<boolean>(false)
  const [newCar, setNewCar] = useState<Car>({ ...defaultCar })

  useEffect(() => {
    try {
      localStorage.setItem("dealerCars", JSON.stringify(cars))
    } catch (e) {
      // Ignore storage errors
    }
  }, [cars])

  function handleProfileInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setProfileEdit((prev) => ({ ...prev, [name]: value }))
  }
  function saveProfile() {
    setProfile(profileEdit)
    setEditProfileMode(false)
  }

  function handleNewCarInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    if (name === "make") {
      setNewCar((prev) => ({
        ...prev,
        make: value,
        model: "",
      }))
    } else {
      setNewCar((prev) => ({ ...prev, [name]: value }))
    }
  }

  function handleNewCarImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return

    const maxToAdd = 6 - newCar.images.length
    const filesToAdd = Array.from(files).slice(0, maxToAdd)

    filesToAdd.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const result = ev.target?.result as string
        setNewCar((prev) => ({
          ...prev,
          images: [...prev.images, result].slice(0, 6),
        }))
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ""
  }

  function removeNewCarImage(idx: number) {
    setNewCar((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }))
  }

  function handleSaveNewCar() {
    if (!newCar.make || !newCar.model) {
      alert("Please fill in at least Make and Model")
      return
    }
    setCars((prev) => [...prev, { ...newCar }])
    setNewCar({ ...defaultCar })
    setAddingNewCar(false)
  }

  function handleDeleteCar(idx: number) {
    setCars((prev) => prev.filter((_, i) => i !== idx))
  }

  function handleAddCarClick() {
    if (cars.length >= 20) {
      alert(
        "You have reached the maximum limit of 20 cars.\nPlease take the Elite Subscription to add more cars."
      )
      return
    }
    setAddingNewCar(true)
  }

  const photoGuideSteps = [
    { title: "FRONT ANGLE SHOT", description: "Take from the front-left or front-right corner" },
    { title: "SIDE PROFILE", description: "Take from the full side (driver or passenger set side)" },
    { title: "REAR SHOT", description: "Take from directly behind the car" },
    { title: "INTERIOR - DASHBOARD VIEW", description: "Take from back seat, facing the dash" },
    { title: "INTERIOR - FRONT SEATS", description: "Open driver door" },
    { title: "ENGINE BAY", description: "(Optional but encouraged)" },
  ]

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 pb-8">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-4xl mt-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 flex items-center mb-6">
            <Shield className="text-blue-500 w-8 h-8 mr-2" /> Dealer Dashboard
          </h2>

          {/* Dealer Profile */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Dealer Profile</h3>
            {!editProfileMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 mb-2">
                <span className="flex items-center">
                  <span className="font-semibold mr-2">Name:</span> {profile.name}
                </span>
                <span className="flex items-center">
                  <PhoneCall className="w-4 h-4 mr-2" /> {profile.phone}
                </span>
                <span className="flex items-center">
                  <span className="font-semibold mr-2">WhatsApp:</span> {profile.whatsapp || "-"}
                </span>
                <span className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> {profile.email}
                </span>
                <span className="flex items-center col-span-1 md:col-span-2">
                  <MapPin className="w-4 h-4 mr-2" /> {profile.location}
                </span>
              </div>
            ) : (
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 mb-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  saveProfile()
                }}
              >
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-0.5">Name</label>
                  <input
                    name="name"
                    className="border p-1 rounded w-full"
                    value={profileEdit.name}
                    onChange={handleProfileInput}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-0.5">Phone</label>
                  <input
                    name="phone"
                    className="border p-1 rounded w-full"
                    value={profileEdit.phone}
                    onChange={handleProfileInput}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-0.5">WhatsApp</label>
                  <input
                    name="whatsapp"
                    className="border p-1 rounded w-full"
                    value={profileEdit.whatsapp}
                    onChange={handleProfileInput}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-0.5">Email</label>
                  <input
                    name="email"
                    className="border p-1 rounded w-full"
                    value={profileEdit.email}
                    onChange={handleProfileInput}
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-0.5">Location</label>
                  <input
                    name="location"
                    className="border p-1 rounded w-full"
                    value={profileEdit.location}
                    onChange={handleProfileInput}
                  />
                </div>
              </form>
            )}
            <div className="flex space-x-2 mt-2 flex-wrap">
              {editProfileMode ? (
                <>
                  <Button type="submit" size="sm" className="bg-green-600 text-white" onClick={saveProfile}>
                    Save
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => setEditProfileMode(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setEditProfileMode(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Your Cars Header & Add Button */}
          <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
            <h3 className="text-xl font-bold text-blue-900">
              Your Cars <span className="text-base text-gray-500">({cars.length})</span>
            </h3>
            {!addingNewCar ? (
              <Button
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700 flex items-center"
                onClick={handleAddCarClick}
              >
                <PlusCircle className="w-4 h-4 mr-1" /> Add Car
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setAddingNewCar(false)
                  setNewCar({ ...defaultCar })
                }}
              >
                Cancel
              </Button>
            )}
          </div>

          {/* Add New Car Form */}
          {addingNewCar && (
            <li className="p-4 border rounded-lg bg-blue-50 mb-6 list-none">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                  <select
                    name="make"
                    value={newCar.make}
                    onChange={handleNewCarInput}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Make</option>
                    {Object.keys(modelsByMake).map((make) => (
                      <option key={make} value={make}>
                        {make.charAt(0).toUpperCase() + make.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <select
                    name="model"
                    value={newCar.model}
                    onChange={handleNewCarInput}
                    disabled={!newCar.make}
                    className="w-full p-2 border border-gray-300 rounded disabled:bg-gray-100"
                  >
                    <option value="">Select Model</option>
                    {newCar.make &&
                      modelsByMake[newCar.make].map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    name="year"
                    value={newCar.year}
                    onChange={handleNewCarInput}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Year</option>
                    {getYears().map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  name="mileage"
                  className="border p-2 rounded w-full"
                  value={newCar.mileage}
                  onChange={handleNewCarInput}
                  placeholder="Mileage (km)"
                  type="number"
                  min={0}
                />
                <input
                  name="condition"
                  className="border p-2 rounded w-full"
                  value={newCar.condition}
                  onChange={handleNewCarInput}
                  placeholder="Condition"
                  type="text"
                />
                <input
                  name="price"
                  className="border p-2 rounded w-full"
                  value={newCar.price}
                  onChange={handleNewCarInput}
                  placeholder="Price (TT$)"
                  type="number"
                  min={0}
                />
              </div>

              <textarea
                name="description"
                className="border p-2 rounded w-full mb-4"
                value={newCar.description}
                onChange={handleNewCarInput}
                placeholder="Description"
                rows={3}
              />

              <div className="flex flex-wrap gap-4 mb-6 justify-center sm:justify-start">
                {photoGuideSteps.map((step, i) => (
                  <div
                    key={i}
                    className="flex-1 min-w-[150px] max-w-xs p-3 bg-blue-50 border border-blue-300 rounded shadow-sm text-blue-900 text-center"
                  >
                    <div className="font-semibold mb-1">{step.title}</div>
                    <div className="text-xs">{step.description}</div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Upload Images (max 6)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleNewCarImagesChange}
                  className="mb-4"
                />

                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {newCar.images.map((imgSrc, i) => (
                    <div
                      key={i}
                      className="relative w-full pb-[100%] rounded border border-gray-300 overflow-hidden"
                    >
                      <img
                        src={imgSrc}
                        alt={`Car image ${i + 1}`}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewCarImage(i)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                        title="Remove Image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 mt-6 flex-wrap">
                <Button size="sm" className="bg-green-600 text-white" onClick={handleSaveNewCar}>
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setAddingNewCar(false)
                    setNewCar({ ...defaultCar })
                  }}
                >
                  Cancel
                </Button>
              </div>
            </li>
          )}

          {cars.length === 0 && !addingNewCar ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-yellow-800 rounded text-center">
              No cars found. Add a new car listing!
            </div>
          ) : (
            <ul className="space-y-6 p-0">
              {cars.map((car, i) => (
                <li key={i} className="p-4 border rounded-lg bg-blue-50 relative list-none">
                  <div className="flex flex-wrap items-center mb-2 gap-x-2 gap-y-1">
                    <Car className="w-5 h-5 text-blue-600 mr-1" />
                    <span className="font-semibold text-lg">
                      {car.make} {car.model}
                    </span>
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                      {car.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-2 md:text-sm text-xs">
                    <div>
                      <strong>Year:</strong> {car.year}
                    </div>
                    <div>
                      <strong>Mileage:</strong> {car.mileage} km
                    </div>
                    <div>
                      <strong>Condition:</strong> {car.condition}
                    </div>
                    <div>
                      <strong>Price:</strong> TT${car.price}
                    </div>
                  </div>
                  <div className="mb-2 text-gray-800 whitespace-pre-line">{car.description}</div>

                  {car.images && car.images.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-2">
                      {car.images.map((imgSrc, idx) => (
                        <img
                          key={idx}
                          src={imgSrc}
                          alt={`${car.make} ${car.model} image ${idx + 1}`}
                          className="w-full h-24 rounded object-cover"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-2 mt-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteCar(i)}
                      title="Delete this car"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
