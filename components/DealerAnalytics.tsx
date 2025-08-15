"use client";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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
};

type DealerAnalyticsProps = {
  cars: Car[];
  onSubscribeClick: () => void; // Added prop for redirect callback
};

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#FBBF24",
  "#EF4444",
  "#8B5CF6",
  "#3B82F6",
  "#D97706",
];

const formatPrice = (priceStr: string): number => {
  return Number(priceStr.replace(/[^0-9.-]+/g, "")) || 0;
};

const formatMileage = (mileageStr: string): number => {
  return Number(mileageStr.replace(/[^0-9.-]+/g, "")) || 0;
};

const formatYear = (yearStr: string): number => {
  return Number(yearStr) || 0;
};

const DealerAnalytics: React.FC<DealerAnalyticsProps> = ({ cars, onSubscribeClick }) => {
  const totalCars = cars.length;

  // Average Price calculation
  const totalPriceSum = cars.reduce((acc, car) => acc + formatPrice(car.price), 0);
  const avgPrice = totalCars ? totalPriceSum / totalCars : 0;

  // Average Mileage calculation
  const totalMileageSum = cars.reduce((acc, car) => acc + formatMileage(car.mileage), 0);
  const avgMileage = totalCars ? totalMileageSum / totalCars : 0;

  // Average Year calculation
  const totalYearSum = cars.reduce((acc, car) => acc + formatYear(car.year), 0);
  const avgYear = totalCars ? totalYearSum / totalCars : 0;

  // Aggregate car count by make
  const carsByMake = cars.reduce<Record<string, number>>((acc, car) => {
    acc[car.make] = (acc[car.make] || 0) + 1;
    return acc;
  }, {});

  const barChartData = Object.entries(carsByMake).map(([make, count]) => ({
    make,
    count,
  }));

  // Aggregate car count by condition
  const carsByCondition = cars.reduce<Record<string, number>>((acc, car) => {
    acc[car.condition] = (acc[car.condition] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(carsByCondition).map(([condition, count]) => ({
    name: condition,
    value: count,
  }));

  // Aggregate total price by make
  const priceByMake = cars.reduce<Record<string, number>>((acc, car) => {
    const priceNum = formatPrice(car.price);
    acc[car.make] = (acc[car.make] || 0) + priceNum;
    return acc;
  }, {});

  const priceChartData = Object.entries(priceByMake).map(([make, total]) => ({
    make,
    total,
  }));

  // Aggregate car count by status (e.g., Active, Sold)
  const carsByStatus = cars.reduce<Record<string, number>>((acc, car) => {
    acc[car.status] = (acc[car.status] || 0) + 1;
    return acc;
  }, {});

  const statusChartData = Object.entries(carsByStatus).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  // Total Mileage by Make (new bar chart)
  const mileageByMake = cars.reduce<Record<string, number>>((acc, car) => {
    const mileageNum = formatMileage(car.mileage);
    acc[car.make] = (acc[car.make] || 0) + mileageNum;
    return acc;
  }, {});

  const mileageChartData = Object.entries(mileageByMake).map(([make, totalMileage]) => ({
    make,
    totalMileage,
  }));

  // Count of cars by model
  const carsByModel = cars.reduce<Record<string, number>>((acc, car) => {
    const modelKey = `${car.make} ${car.model}`;
    acc[modelKey] = (acc[modelKey] || 0) + 1;
    return acc;
  }, {});

  const modelChartData = Object.entries(carsByModel).map(([model, count]) => ({
    model,
    count,
  }));

  // Average price by condition
  const priceSumByCondition = cars.reduce<Record<string, { total: number; count: number }>>(
    (acc, car) => {
      const priceNum = formatPrice(car.price);
      if (!acc[car.condition]) acc[car.condition] = { total: 0, count: 0 };
      acc[car.condition].total += priceNum;
      acc[car.condition].count += 1;
      return acc;
    },
    {}
  );

  const avgPriceByConditionData = Object.entries(priceSumByCondition).map(
    ([condition, { total, count }]) => ({
      condition,
      avgPrice: count ? total / count : 0,
    })
  );

  // Sold Cars Details
  const soldCars = cars.filter((car) => car.status.toLowerCase() === "sold");

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Subscription Button - Always show until user subscribes */}
      <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-50 p-6">
        <div className="bg-white rounded-lg shadow-lg p-10 max-w-md mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Elite Dealer Subscription</h2>
          <p className="text-gray-700">
            Subscribe now to unlock full access to the Dealer Analytics Dashboard.
          </p>
          <button
            onClick={onSubscribeClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded"
          >
            Subscribe & Unlock
          </button>
        </div>
      </div>

      {/* Blur Wrapper */}
      <div
        style={{
          filter: "blur(10px)", // always blurred until subscription acknowledged in parent
          pointerEvents: "none",
          userSelect: "none",
          transition: "filter 0.3s ease",
        }}
      >
        <div className="p-6 md:p-10 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Dealer Analytics Dashboard</h2>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
            <div className="bg-indigo-600 text-white rounded-lg p-5 shadow flex flex-col items-center">
              <span className="text-4xl font-extrabold">{totalCars}</span>
              <span className="mt-1 font-medium uppercase tracking-wide">Total Cars</span>
            </div>
            <div className="bg-green-600 text-white rounded-lg p-5 shadow flex flex-col items-center">
              <span className="text-3xl font-extrabold">
                ${avgPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className="mt-1 font-medium uppercase tracking-wide">Avg. Price</span>
            </div>
            <div className="bg-yellow-500 text-white rounded-lg p-5 shadow flex flex-col items-center">
              <span className="text-3xl font-extrabold">
                {avgMileage.toLocaleString(undefined, { maximumFractionDigits: 0 })} km
              </span>
              <span className="mt-1 font-medium uppercase tracking-wide">Avg. Mileage</span>
            </div>
            <div className="bg-purple-600 text-white rounded-lg p-5 shadow flex flex-col items-center">
              <span className="text-3xl font-extrabold">
                {avgYear.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className="mt-1 font-medium uppercase tracking-wide">Avg. Year</span>
            </div>
            <div className="bg-pink-600 text-white rounded-lg p-5 shadow flex flex-col items-center">
              <span className="text-3xl font-extrabold">{Object.keys(carsByStatus).length}</span>
              <span className="mt-1 font-medium uppercase tracking-wide">Status Types</span>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mb-10">
            {/* Number of Cars by Make */}
            <section className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Number of Cars by Make</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="make" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="count" fill="#4F46E5" barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </section>

            {/* Total Mileage by Make */}
            <section className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Total Mileage by Make</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mileageChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="make" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `${value.toLocaleString()} km`} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="totalMileage" fill="#10B981" barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </section>

            {/* Average Price by Condition */}
            <section className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Average Price by Condition</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={avgPriceByConditionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="condition" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) =>
                      `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                    }
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="avgPrice" fill="#FBBF24" barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </section>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mb-10">
            {/* Car Condition Distribution */}
            <section className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Car Condition Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    isAnimationActive={true}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </section>

            {/* Total Price by Make */}
            <section className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Total Price by Make</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priceChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="make" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="total" fill="#FBBF24" barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </section>

            {/* Number of Cars by Model */}
            <section className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Number of Cars by Model</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={modelChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis
                    dataKey="model"
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="count" fill="#8B5CF6" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </section>
          </div>

          {/* Status Distribution */}
          <section className="mt-10 bg-gray-50 p-6 rounded-lg shadow max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
              Car Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={statusChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#82ca9d"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  isAnimationActive={true}
                >
                  {statusChartData.map((entry, index) => (
                    <Cell
                      key={`status-cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </section>

          {/* Sold Cars Details */}
          <section className="mt-16 max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Sold Cars Details
            </h3>
            {soldCars.length === 0 ? (
              <p className="text-center text-gray-600">No sold cars to display.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Make
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Model
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mileage
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Condition
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {soldCars.map((car, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {car.images && car.images.length > 0 ? (
                            <img
                              src={car.images[0]}
                              alt={`${car.make} ${car.model}`}
                              className="h-16 w-24 object-cover rounded-md"
                            />
                          ) : (
                            <div className="h-16 w-24 bg-gray-300 flex items-center justify-center rounded-md">
                              <span className="text-gray-500 text-sm">No Image</span>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">{car.make}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{car.model}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{car.year}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{car.mileage}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{car.condition}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{car.price}</td>
                        <td
                          className="px-4 py-3 whitespace-nowrap max-w-xs truncate"
                          title={car.description}
                        >
                          {car.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DealerAnalytics;
