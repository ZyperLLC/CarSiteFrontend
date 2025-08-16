"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();

  const plans = [
    {
      title: "Free",
      price: "$0/mo",
      features: ["Basic Support"],
      numberOfListings: 3,
      button: "Current Plan",
      onClick: () => router.push("/sell?plan=prodealer"),
      isCurrent: true,
    },

    {
      title: "Elite Dealer",
      price: "$49/mo",
      features:  ["Dealer badge", "Basic Support"],
      numberOfListings: 20,
      button: "Subscribe",
      onClick: () => router.push("/payment?plan=elitedealer"),
      isCurrent: false,
    },
      {
      title: "Pro Dealer",
      price: "$99/mo",
      features: ["Dealer badge", "Dashboard analytics", "Priority support", "Basic Support"] ,
      numberOfListings: "Unlimited",
      button: "Subscribe",
      onClick: () => router.push("/payment?plan=prodealer"),
      isCurrent: false,
    },
  ];

  // Table features include "Number of Listings" plus unique other features (excluding listing counts)
  const allFeaturesSet = new Set<string>();
  plans.forEach((plan) => {
    plan.features.forEach((f) => allFeaturesSet.add(f));
  });
  const allFeatures = Array.from(allFeaturesSet);
  const tableFeatures = ["Number of Listings", ...allFeatures];

  const hasFeature = (planFeatures: string[], feature: string) =>
    planFeatures.includes(feature);

  /*
    Carousel logic below applies only on mobile
    We will create a circular 3D rotating carousel.

    Steps:
    - Only show carousel style <2xl breakpoint
    - Use state for active (center) card index
    - Calculate rotation angles per card based on active index
    - Add left/right buttons to rotate cards
    - Accessibility: keyboard and aria-labels
  */

  const [activeIndex, setActiveIndex] = useState(0);
  const total = plans.length;

  // Handlers for carousel
  const rotateLeft = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const rotateRight = () => setActiveIndex((prev) => (prev + 1) % total);

  // Swipe handling (optional)
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const delta = touchEndX.current - touchStartX.current;
    if (delta > 50) rotateLeft();
    else if (delta < -50) rotateRight();
  };

  // Constants for carousel layout
  const radius = 120; // radius of circle in px
  const cardWidth = 260; // width of each card (adjust as needed)
  const cardHeight = 350; // fixed height for cards

  // For 3 cards, angles are 0, 120, 240 degrees offset by activeIndex

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Get started now, pick a plan
        </h1>
        <p className="text-center text-gray-600 max-w-xl mb-10">
          Choose the plan that suits your dealership and start listing cars in
          minutes.
        </p>

        {/* ----------- Mobile Carousel ----------- */}
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label="Pricing plans carousel"
          className="relative w-full max-w-sm sm:max-w-md lg:hidden"
          style={{ perspective: 800 }}
        >
          {/* Rotate Left Button */}
          <button
            onClick={rotateLeft}
            aria-label="Previous plan"
            className="absolute top-1/2 left-0 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            &#8249;
          </button>

          {/* Cards */}
          <div
            className="relative h-[360px] select-none"
            aria-live="polite"
            aria-atomic="true"
          >
            {plans.map((plan, i) => {
              // Calculate rotation angle and translation per card
              // 360 / total = 120 degrees apart
              // Offset by activeIndex * -120 to bring active to front (0deg)
              const angle = ((360 / total) * (i - activeIndex)) % 360;

              // Convert degree to radian
              const rad = (angle * Math.PI) / 180;

              // Calculate X and Z for 3D circular rotation
              const x = radius * Math.sin(rad);
              const z = radius * (1 - Math.cos(rad)); // keep front card closest

              // Adjust opacity and scale for cards behind
              const isActive = i === activeIndex;

              // To maintain equal size visually, we adjust scale slightly and do NOT use translateZ that shrinks behind cards
              // Replace translateZ with translateY to produce subtle vertical stacking
              return (
                <div
                  key={plan.title}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${plan.title} plan`}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  style={{
                    position: "absolute",
                    width: cardWidth,
                    height: cardHeight,
                    left: `calc(50% - ${cardWidth / 2}px)`,
                    top: 0,
                    // Use translateX and translateY instead of translateZ keep size consistent
                    transform: `translateX(${x}px) translateY(${isActive ? 0 : 20}px) scale(${isActive ? 1 : 0.85})`,
                    transition: "transform 0.5s ease, opacity 0.5s ease",
                    opacity: isActive ? 1 : 0.6,
                    zIndex: isActive ? 10 : 5,
                    boxShadow: isActive
                      ? "0 10px 20px rgba(0,0,0,0.3)"
                      : "none",
                    border: isActive
                      ? "4px solid #16a34a"
                      : "1px solid rgb(191 219 254)", // green for active, blue for others
                    borderRadius: "1rem",
                    backgroundColor: "white",
                    padding: "1.5rem",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Current Plan Tag */}
                  {plan.isCurrent && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full select-none">
                      Current Plan
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-center">
                      {plan.title}
                    </h2>
                    <p className="text-3xl font-semibold text-center mb-4">
                      {plan.price}
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-6">
                      <li>
                        <strong>Number of Listings:</strong>{" "}
                        {plan.numberOfListings}
                      </li>
                      {plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  {plan.isCurrent ? (
                    <button
                      disabled
                      className="w-full py-2 px-4 rounded-xl font-medium border border-blue-600 text-blue-600 bg-white cursor-default select-none"
                    >
                      {plan.button}
                    </button>
                  ) : (
                    <button
                      onClick={plan.onClick}
                      className="w-full py-2 px-4 rounded-xl font-medium bg-blue-600 text-white hover:bg-blue-900 transition duration-200"
                    >
                      {plan.button}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Rotate Right Button */}
          <button
            onClick={rotateRight}
            aria-label="Next plan"
            className="absolute top-1/2 right-0 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            &#8250;
          </button>
        </div>

        {/* ----------- Desktop/Tablet Static Layout ----------- */}
        <div className="hidden lg:flex justify-center w-full max-w-6xl gap-6 mb-10">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`
                relative
                bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition duration-300 max-w-sm w-full
                ${plan.isCurrent ? "border-4 border-green-600" : "border border-blue-600"}
              `}
            >
              {/* Current Plan Tag */}
              {plan.isCurrent && (
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full select-none">
                  Current Plan
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold mb-2 text-center">{plan.title}</h2>
                <p className="text-3xl font-semibold text-center mb-4">{plan.price}</p>
                {/* Bullet list of features */}
                <ul className="list-disc list-inside text-gray-700 mb-6">
                  <li>
                    <strong>Number of Listings:</strong> {plan.numberOfListings}
                  </li>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
              {/* Button */}
              {plan.isCurrent ? (
                <button
                  disabled
                  className="w-full py-2 px-4 rounded-xl font-medium border border-blue-600 text-blue-600 bg-white cursor-default select-none"
                >
                  {plan.button}
                </button>
              ) : (
                <button
                  onClick={plan.onClick}
                  className="w-full py-2 px-4 rounded-xl font-medium bg-blue-600 text-white hover:bg-blue-900 transition duration-200"
                >
                  {plan.button}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th
                  className="border border-gray-300 px-4 py-3 bg-gray-100 text-left"
                  scope="col"
                >
                  Features
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.title}
                    className="border border-gray-300 px-6 py-3 bg-blue-50 text-center text-lg font-semibold"
                    scope="col"
                  >
                    {plan.title}
                    <div className="text-xl font-bold mt-1">{plan.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableFeatures.map((feature) => (
                <tr key={feature} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    {feature}
                  </td>
                  {plans.map((plan) => {
                    let cellContent;
                    if (feature === "Number of Listings") {
                      cellContent = plan.numberOfListings;
                    } else {
                      cellContent = hasFeature(plan.features, feature) ? (
                        <span className="text-green-600 font-bold" aria-hidden="true">
                          ✓
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold" aria-hidden="true">
                          ✗
                        </span>
                      );
                    }
                    return (
                      <td
                        key={`${plan.title}-${feature}`}
                        className="border border-gray-300 px-6 py-3 text-center text-xl"
                        aria-label={`${plan.title} ${
                          feature === "Number of Listings"
                            ? `has ${plan.numberOfListings}`
                            : hasFeature(plan.features, feature)
                            ? "includes"
                            : "does not include"
                        } ${feature}`}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
