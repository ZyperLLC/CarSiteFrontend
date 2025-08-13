"use client";

import React, { useState, useRef } from "react";
import {
  PhoneCall,
  Mail,
  MapPin,
  PlusCircle,
  X,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

type Car = {
  make: string;
  model: string;
  year: string;
  mileage: string;
  condition: string;
  price: string;
  description: string;
  images: string[];
  status: string;
  engine?: string;
  drivetrain?: string;
  doors?: string;
  seats?: string;
  fuelType?: string;
  bodyType?: string;
  color?: string;
  vin?: string;
};

type SetCarsFunction = React.Dispatch<React.SetStateAction<Car[]>>;

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
  engine: "",
  drivetrain: "",
  doors: "",
  seats: "",
  fuelType: "",
  bodyType: "",
  color: "",
  vin: "",
};

const modelsByMake: Record<string, string[]> = {
  toyota: ["Corolla", "Camry", "RAV4", "Hilux"],
  honda: ["Civic", "Accord", "CR-V", "Fit"],
  nissan: ["Altima", "Sentra", "Rogue", "Frontier"],
  ford: ["F-150", "Mustang", "Escape", "Explorer"],
};

const getYears = (): number[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 25 }, (_, i) => currentYear - i);
};

const WHITE_INPUT_CLASSES =
  "bg-white rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full";

interface DealerDashboardPageProps {
  cars: Car[];
  setCars: SetCarsFunction;
  onShowMoreClick: () => void;
}

