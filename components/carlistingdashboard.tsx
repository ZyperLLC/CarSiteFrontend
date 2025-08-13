"use client";

import React, { useState } from "react";
import { X as XIcon, Trash2, Pencil, Save, PlusCircle } from "lucide-react";

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
  color?: string;
  drivetrain?: string;
  doors?: string;
  seats?: string;
  fuelType?: string;
  bodyType?: string;
  vin?: string;
};

type CarListingProps = {
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
};

const plans = [
  { id: "featured", label: "Featured", description: "$5–$10", priceMin: 5, priceMax: 10 },
  { id: "topSearch", label: "Top of Search", description: "$3/week", price: 3 },
  { id: "urgentBadge", label: "Urgent Badge", description: "$2", price: 2 },
];

const WHITE_INPUT_CLASSES =
  "bg-white rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full";

const CarListing: React.FC<CarListingProps> = ({ cars, setCars }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [editCar, setEditCar] = useState<Car | null>(null);
  const [addingCar, setAddingCar] = useState(false);

  const defaultNewCar: Car = {
    make: "",
    model: "",
    year: "",
    mileage: "",
    condition: "",
    price: "",
    description: "",
    images: [],
    status: "",
    engine: "",
    color: "",
    drivetrain: "",
    doors: "",
    seats: "",
    fuelType: "",
    bodyType: "",
    vin: "",
  };

  const [newCar, setNewCar] = useState<Car>({ ...defaultNewCar });

  // NEW: State for add form errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // --- Utility handlers ---

  const openAddCar = () => {
    setAddingCar(true);
    setSelectedIdx(null);
    setEditCar(null);
    setNewCar({ ...defaultNewCar });
    setFormErrors({});
  };

  const cancelAddCar = () => {
    setAddingCar(false);
    setNewCar({ ...defaultNewCar });
    setFormErrors({});
  };

  const handleNewCarChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewCar((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error on change
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation helper function
  const validateNewCar = (): boolean => {
    const errors: Record<string, string> = {};

    if (!newCar.make.trim()) {
      errors.make = "Brand is required.";
    }
    if (!newCar.model.trim()) {
      errors.model = "Model is required.";
    }
    const yearNum = Number(newCar.year);
    if (!newCar.year.toString().trim()) {
      errors.year = "Year is required.";
    } else if (isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear() + 1) {
      errors.year = `Year must be between 1900 and ${new Date().getFullYear() + 1}.`;
    }
    const mileageNum = Number(newCar.mileage);
    if (!newCar.mileage.toString().trim()) {
      errors.mileage = "Mileage is required.";
    } else if (!/^\d+$/.test(newCar.mileage.toString()) || mileageNum < 0) {
      errors.mileage = "Mileage must be a non-negative integer.";
    }
    if (!newCar.condition.trim()) {
      errors.condition = "Condition is required.";
    }
    const priceNum = Number(newCar.price);
    if (!newCar.price.toString().trim()) {
      errors.price = "Price is required.";
    } else if (isNaN(priceNum) || priceNum < 1000) {
      errors.price = "Price must be a number greater or equal to 1000.";
    }
    if (!newCar.status.trim()) {
      errors.status = "Status is required.";
    }
    if (!newCar.description.trim()) {
      errors.description = "Description is required.";
    }
    if (newCar.images.length === 0) {
      errors.images = "Please upload at least one image.";
    }
    if (newCar.doors && !/^\d+$/.test(newCar.doors)) {
      errors.doors = "Doors must be an integer.";
    }
    if (newCar.seats && !/^\d+$/.test(newCar.seats)) {
      errors.seats = "Seats must be an integer.";
    }
    if (newCar.vin && !/^[A-HJ-NPR-Z0-9]{8,17}$/i.test(newCar.vin)) {
      errors.vin = "VIN must be 8-17 alphanumeric (excluding I, O, Q).";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveNewCar = () => {
    if (!validateNewCar()) {
      alert("Please fix the form errors before saving.");
      return;
    }
    setCars((prev) => [...prev, newCar]);
    setAddingCar(false);
    setNewCar({ ...defaultNewCar });
    setFormErrors({});
  };

  const openDetail = (idx: number) => {
    if (addingCar) return;
    setSelectedIdx(idx);
    setEditCar(null);
  };

  const backToList = () => {
    setSelectedIdx(null);
    setEditCar(null);
  };

  const openEdit = () => {
    if (selectedIdx === null) return;
    setEditCar({ ...cars[selectedIdx] });
    setAddingCar(false);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (!editCar) return;
    setEditCar({ ...editCar, [name]: value });
  };

  const saveEdit = () => {
    if (selectedIdx === null || !editCar) return;
    const newCars = [...cars];
    newCars[selectedIdx] = editCar;
    setCars(newCars);
    setEditCar(null);
  };

  const deleteCar = () => {
    if (selectedIdx === null) return;
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    setCars(cars.filter((_, i) => i !== selectedIdx));
    setSelectedIdx(null);
    setEditCar(null);
  };

  const handleNewCarImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (files.length + newCar.images.length > 6) {
      alert("You can only upload max 6 images.");
      e.target.value = "";
      return;
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setNewCar((prev) => ({
          ...prev,
          images: [...prev.images, ev.target?.result as string].slice(0, 6),
        }));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeNewCarImage = (idx: number) => {
    setNewCar((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const handleEditCarImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editCar) return;
    const files = e.target.files;
    if (!files) return;

    if (files.length + editCar.images.length > 6) {
      alert("You can only upload max 6 images.");
      e.target.value = "";
      return;
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEditCar((prev) =>
          prev
            ? {
                ...prev,
                images: [...prev.images, ev.target?.result as string].slice(0, 6),
              }
            : prev
        );
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeEditImage = (idx: number) => {
    if (!editCar) return;
    setEditCar({ ...editCar, images: editCar.images.filter((_, i) => i !== idx) });
  };

  // --- Add Car form ---
  if (addingCar) {
    return (
      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-200">
        <button
          onClick={cancelAddCar}
          className="mb-6 flex items-center gap-2 text-blue-600 font-semibold hover:underline transition"
        >
          ← Back to Listings
        </button>
        <h2 className="text-2xl font-extrabold mb-6">Add New Car</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveNewCar();
          }}
          className="space-y-6"
          noValidate
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Make */}
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Brand</span>
              <input
                name="make"
                type="text"
                value={newCar.make}
                onChange={handleNewCarChange}
                required
                className={`${WHITE_INPUT_CLASSES} ${formErrors.make ? "border-red-600 focus:ring-red-600" : ""}`}
                aria-invalid={!!formErrors.make}
                aria-describedby="make-error"
              />
              {formErrors.make && (
                <p className="text-red-600 text-xs mt-1" id="make-error">{formErrors.make}</p>
              )}
            </label>
            {/* Model */}
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Model</span>
              <input
                name="model"
                type="text"
                value={newCar.model}
                onChange={handleNewCarChange}
                required
                className={`${WHITE_INPUT_CLASSES} ${formErrors.model ? "border-red-600 focus:ring-red-600" : ""}`}
                aria-invalid={!!formErrors.model}
                aria-describedby="model-error"
              />
              {formErrors.model && (
                <p className="text-red-600 text-xs mt-1" id="model-error">{formErrors.model}</p>
              )}
            </label>
            {/* Year */}
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Year</span>
              <input
                name="year"
                type="number"
                min={1900}
                max={new Date().getFullYear() + 1}
                value={newCar.year}
                onChange={handleNewCarChange}
                required
                className={`${WHITE_INPUT_CLASSES} ${formErrors.year ? "border-red-600 focus:ring-red-600" : ""}`}
                aria-invalid={!!formErrors.year}
                aria-describedby="year-error"
              />
              {formErrors.year && (
                <p className="text-red-600 text-xs mt-1" id="year-error">{formErrors.year}</p>
              )}
            </label>
            {/* Mileage */}
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Mileage (km)</span>
              <input
                name="mileage"
                type="number"
                min={0}
                value={newCar.mileage}
                onChange={handleNewCarChange}
                required
                className={`${WHITE_INPUT_CLASSES} ${formErrors.mileage ? "border-red-600 focus:ring-red-600" : ""}`}
                aria-invalid={!!formErrors.mileage}
                aria-describedby="mileage-error"
              />
              {formErrors.mileage && (
                <p className="text-red-600 text-xs mt-1" id="mileage-error">{formErrors.mileage}</p>
              )}
            </label>
            {/* Condition */}
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Condition</span>
              <input
                name="condition"
                type="text"
                value={newCar.condition}
                onChange={handleNewCarChange}
                required
                className={`${WHITE_INPUT_CLASSES} ${formErrors.condition ? "border-red-600 focus:ring-red-600" : ""}`}
                aria-invalid={!!formErrors.condition}
                aria-describedby="condition-error"
              />
              {formErrors.condition && (
                <p className="text-red-600 text-xs mt-1" id="condition-error">{formErrors.condition}</p>
              )}
            </label>
            {/* Price */}
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Price (TT$)</span>
              <input
                name="price"
                type="number"
                min={1000}
                value={newCar.price}
                onChange={handleNewCarChange}
                required
                className={`${WHITE_INPUT_CLASSES} ${formErrors.price ? "border-red-600 focus:ring-red-600" : ""}`}
                aria-invalid={!!formErrors.price}
                aria-describedby="price-error"
              />
              {formErrors.price && (
                <p className="text-red-600 text-xs mt-1" id="price-error">{formErrors.price}</p>
              )}
            </label>
            {/* Status */}
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Status</span>
              <select
                name="status"
                value={newCar.status}
                onChange={handleNewCarChange}
                className={`${WHITE_INPUT_CLASSES} ${formErrors.status ? "border-red-600 focus:ring-red-600" : ""}`}
                required
                aria-invalid={!!formErrors.status}
                aria-describedby="status-error"
              >
                <option value="">Select Status</option>
                <option value="Live">Live</option>
                <option value="Sold">Sold</option>
                <option value="Pending">Pending</option>
              </select>
              {formErrors.status && (
                <p className="text-red-600 text-xs mt-1" id="status-error">{formErrors.status}</p>
              )}
            </label>
          </div>

          {/* Description */}
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Description</span>
            <textarea
              name="description"
              rows={4}
              value={newCar.description}
              onChange={handleNewCarChange}
              required
              className={`${WHITE_INPUT_CLASSES} resize-y ${formErrors.description ? "border-red-600 focus:ring-red-600" : ""}`}
              aria-invalid={!!formErrors.description}
              aria-describedby="description-error"
            />
            {formErrors.description && (
              <p className="text-red-600 text-xs mt-1" id="description-error">{formErrors.description}</p>
            )}
          </label>

          {/* Editable Specs Section as inputs */}
          <section className="bg-gray-50 p-4 rounded-md border border-gray-300 text-gray-700 font-medium grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Engine", name: "engine" },
              { label: "Drivetrain", name: "drivetrain" },
              { label: "Doors", name: "doors" },
              { label: "Seats", name: "seats" },
              { label: "Fuel Type", name: "fuelType" },
              { label: "Body Type", name: "bodyType" },
              { label: "Color", name: "color" },
              { label: "VIN", name: "vin" },
            ].map(({ label, name }) => (
              <label key={name} className="block">
                <span className="font-semibold text-gray-700">{label}:</span>
                <input
                  type="text"
                  name={name}
                  value={(newCar as any)[name] || ""}
                  onChange={handleNewCarChange}
                  className={`${WHITE_INPUT_CLASSES} mt-1 ${formErrors[name] ? "border-red-600 focus:ring-red-600" : ""}`}
                  aria-invalid={!!formErrors[name]}
                  aria-describedby={`${name}-error`}
                />
                {formErrors[name] && (
                  <p className="text-red-600 text-xs mt-1" id={`${name}-error`}>{formErrors[name]}</p>
                )}
              </label>
            ))}
          </section>

          <div>
            <label
              className={`block mb-2 text-sm font-semibold text-gray-700 ${formErrors.images ? "text-red-600" : ""}`}
            >
              Upload Images (max 6)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleNewCarImages}
              className="mb-4"
              aria-label="Upload car images"
              aria-invalid={!!formErrors.images}
              aria-describedby="images-error"
            />
            {formErrors.images && (
              <p className="text-red-600 text-xs mt-1" id="images-error">{formErrors.images}</p>
            )}
            {newCar.images.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-6">
                {newCar.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 rounded-lg border border-gray-300 overflow-hidden shadow-sm"
                  >
                    <img src={img} alt={`Car ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewCarImage(i)}
                      aria-label={`Remove image ${i + 1}`}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:opacity-90 transition"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <Save className="w-5 h-5" /> Save
            </button>
            <button
              type="button"
              onClick={cancelAddCar}
              className="bg-gray-300 px-6 py-3 rounded-lg shadow hover:bg-gray-400 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    );
  }

  // --- Edit Car Form ---
  if (selectedIdx !== null) {
    if (editCar) {
      return (
        <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-200">
          <button
            onClick={() => setEditCar(null)}
            className="mb-6 flex items-center gap-2 text-blue-600 font-semibold hover:underline transition"
          >
            ← Back to Details
          </button>
          <h2 className="text-2xl font-extrabold mb-6">Edit Car</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveEdit();
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Brand", name: "make", type: "text" },
                { label: "Model", name: "model", type: "text" },
                { label: "Year", name: "year", type: "number" },
                { label: "Mileage (km)", name: "mileage", type: "number" },
                { label: "Condition", name: "condition", type: "text" },
                { label: "Price (TT$)", name: "price", type: "number" },
                { label: "Status", name: "status", type: "text" },
              ].map(({ label, name, type }) => (
                <label key={name} className="block">
                  <span className="text-sm font-semibold text-gray-700">{label}</span>
                  <input
                    name={name}
                    type={type}
                    value={(editCar as any)[name] || ""}
                    onChange={handleEditChange}
                    required
                    className={WHITE_INPUT_CLASSES}
                  />
                </label>
              ))}
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Description</span>
              <textarea
                name="description"
                rows={4}
                value={editCar.description}
                onChange={handleEditChange}
                required
                className={WHITE_INPUT_CLASSES + " resize-y"}
              />
            </label>

            {/* Editable Specs Section as inputs */}
            <section className="bg-gray-50 p-4 rounded-md border border-gray-300 text-gray-700 font-medium grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Engine", name: "engine" },
                { label: "Drivetrain", name: "drivetrain" },
                { label: "Doors", name: "doors" },
                { label: "Seats", name: "seats" },
                { label: "Fuel Type", name: "fuelType" },
                { label: "Body Type", name: "bodyType" },
                { label: "Color", name: "color" },
                { label: "VIN", name: "vin" },
              ].map(({ label, name }) => (
                <label key={name} className="block">
                  <span className="font-semibold text-gray-700">{label}:</span>
                  <input
                    type="text"
                    name={name}
                    value={(editCar as any)[name] || ""}
                    onChange={handleEditChange}
                    className={WHITE_INPUT_CLASSES + " mt-1"}
                  />
                </label>
              ))}
            </section>

            <div>
              <div className="flex gap-4 flex-wrap mb-6">
                {editCar.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 rounded-lg border border-gray-300 overflow-hidden group shadow-sm"
                  >
                    <img src={img} alt={`Car ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeEditImage(i)}
                      aria-label={`Remove image ${i + 1}`}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-90 hover:opacity-100 transition"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleEditCarImages}
                className="mb-2"
                aria-label="Upload car images"
              />
              <p className="text-xs text-gray-400">You can upload up to 6 images.</p>
            </div>

            <div className="flex gap-4 justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <Save className="w-5 h-5" /> Save
              </button>
              <button
                type="button"
                onClick={() => setEditCar(null)}
                className="bg-gray-300 px-6 py-3 rounded-lg shadow hover:bg-gray-400 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      );
    }

    return (
      <CarDetailInline
        car={cars[selectedIdx]}
        onBack={backToList}
        onEdit={openEdit}
        onDelete={deleteCar}
      />
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Car Listing</h2>
        <div className="flex gap-4 w-full sm:w-auto flex-wrap sm:flex-nowrap">
          {/* Removed Create Ad button here as per request */}
          <button
            onClick={openAddCar}
            className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-1"
          >
            <PlusCircle className="w-5 h-5" />
            Add Car
          </button>
        </div>
      </div>

      {cars.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">No cars listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cars.map((car, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => openDetail(idx)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openDetail(idx);
              }}
              aria-label={`View details of ${car.make} ${car.model}`}
              role="button"
            >
              <div className="relative w-full h-[220px] bg-white">
                <img
                  src={car.images[0] || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-contain p-6"
                />
                <span className="absolute top-3 right-3 bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded-full shadow">
                  ID: {idx + 1}
                </span>
              </div>
              <div className="p-4 sm:p-6 text-left space-y-2 sm:space-y-3">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 truncate">
                  {car.make} {car.model}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Year: <span className="font-medium">{car.year}</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Mileage: <span className="font-medium">{car.mileage} km</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Condition: <span className="font-medium">{car.condition}</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Status: <span className="font-medium">{car.status}</span>
                </p>
                <p className="text-blue-900 font-extrabold text-lg sm:text-xl">TT${car.price}</p>
                <p className="text-xs sm:text-sm text-gray-700 line-clamp-3">{car.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CarDetailInline: React.FC<{
  car: Car;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ car, onBack, onEdit, onDelete }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [showCreateAdPopup, setShowCreateAdPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const openCreateAdPopup = () => {
    setSelectedPlan(null);
    setShowCreateAdPopup(true);
  };

  const closeCreateAdPopup = () => {
    setShowCreateAdPopup(false);
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleMakePayment = () => {
    if (!selectedPlan) {
      alert("Please select a plan to make payment.");
      return;
    }
    alert(`Payment made for plan: ${selectedPlan}`);
    setShowCreateAdPopup(false);
  };

  return (
    <section className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-blue-600 font-semibold hover:underline transition"
      >
        ← Back to Listings
      </button>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <img
            src={car.images[activeImg] || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt={`Car image ${activeImg + 1}`}
            className="w-full h-[320px] object-contain border border-gray-300 rounded-lg shadow-sm mb-4"
          />
          <div className="flex gap-3 overflow-x-auto">
            {car.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(i)}
                className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer transition ${
                  activeImg === i ? "border-blue-600 shadow-md" : "border-gray-300 hover:border-blue-400"
                }`}
                alt={`Thumbnail ${i + 1}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveImg(i);
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">
              {car.make} {car.model}
            </h2>
            <p className="text-gray-500 text-base md:text-lg mb-4">San Fernando • {car.year}</p>
            <p className="text-blue-700 text-2xl md:text-3xl font-extrabold mb-6">TT${car.price}</p>
            <p className="text-gray-700 whitespace-pre-line mb-6 leading-relaxed">{car.description}</p>

            <div className="grid grid-cols-2 gap-3 md:gap-4 text-gray-700 text-xs sm:text-sm font-medium">
              <p>
                <span className="font-semibold">Engine:</span> {car.engine || "2.0L Petrol"}
              </p>
              <p>
                <span className="font-semibold">Mileage:</span> {car.mileage} km
              </p>
              <p>
                <span className="font-semibold">Drivetrain:</span> {car.drivetrain || "All Wheel Drive (AWD)"}
              </p>
              <p>
                <span className="font-semibold">Year:</span> {car.year}
              </p>
              <p>
                <span className="font-semibold">Condition:</span> {car.condition}
              </p>
              <p>
                <span className="font-semibold">Doors:</span> {car.doors || "5"}
              </p>
              <p>
                <span className="font-semibold">Seats:</span> {car.seats || "5"}
              </p>
              <p>
                <span className="font-semibold">Fuel Type:</span> {car.fuelType || "Petrol"}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {car.status}
              </p>
              <p>
                <span className="font-semibold">Body Type:</span> {car.bodyType || "SUV"}
              </p>
              <p>
                <span className="font-semibold">Color:</span> {car.color || "White"}
              </p>
              <p>
                <span className="font-semibold">VIN:</span> {car.vin || "JTM...3456"}
              </p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex gap-4 flex-wrap">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none text-center"
            >
              <Pencil className="w-5 h-5" />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 flex-1 sm:flex-none text-center"
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
            <button
              onClick={openCreateAdPopup}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 flex-1 sm:flex-none text-center"
            >
              Create Ad
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-yellow-900 bg-yellow-100 p-4 rounded-lg border border-yellow-300 font-medium">
        <strong>Safety Tip:</strong> Meet in a public place, verify documents, and inspect the vehicle before making any payment.
      </div>

      {showCreateAdPopup && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeCreateAdPopup}
            aria-label="Close Create Ad Popup Background"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-ad-title"
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
              <button
                onClick={closeCreateAdPopup}
                aria-label="Close Create Ad Popup"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <XIcon className="w-6 h-6" />
              </button>
              <h3 id="create-ad-title" className="text-2xl font-bold mb-4">
                Select a Plan
              </h3>
              <div className="space-y-4">
                {plans.map((plan) => {
                  const isSelected = selectedPlan === plan.id;
                  return (
                    <label
                      key={plan.id}
                      htmlFor={`plan-${plan.id}`}
                      className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition ${
                        isSelected
                          ? "border-green-600 bg-green-50"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                    >
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{plan.label}</div>
                        <div className="text-sm text-gray-600">{plan.description}</div>
                      </div>
                      <input
                        type="radio"
                        name="plan"
                        id={`plan-${plan.id}`}
                        value={plan.id}
                        checked={isSelected}
                        onChange={() => handlePlanSelect(plan.id)}
                        className="cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>
              <button
                onClick={handleMakePayment}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Make Payment
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CarListing;
