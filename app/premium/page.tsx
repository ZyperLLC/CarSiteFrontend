"use client";

import React from "react";
import Header from "@/components/header";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();

  const plans = [
    {
      title: "Free",
      price: "$0",
      features: ["List up to 3 cars", "Basic exposure"],
      button: "Try for free",
      onClick: () => router.push("/sell"),
    },
    {
      title: "Pro Dealer",
      price: "$49/mo",
      features: ["Up to 20 listings", "Dealer badge", "Basic dashboard"],
      button: "Get Started",
      onClick: () => router.push("/payment?plan=prodealer"),
    },
    {
      title: "Elite Dealer",
      price: "$99/mo",
      features: [
        "Unlimited listings",
        "Dashboard analytics",
        "Priority support",
      ],
      button: "Contact Sales",
      onClick: () => router.push("/payment?plan=elitedealer"),
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Get started now, pick a plan
        </h1>
        <p className="text-center text-gray-600 max-w-xl mb-10">
          Choose the plan that suits your dealership and start listing cars in
          minutes.
        </p>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 w-full max-w-6xl">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition duration-300"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2 text-center">
                  {plan.title}
                </h2>
                <p className="text-3xl font-semibold text-center mb-4">
                  {plan.price}
                </p>
                <ul className="text-gray-600 list-disc list-inside mb-6 space-y-1 text-center">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={plan.onClick}
                className="w-full py-2 px-4 rounded-xl font-medium border border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition duration-200"
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