export default function DealerDashboardPage({
  cars,
  setCars,
  onShowMoreClick,
}: DealerDashboardPageProps) {
  const searchParams = useSearchParams();

  const defaultImg = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const initialProfile = {
    name: searchParams?.get("name") || "Dealer",
    phone: searchParams?.get("phone") || "-",
    whatsapp: searchParams?.get("whatsapp") || "-",
    email: searchParams?.get("email") || "-",
    location: searchParams?.get("location") || "-",
    image: defaultImg,
    // Added new profile fields initial empty values
    businessTiming:
      "Monday: Closed\nTuesday: 9am - 5pm\nWednesday: 9am - 5pm\nThursday: 9am - 5pm\nFriday: 9am - 5pm\nSaturday: 10am - 2pm\nSunday: Closed",
    certificatesAwards: "",
    servicesProvided: "",
  };

  const [profile, setProfile] = useState(initialProfile);
  const [profileEdit, setProfileEdit] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newCar, setNewCar] = useState<Car>({ ...defaultCar });
  const fileRef = useRef<HTMLInputElement>(null);

  // State for which profile tab is selected when viewing profile info
  const [profileTab, setProfileTab] = useState<
    "businessTiming" | "certificatesAwards" | "servicesProvided"
  >("businessTiming");

  const handleProfileInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileEdit((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    setProfile(profileEdit);
    setEditMode(false);
    setProfileTab("businessTiming"); // reset tab to default on save
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfile((prev) => ({ ...prev, image: result }));
        setProfileEdit((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleAddCarClick = () => setAdding(true);

  const handleNewCarInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewCar((prev) =>
      name === "make"
        ? { ...prev, make: value.toLowerCase(), model: "" }
        : { ...prev, [name]: value }
    );
  };

  const handleNewCarImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 6 - newCar.images.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setNewCar((prev) => ({
          ...prev,
          images: [...prev.images, result].slice(0, 6),
        }));
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const removeNewCarImage = (indexToRemove: number) => {
    setNewCar((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSaveNewCar = () => {
    if (!newCar.make || !newCar.model) {
      alert("Please fill in Make and Model.");
      return;
    }

    setCars((prevCars) => [...prevCars, { ...newCar }]);
    setNewCar({ ...defaultCar });
    setAdding(false);
  };

  const handleCancelAddCar = () => {
    setAdding(false);
    setNewCar({ ...defaultCar });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setProfileEdit(profile);
  };

  const capitalize = (str: string): string =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const ProfileField = ({
    icon: Icon,
    label,
    value,
  }: {
    icon?: React.ElementType;
    label: string;
    value: string;
  }) => (
    <article className="flex items-start gap-3 min-w-0 w-full">
      <span className="flex items-center gap-1 font-semibold text-blue-900 whitespace-nowrap pt-1 select-none">
        {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
        {label}:
      </span>
      <p
        className="text-gray-800 font-normal break-words break-all whitespace-pre-line w-full min-w-0"
        style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
      >
        {value || "-"}
      </p>
    </article>
  );

  const PhotoGuideCard = ({ title, desc }: { title: string; desc: string }) => (
    <section className="flex-1 min-w-[140px] max-w-xs p-4 bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-300 rounded-lg shadow-sm text-blue-900 text-center select-none">
      <strong className="font-semibold mb-1 block text-lg">{title}</strong>
      <small className="text-sm leading-tight">{desc}</small>
    </section>
  );

  const CarCard = ({ car }: { car: Car }) => (
    <article className="flex flex-col border border-gray-300 rounded-lg shadow hover:shadow-lg transition-shadow bg-white overflow-hidden">
      <div className="relative w-full aspect-w-4 aspect-h-3 bg-gray-100">
        <img
          src={car.images?.[0] || defaultImg}
          alt={`${car.make} ${car.model} image`}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <section className="p-4 flex flex-col flex-1">
        <h4 className="font-bold text-lg text-blue-700">
          {capitalize(car.make)} {car.model} ({car.year})
        </h4>
        <p className="text-sm text-gray-600 mt-1 truncate">{car.description}</p>
        <p className="mt-auto font-semibold text-green-600 text-lg pt-2">
          TT${car.price}
        </p>
      </section>
    </article>
  );

  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 flex flex-col py-8 sm:py-12 px-4 md:px-10 lg:px-20 xl:px-32">
      <section className="bg-white/95 p-8 rounded-3xl shadow-2xl border border-blue-200 max-w-6xl mx-auto w-full">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 relative">
          <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight select-none">
            My Profile
          </h1>
          {!editMode && (
            <button
              type="button"
              title="Edit Profile"
              aria-label="Edit profile details"
              onClick={() => setEditMode(true)}
              className="bg-white border border-blue-300 hover:border-blue-500 shadow-md rounded-full p-2 flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ position: "absolute", top: 0, right: 0 }}
            >
              <Pencil className="w-5 h-5 text-blue-700" />
              <span className="sr-only">Edit Profile</span>
            </button>
          )}
        </header>

        {/* Profile Section */}
        <section className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-16">
          <section
            onClick={() => fileRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileRef.current?.click();
              }
            }}
            aria-label="Click to change profile image"
            className="cursor-pointer flex flex-col items-center flex-shrink-0"
          >
            <img
              src={profile.image || defaultImg}
              alt="Profile"
              className="rounded-full border-4 border-blue-300 shadow-lg w-28 h-28 sm:w-32 sm:h-32 object-cover"
              title="Click to change profile image"
              loading="lazy"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileRef}
              onChange={handleProfileImageChange}
              aria-label="Upload profile image"
            />
          </section>

          {/* Profile edit/display */}
          <section className="flex-1 w-full max-w-4xl relative">
            {!editMode ? (
              <>
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 w-full min-w-0">
                  <ProfileField label="Name" value={profile.name} />
                  <ProfileField icon={PhoneCall} label="Phone" value={profile.phone} />
                  <ProfileField label="WhatsApp" value={profile.whatsapp} />
                  <ProfileField icon={Mail} label="Email" value={profile.email} />
                  <ProfileField icon={MapPin} label="Location" value={profile.location} />
                </section>

                {/* Nav Buttons for new sections */}
                <nav
                  className="mt-6 border-t border-blue-300 pt-6 select-none"
                  role="tablist"
                  aria-label="Profile additional info tabs"
                >
                  <div
                    className="flex gap-4 overflow-x-auto whitespace-normal scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-200 flex-wrap"
                    tabIndex={0} // Make scroll container focusable for accessibility
                    onWheel={(e) => {
                      // Smooth horizontal scroll on vertical wheel
                      if (e.deltaY === 0) return;
                      e.currentTarget.scrollLeft += e.deltaY;
                      e.preventDefault();
                    }}
                  >
                    {["businessTiming", "certificatesAwards", "servicesProvided"].map((tab) => {
                      const isSelected = profileTab === tab;
                      const labels: Record<string, string> = {
                        businessTiming: "Business Timing",
                        certificatesAwards: "Certificates & Awards",
                        servicesProvided: "Services Provided",
                      };
                      const tabId = `${tab}-tab`;
                      const panelId = `${tab}-panel`;
                      return (
                        <button
                          key={tab}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          aria-controls={panelId}
                          id={tabId}
                          onClick={() => setProfileTab(tab as any)}
                          className={`inline-block px-3 sm:px-4 py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 text-center max-w-full break-words ${
                            isSelected
                              ? "bg-blue-700 text-white shadow"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          }`}
                          style={{ minWidth: "auto" }}
                        >
                          {labels[tab]}
                        </button>
                      );
                    })}
                  </div>
                </nav>

                <section className="mt-4 min-w-0">
                  {profileTab === "businessTiming" && (
                    <article
                      id="businessTiming-panel"
                      role="tabpanel"
                      aria-labelledby="businessTiming-tab"
                      className="whitespace-pre-line text-gray-800 border border-blue-300 rounded-lg p-4 min-w-0 bg-white shadow-sm"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {profile.businessTiming || "-"}
                    </article>
                  )}
                  {profileTab === "certificatesAwards" && (
                    <article
                      id="certificatesAwards-panel"
                      role="tabpanel"
                      aria-labelledby="certificatesAwards-tab"
                      className="whitespace-pre-line text-gray-800 border border-blue-300 rounded-lg p-4 min-w-0 bg-white shadow-sm"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {profile.certificatesAwards || "-"}
                    </article>
                  )}
                  {profileTab === "servicesProvided" && (
                    <article
                      id="servicesProvided-panel"
                      role="tabpanel"
                      aria-labelledby="servicesProvided-tab"
                      className="whitespace-pre-line text-gray-800 border border-blue-300 rounded-lg p-4 min-w-0 bg-white shadow-sm"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {profile.servicesProvided || "-"}
                    </article>
                  )}
                </section>
              </>
            ) : (
              <form
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 w-full min-w-0"
                onSubmit={(e) => {
                  e.preventDefault();
                  saveProfile();
                }}
                aria-label="Edit profile form"
              >
                {["name", "phone", "whatsapp", "email", "location"].map(
                  (field) => (
                    <section
                      key={field}
                      className={field === "location" ? "sm:col-span-2 min-w-0" : "min-w-0"}
                    >
                      <label
                        htmlFor={"input-" + field}
                        className="block text-xs font-medium text-gray-500 mb-1 select-none"
                      >
                        {capitalize(field)}
                      </label>
                      <input
                        id={"input-" + field}
                        name={field}
                        type={field === "email" ? "email" : "text"}
                        value={(profileEdit as any)[field]}
                        onChange={handleProfileInput}
                        aria-label={"Edit " + field}
                        required={field !== "whatsapp"}
                        className="border p-2 text-base rounded-xl w-full shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-100 min-w-0"
                      />
                    </section>
                  )
                )}

                {/* New fields: Business Timing, Certificates and Awards, Services */}
                <section className="sm:col-span-2 min-w-0">
                  <label
                    htmlFor="businessTiming-textarea"
                    className="block text-xs font-medium text-gray-500 mb-1 select-none"
                  >
                    Business Timing (Monday - Sunday)
                  </label>
                  <textarea
                    id="businessTiming-textarea"
                    name="businessTiming"
                    value={profileEdit.businessTiming}
                    onChange={handleProfileInput}
                    placeholder="Enter business hours, e.g. Monday: 9am - 5pm"
                    rows={6}
                    className="border p-2 rounded-xl w-full shadow-sm resize-y focus:border-blue-400 focus:ring focus:ring-blue-100"
                  />
                </section>
                <section className="sm:col-span-2 min-w-0">
                  <label
                    htmlFor="certificatesAwards-textarea"
                    className="block text-xs font-medium text-gray-500 mb-1 select-none"
                  >
                    Certificates & Awards
                  </label>
                  <textarea
                    id="certificatesAwards-textarea"
                    name="certificatesAwards"
                    value={profileEdit.certificatesAwards}
                    onChange={handleProfileInput}
                    placeholder="List your certificates and awards"
                    rows={4}
                    className="border p-2 rounded-xl w-full shadow-sm resize-y focus:border-blue-400 focus:ring focus:ring-blue-100"
                  />
                </section>
                <section className="sm:col-span-2 min-w-0">
                  <label
                    htmlFor="servicesProvided-textarea"
                    className="block text-xs font-medium text-gray-500 mb-1 select-none"
                  >
                    Services Provided
                  </label>
                  <textarea
                    id="servicesProvided-textarea"
                    name="servicesProvided"
                    value={profileEdit.servicesProvided}
                    onChange={handleProfileInput}
                    placeholder="Describe the services you provide"
                    rows={4}
                    className="border p-2 rounded-xl w-full shadow-sm resize-y focus:border-blue-400 focus:ring focus:ring-blue-100"
                  />
                </section>

                <section className="sm:col-span-2 flex gap-4 mt-4 justify-start">
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-green-600 text-white px-6 hover:bg-green-700"
                    aria-label="Save profile"
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                    aria-label="Cancel profile edit"
                  >
                    Cancel
                  </Button>
                </section>
              </form>
            )}
          </section>
        </section>

        {/* Cars Section */}
        {cars.length === 0 && !adding && (
          <section className="flex flex-col items-center justify-center gap-6 py-20 border-t border-blue-200">
            <p className="text-xl text-gray-700 font-semibold select-none">
              You don't have any car listings yet.
            </p>
            <Button
              size="lg"
              className="bg-blue-700 hover:bg-blue-800 text-white flex items-center px-8 py-3 rounded-3xl font-semibold shadow-lg"
              onClick={handleAddCarClick}
              aria-label="Add your first car listing"
            >
              <PlusCircle className="w-6 h-6 mr-2" />
              Add Your First Car
            </Button>
          </section>
        )}

        {cars.length > 0 && !adding && (
          <section className="border-t border-blue-200 pt-12">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold text-blue-800 select-none">
                Your Latest Listings
              </h3>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {cars
                .slice(-3)
                .reverse()
                .map((car, index) => (
                  <CarCard key={`car-${index}`} car={car} />
                ))}
            </section>
            <div className="flex justify-center mt-10">
              <Button
                size="lg"
                className="bg-blue-700 hover:bg-blue-800 text-white rounded-3xl px-10 font-bold shadow-md"
                onClick={onShowMoreClick}
                aria-label="Show more car listings"
              >
                Show More
              </Button>
            </div>
          </section>
        )}

        {/* Add Car Form Section */}
        {adding && (
          <form
            className="p-6 sm:p-8 border border-blue-300 rounded-3xl bg-blue-50 mt-12 max-w-4xl mx-auto shadow-lg"
            aria-label="Add new car form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveNewCar();
            }}
          >
            <h3 className="text-3xl font-bold text-blue-900 mb-8 text-center select-none">
              Add Car Listing
            </h3>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <label className="block min-w-0">
                <span className="block font-semibold mb-2 text-blue-800 select-none">
                  Car Brand
                </span>
                <select
                  id="make-select"
                  name="make"
                  value={newCar.make}
                  onChange={handleNewCarInput}
                  className="w-full p-3 text-base rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Brand</option>
                  {Object.keys(modelsByMake).map((make) => (
                    <option key={make} value={make.toLowerCase()}>
                      {capitalize(make)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block min-w-0">
                <span className="block font-semibold mb-2 text-blue-800 select-none">
                  Model
                </span>
                <select
                  id="model-select"
                  name="model"
                  value={newCar.model}
                  onChange={handleNewCarInput}
                  disabled={!newCar.make}
                  className="w-full p-3 text-base rounded-lg border border-blue-400 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Model</option>
                  {newCar.make &&
                    modelsByMake[newCar.make]?.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                </select>
              </label>

              <label className="block min-w-0">
                <span className="block font-semibold mb-2 text-blue-800 select-none">
                  Year
                </span>
                <select
                  id="year-select"
                  name="year"
                  value={newCar.year}
                  onChange={handleNewCarInput}
                  className="w-full p-3 text-base rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Year</option>
                  {getYears().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <label className="block min-w-0">
                <span className="block font-semibold mb-2 text-blue-800 select-none">
                  Mileage (km)
                </span>
                <input
                  id="mileage-input"
                  name="mileage"
                  type="number"
                  min={0}
                  value={newCar.mileage}
                  onChange={handleNewCarInput}
                  required
                  placeholder="e.g. 25000"
                  className="w-full p-3 text-base rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </label>
              <label className="block min-w-0">
                <span className="block font-semibold mb-2 text-blue-800 select-none">
                  Condition
                </span>
                <input
                  id="condition-input"
                  name="condition"
                  type="text"
                  value={newCar.condition}
                  onChange={handleNewCarInput}
                  required
                  placeholder="e.g. Excellent"
                  className="w-full p-3 text-base rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </label>
              <label className="block min-w-0">
                <span className="block font-semibold mb-2 text-blue-800 select-none">
                  Price (TT$)
                </span>
                <input
                  id="price-input"
                  name="price"
                  type="number"
                  min={1000}
                  value={newCar.price}
                  onChange={handleNewCarInput}
                  required
                  placeholder="e.g. 58000"
                  className="w-full p-3 text-base rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </label>
            </section>

            <label className="block mb-8 min-w-0">
              <span className="block font-semibold mb-2 text-blue-800 select-none">
                Description
              </span>
              <textarea
                id="description-textarea"
                name="description"
                value={newCar.description}
                onChange={handleNewCarInput}
                rows={4}
                required
                placeholder="Briefly describe the car, features, highlights, etc."
                className="border border-blue-400 p-4 rounded-lg w-full text-base resize-y min-w-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ wordBreak: "break-word" }}
              />
            </label>

            {/* Additional Specs inputs */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {[
                { label: "Engine", name: "engine" },
                { label: "Drivetrain", name: "drivetrain" },
                { label: "Doors", name: "doors" },
                { label: "Seats", name: "seats" },
                { label: "Fuel Type", name: "fuelType" },
                { label: "Body Type", name: "bodyType" },
                { label: "Color", name: "color" },
                { label: "VIN", name: "vin" }, // Editable VIN input as per your last requirement
              ].map(({ label, name }) => (
                <label key={name} className="block min-w-0">
                  <span className="block font-semibold mb-2 text-blue-800 select-none">{label}</span>
                  <input
                    type="text"
                    name={name}
                    value={(newCar as any)[name] || ""}
                    onChange={handleNewCarInput}
                    className="w-full p-3 text-base rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>
              ))}
            </section>

            <section className="flex flex-wrap gap-5 mb-8 justify-center sm:justify-start select-none">
              {[
                { title: "Front Angle", desc: "Front-left or front-right corner" },
                { title: "Side Profile", desc: "Full driver or passenger side" },
                { title: "Rear", desc: "Directly behind the car" },
                { title: "Dashboard", desc: "From back seat, facing the dash" },
                { title: "Front Seats", desc: "Driver side door open" },
                { title: "Engine Bay", desc: "Optional but encouraged" },
              ].map(({ title, desc }, index) => (
                <PhotoGuideCard key={index} title={title} desc={desc} />
              ))}
            </section>

            <section className="mb-6">
              <label className="font-semibold text-blue-800 mb-3 block select-none">
                Car Images <span className="font-normal text-gray-600">(max 6)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleNewCarImagesChange}
                className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                aria-label="Upload car images"
              />
              {newCar.images.length > 0 && (
                <section className="w-full overflow-x-auto">
                  <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 min-w-[240px]">
                    {newCar.images.map((img, index) => (
                      <article
                        key={index}
                        className="relative w-full pb-[100%] rounded-lg border border-gray-300 overflow-hidden drop-shadow-lg"
                      >
                        <img
                          src={img}
                          alt={`Car image ${index + 1}`}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewCarImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                          title="Remove Image"
                          aria-label={`Remove image ${index + 1}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </article>
                    ))}
                  </section>
                </section>
              )}
            </section>

            <section className="flex flex-wrap gap-5 justify-center">
              <Button
                size="lg"
                className="bg-green-600 text-white px-10 rounded-xl font-semibold hover:bg-green-700 shadow-lg"
                type="submit"
                aria-label="Save new car listing"
              >
                Save Car
              </Button>
              <Button
                size="lg"
                variant="outline"
                type="button"
                className="rounded-xl font-semibold border-blue-400 text-blue-700 hover:bg-blue-50"
                onClick={handleCancelAddCar}
                aria-label="Cancel adding new car"
              >
                Cancel
              </Button>
            </section>
          </form>
        )}
      </section>
    </main>
  );
}
