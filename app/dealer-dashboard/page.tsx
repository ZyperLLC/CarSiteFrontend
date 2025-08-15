"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  CarFront,
  BarChart3,
  CreditCard,
  Menu,
  X as XIcon,
} from "lucide-react";
import DealerDashboardPage from "@/app/elite-dealer-dashboard/page";
import PricingPage from "@/app/premium/page";
import CarListing from "@/components/carlistingdashboard";
import DealerAnalytics from "@/components/DealerAnalytics";


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

const LOCAL_STORAGE_KEY = "dealerCars";

export default function DealerDashboard() {
  const [currentPage, setCurrentPage] = useState<string>("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const [subscribed, setSubscribed] = useState<boolean>(false);

  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setCars(parsed);
        }
      } catch {
        setCars([]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cars));
      } catch {
        // ignore errors
      }
    }
  }, [cars]);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Car listing", icon: CarFront },
    { name: "Analytics", icon: BarChart3 },
    { name: "Subscription", icon: CreditCard },
  ];

  const handleSubscribeClick = () => {
    setCurrentPage("Subscription");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Mobile menu toggle */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 bg-white shadow">
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="text-[#0B0F3B] flex items-center gap-2"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          {/* <span className="font-medium">{isSidebarOpen ? "Close" : "Menu"}</span> */}
        </button>
      </div>
      <main className="flex min-h-[calc(100vh-4rem)]">
        <aside
          className={`bg-[#0B0F3B] text-white w-64 flex flex-col justify-between z-30 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed top-[4rem] left-0 h-[calc(100vh-4rem)] md:relative md:translate-x-0 md:top-0 md:h-auto`}
        >
          <nav className="space-y-2 px-2 pt-6">
            {navItems.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => {
                  setCurrentPage(name);
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-6 py-3 flex items-center gap-3 ${
                  currentPage === name ? "bg-indigo-500 rounded-md" : "hover:bg-[#1A1E4C]"
                }`}
                type="button"
              >
                <Icon className="w-5 h-5" />
                {name}
              </button>
            ))}
          </nav>
        </aside>

        <section
          className="flex-1 p-4 md:p-8 overflow-y-auto mt-4 md:mt-0 relative"
          aria-live="polite"
        >
          {/* Background blur if Analytics page not subscribed */}
          {currentPage === "Analytics" && !subscribed && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm"
              style={{ zIndex: 10 }}
            />
          )}

          <div style={{ position: "relative", zIndex: 5 }}>
            {currentPage === "Subscription" ? (
              <PricingPage />
            ) : currentPage === "Dashboard" ? (
              <DealerDashboardPage
                cars={cars}
                setCars={setCars}
                onShowMoreClick={() => setCurrentPage("Car listing")}
              />
            ) : currentPage === "Car listing" ? (
              <CarListing cars={cars} setCars={setCars} />
            ) : currentPage === "Analytics" ? (
              <DealerAnalytics cars={cars} onSubscribeClick={handleSubscribeClick} />
            ) : (
              <div className="text-center text-gray-600 text-xl mt-20">
                {currentPage} page coming soon...
              </div>
            )}
          </div>

          {/* Subscription Popup */}
          {currentPage === "Analytics" && !subscribed && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Subscription Required Popup"
              className="fixed inset-0 flex items-center justify-center z-20 p-6"
            >
              <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full text-center space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Elite Dealer Subscription</h2>
                <p className="text-gray-700">
                  Subscribe now to unlock full access to the Dealer Analytics Dashboard.
                </p>
                <button
                  onClick={handleSubscribeClick}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded"
                >
                  Subscribe & Unlock
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
