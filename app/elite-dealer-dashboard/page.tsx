"use client"

import Header from "@/components/header"
import {
  Shield, Trash2, Car, PhoneCall, Mail, MapPin,
  PlusCircle, X, Search, SortAsc, SortDesc,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import React, { useState, useEffect, useRef } from "react"

type Car = {
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

const getYears = () => {
  const y = new Date().getFullYear()
  return Array(25)
    .fill(0)
    .map((_, i) => y - i)
}

const getCarFromParams = (sp: URLSearchParams | null): Car =>
  sp
    ? {
        make: sp.get("make") || "",
        model: sp.get("model") || "",
        year: sp.get("year") || "",
        mileage: sp.get("mileage") || "",
        condition: sp.get("condition") || "",
        price: sp.get("price") || "",
        description: sp.get("description") || "",
        images: sp.get("image") ? [sp.get("image") || ""] : [],
        status: "Live",
      }
    : { ...defaultCar }

export default function DealerDashboardPage() {
  const sp = useSearchParams()
  const defaultImg =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  const initialProfile = {
    name: sp?.get("name") || "Dealer",
    phone: sp?.get("phone") || "-",
    whatsapp: sp?.get("whatsapp") || "-",
    email: sp?.get("email") || "-",
    location: sp?.get("location") || "-",
    image:
      typeof window !== "undefined"
        ? localStorage.getItem("dealerProfileImage") || defaultImg
        : defaultImg,
  }
  const [profile, setProfile] = useState(initialProfile)
  const [profileEdit, setProfileEdit] = useState(initialProfile)
  const [editMode, setEditMode] = useState(false)

  const [cars, setCars] = useState<Car[]>(() => {
    if (typeof window === "undefined") return []
    try {
      const saved = localStorage.getItem("dealerCars")
      if (saved) return JSON.parse(saved)
    } catch {}
    const c = getCarFromParams(sp)
    return c.make || c.model || c.year || c.price ? [c] : []
  })
  const [adding, setAdding] = useState(false)
  const [newCar, setNewCar] = useState({ ...defaultCar })
  const fileRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState<"year" | "price" | "">("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  useEffect(() => {
    localStorage.setItem("dealerCars", JSON.stringify(cars))
  }, [cars])
  useEffect(() => {
    localStorage.setItem("dealerProfileImage", profile.image || defaultImg)
  }, [profile.image])

  const handleProfileInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setProfileEdit((p) => ({ ...p, [e.target.name]: e.target.value }))

  const saveProfile = () => {
    setProfile(profileEdit)
    setEditMode(false)
  }

  const handleNewCarInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setNewCar((p) =>
      name === "make"
        ? { ...p, make: value.toLowerCase(), model: "" }
        : { ...p, [name]: value }
    )
  }

  const handleNewCarImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files
    if (!f) return
    Array.from(f)
      .slice(0, 6 - newCar.images.length)
      .forEach((file) => {
        const reader = new FileReader()
        reader.onload = (ev) => {
          const r = ev.target?.result as string
          setNewCar((p) => ({ ...p, images: [...p.images, r].slice(0, 6) }))
        }
        reader.readAsDataURL(file)
      })
    e.target.value = ""
  }

  const removeNewCarImage = (i: number) =>
    setNewCar((p) => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }))

  const handleSaveNewCar = () => {
    if (!newCar.make || !newCar.model)
      return alert("Please fill in at least Make and Model")
    setCars((p) => [...p, { ...newCar }])
    setNewCar({ ...defaultCar })
    setAdding(false)
  }

  const handleDeleteCar = (i: number) =>
    setCars((p) => p.filter((_, idx) => idx !== i))
  const handleAddCarClick = () => setAdding(true)

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files
    if (f?.[0]) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const r = ev.target?.result as string
        setProfile((p) => ({ ...p, image: r }))
        setProfileEdit((p) => ({ ...p, image: r }))
      }
      reader.readAsDataURL(f[0])
    }
  }

  const resetProfileImage = () => {
    setProfile((p) => ({ ...p, image: defaultImg }))
    setProfileEdit((p) => ({ ...p, image: defaultImg }))
  }

  const totalCars = cars.length
  const totalLive = cars.filter((c) => c.status.toLowerCase() === "live").length
  const totalVal = cars.reduce((a, c) => a + (Number(c.price) || 0), 0)
  const totalImgs = cars.reduce((a, c) => a + c.images.length, 0)
  const fmtNum = (n: number) => n.toLocaleString()
  const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "")

  const filtered = cars.filter((c) => {
    const t = search.toLowerCase()
    return (
      c.make.toLowerCase().includes(t) ||
      c.model.toLowerCase().includes(t) ||
      c.year.includes(t) ||
      c.price.includes(t)
    )
  })
  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0
    let va = sortField === "year" ? +a.year || 0 : +a.price || 0
    let vb = sortField === "year" ? +b.year || 0 : +b.price || 0
    return sortOrder === "asc" ? va - vb : vb - va
  })

  const toggleStatus = (i: number) =>
    setCars((p) =>
      p.map((c, idx) =>
        idx === i ? { ...c, status: c.status === "Live" ? "Sold" : "Live" } : c
      )
    )

  const clearAll = () =>
    confirm("Delete ALL your cars? This action cannot be undone.") && setCars([])

  const ProfileField = ({
    icon: Icon,
    label,
    value,
  }: {
    icon?: React.ElementType
    label: string
    value: string
  }) => (
    <span className="flex items-center">
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      <strong>{label}:</strong>&nbsp;{value || "-"}
    </span>
  )
  const AnalyticsCard = ({ count, label }: { count: string; label: string }) => (
    <section className="bg-white p-4 rounded shadow flex flex-col items-center">
      <div className="text-3xl font-extrabold">{count}</div>
      <div className="mt-2 text-sm font-semibold">{label}</div>
    </section>
  )
  const PhotoGuideCard = ({ title, desc }: { title: string; desc: string }) => (
    <section className="flex-1 min-w-[150px] max-w-xs p-3 bg-blue-50 border border-blue-300 rounded shadow-sm text-blue-900 text-center">
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-xs">{desc}</div>
    </section>
  )

  return (
    <section className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 pb-8 w-full max-w-7xl mx-auto">
        <section className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full mt-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 flex items-center mb-6">
            <Shield className="text-blue-500 w-8 h-8 mr-2" />
            Dealer Dashboard
          </h2>

          {/* Profile */}
          <section className="mb-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            <section className="flex flex-col items-center">
              <img
                src={profile.image || defaultImg}
                alt="Dealer Profile Image"
                className="w-32 h-32 rounded-full border border-gray-300 object-cover shadow-md"
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileRef}
                onChange={handleProfileImageChange}
                aria-label="Upload profile image"
              />
              <section className="flex space-x-2 mt-3">
                <Button
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                  aria-label="Change profile image"
                >
                  Change Image
                </Button>
                <Button size="sm" variant="outline" onClick={resetProfileImage} aria-label="Reset profile image">
                  Reset
                </Button>
              </section>
            </section>

            <section className="flex-1 w-full">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Dealer Profile</h3>
              {!editMode ? (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 mb-2">
                  <ProfileField label="Name" value={profile.name} />
                  <ProfileField icon={PhoneCall} label="Phone" value={profile.phone} />
                  <ProfileField label="WhatsApp" value={profile.whatsapp} />
                  <ProfileField icon={Mail} label="Email" value={profile.email} />
                  <ProfileField icon={MapPin} label="Location" value={profile.location} />
                </section>
              ) : (
                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 mb-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    saveProfile()
                  }}
                >
                  {["name", "phone", "whatsapp", "email", "location"].map((f) => (
                    <section key={f} className={f === "location" ? "col-span-1 md:col-span-2" : ""}>
                      <label htmlFor={"input-" + f} className="block text-xs font-medium text-gray-500 mb-0.5">
                        {cap(f)}
                      </label>
                      <input
                        id={"input-" + f}
                        name={f}
                        type={f === "email" ? "email" : "text"}
                        value={(profileEdit as any)[f]}
                        onChange={handleProfileInput}
                        aria-label={"Edit " + f}
                        required={f !== "whatsapp"}
                        className="border p-1 rounded w-full"
                      />
                    </section>
                  ))}
                </form>
              )}
              <section className="flex space-x-2 mt-2 flex-wrap">
                {editMode ? (
                  <>
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-green-600 text-white"
                      onClick={saveProfile}
                      aria-label="Save profile"
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setEditMode(false)}
                      aria-label="Cancel profile edit"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setEditMode(true)} aria-label="Edit profile">
                    Edit Profile
                  </Button>
                )}
              </section>
            </section>
          </section>

          {/* Analytics */}
          <section className="mb-10 bg-blue-100 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-bold text-blue-900 mb-6">Dealer Live Analytics</h3>
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6 text-blue-800">
              <AnalyticsCard count={fmtNum(totalCars)} label="Total Cars Listed" />
              <AnalyticsCard count={fmtNum(totalLive)} label="Live Cars" />
              <AnalyticsCard count={`TT$${fmtNum(totalVal)}`} label="Total Value" />
              <AnalyticsCard count={fmtNum(totalImgs)} label="Total Images" />
            </section>
          </section>

          {/* Search & Sort */}
          <section className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <section className="relative flex items-center w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="search"
                aria-label="Search cars"
                placeholder="Search by make, model, year, price..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {!!search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </section>
            <section className="flex items-center gap-2 flex-wrap">
              <label htmlFor="sortField" className="font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sortField"
                aria-label="Select sort field"
                value={sortField}
                onChange={(e) => {
                  setSortField(e.target.value as any)
                  setSortOrder("asc")
                }}
                className="border border-gray-300 rounded p-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">None</option>
                <option value="year">Year</option>
                <option value="price">Price</option>
              </select>
              {sortField && (
                <button
                  onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
                  aria-label="Toggle sort order"
                  className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                >
                  {sortOrder === "asc" ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
                </button>
              )}
            </section>
          </section>

          {/* Cars Header */}
          <section className="flex flex-wrap items-center justify-between mb-4 gap-2">
            <h3 className="text-xl font-bold text-blue-900">
              Your Cars <small className="text-base text-gray-500">({sorted.length})</small>
            </h3>
            <section className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700 flex items-center"
                onClick={handleAddCarClick}
                aria-label="Add new car listing"
              >
                <PlusCircle className="w-4 h-4 mr-1" />
                Add Car
              </Button>
              {!!cars.length && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={clearAll}
                  aria-label="Clear all car listings"
                >
                  Clear All
                </Button>
              )}
            </section>
          </section>

          {/* Add New Car */}
          {adding && (
            <li className="p-4 border rounded-lg bg-blue-50 mb-6 list-none" aria-label="Add new car form">
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
                {["Make", "Model", "Year"].map((label) => {
                  const id = label.toLowerCase() + "-select"
                  if (label === "Make")
                    return (
                      <section key={id}>
                        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                          {label}
                        </label>
                        <select
                          id={id}
                          name="make"
                          value={newCar.make}
                          onChange={handleNewCarInput}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        >
                          <option value="">Select Make</option>
                          {Object.keys(modelsByMake).map((m) => (
                            <option key={m} value={m.toLowerCase()}>
                              {cap(m)}
                            </option>
                          ))}
                        </select>
                      </section>
                    )
                  if (label === "Model")
                    return (
                      <section key={id}>
                        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                          {label}
                        </label>
                        <select
                          id={id}
                          name="model"
                          value={newCar.model}
                          onChange={handleNewCarInput}
                          disabled={!newCar.make}
                          className="w-full p-2 border border-gray-300 rounded disabled:bg-gray-100"
                          required
                        >
                          <option value="">Select Model</option>
                          {(newCar.make &&
                            modelsByMake[newCar.make]?.map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))) ||
                            null}
                        </select>
                      </section>
                    )
                  return (
                    <section key={id}>
                      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                      </label>
                      <select
                        id={id}
                        name="year"
                        value={newCar.year}
                        onChange={handleNewCarInput}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      >
                        <option value="">Select Year</option>
                        {getYears().map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </section>
                  )
                })}
              </section>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {["mileage", "condition", "price"].map((f) => (
                  <input
                    key={f}
                    id={f + "-input"}
                    name={f}
                    type={f === "price" || f === "mileage" ? "number" : "text"}
                    min={0}
                    placeholder={cap(f) + (f !== "condition" ? (f === "price" ? " (TT$)" : " (km)") : "")}
                    value={(newCar as any)[f]}
                    onChange={handleNewCarInput}
                    className="border p-2 rounded w-full"
                  />
                ))}
              </section>

              <textarea
                id="description-textarea"
                name="description"
                className="border p-2 rounded w-full mb-4"
                value={newCar.description}
                onChange={handleNewCarInput}
                rows={3}
                placeholder="Description"
              />

              <section className="flex flex-wrap gap-4 mb-6 justify-center sm:justify-start">
                {[
                  { title: "FRONT ANGLE SHOT", desc: "Take from the front-left or front-right corner" },
                  { title: "SIDE PROFILE", desc: "Take from the full side (driver or passenger set side)" },
                  { title: "REAR SHOT", desc: "Take from directly behind the car" },
                  { title: "INTERIOR - DASHBOARD VIEW", desc: "Take from back seat, facing the dash" },
                  { title: "INTERIOR - FRONT SEATS", desc: "Open driver door" },
                  { title: "ENGINE BAY", desc: "(Optional but encouraged)" },
                ].map(({ title, desc }, i) => (
                  <PhotoGuideCard key={i} title={title} desc={desc} />
                ))}
              </section>

              <section>
                <label className="block mb-2 font-medium text-gray-700">Upload Images (max 6)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleNewCarImagesChange}
                  className="mb-4"
                  aria-label="Upload car images"
                />
                <section className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {newCar.images.map((img, i) => (
                    <section key={i} className="relative w-full pb-[100%] rounded border border-gray-300 overflow-hidden">
                      <img src={img} alt={`Car image ${i + 1}`} className="absolute top-0 left-0 w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeNewCarImage(i)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                        title="Remove Image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </section>
                  ))}
                </section>
              </section>

              <section className="flex space-x-2 mt-6 flex-wrap">
                <Button size="sm" className="bg-green-600 text-white" onClick={handleSaveNewCar} aria-label="Save new car listing">
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setAdding(false)
                    setNewCar({ ...defaultCar })
                  }}
                  aria-label="Cancel adding new car"
                >
                  Cancel
                </Button>
              </section>
            </li>
          )}

          {/* Cars List */}
          {!sorted.length && !adding ? (
            <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-yellow-800 rounded text-center" aria-live="polite">
              No cars found. Add a new car listing!
            </section>
          ) : (
            <ul className="space-y-6 p-0" aria-label="List of cars">
              {sorted.map((car, i) => (
                <li key={i} className="p-4 border rounded-lg bg-blue-50 relative list-none">
                  <section className="flex flex-wrap items-center mb-2 gap-x-2 gap-y-1">
                    <Car className="w-5 h-5 text-blue-600 mr-1" />
                    <span className="font-semibold text-lg">{cap(car.make)} {car.model}</span>
                    <button
                      type="button"
                      onClick={() => toggleStatus(i)}
                      className={`ml-2 text-xs px-2 py-0.5 rounded-full font-semibold cursor-pointer ${car.status === "Live" ? "bg-green-100 text-green-800" : "bg-gray-300 text-gray-700"}`}
                      aria-label={`Mark car as ${car.status === "Live" ? "Sold" : "Live"}`}
                      title={`Click to mark as ${car.status === "Live" ? "Sold" : "Live"}`}
                    >
                      {car.status}
                    </button>
                  </section>
                  <section className="grid grid-cols-2 gap-2 mb-2 md:text-sm text-xs">
                    <div><strong>Year:</strong> {car.year}</div>
                    <div><strong>Mileage:</strong> {car.mileage} km</div>
                    <div><strong>Condition:</strong> {car.condition}</div>
                    <div><strong>Price:</strong> TT${car.price}</div>
                  </section>
                  <section className="mb-2 text-gray-800 whitespace-pre-line">{car.description}</section>
                  {car.images.length > 0 && (
                    <section className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-2">
                      {car.images.map((img, idx) => (
                        <img key={idx} src={img} alt={`${car.make} ${car.model} image ${idx + 1}`} className="w-full h-24 rounded object-cover" />
                      ))}
                    </section>
                  )}
                  <section className="flex space-x-2 mt-2 flex-wrap">
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteCar(i)} title="Delete this car" aria-label={`Delete car ${car.make} ${car.model}`}>
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </section>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </section>
  )
}