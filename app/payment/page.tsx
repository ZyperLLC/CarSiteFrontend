"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan"); // "prodealer" or "elitedealer"
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handleRedirect = (url: string) => {
    window.open(url, "_blank");
    setSelectedPayment(url);
  };

  const handleContinue = () => {
    if (!selectedPayment) {
      alert("Please select a payment method before continuing.");
      return;
    }

    if (plan === "elitedealer") {
      router.push("/elitedealer");
    } else {
      // Default to prodealer if no or unknown plan
      router.push("/prodealer");
    }
  };

  return (
    <div>

      <div className="max-w-2xl mx-auto mt-8 px-4">
        <h2 className="text-2xl font-semibold mb-6">How would you like to pay?</h2>

        <div className="space-y-4">
          {/* Ton Crypto */}
          <label className="flex items-center space-x-3 border p-4 rounded cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              onClick={() => handleRedirect("https://ton.org/")}
              className="w-5 h-5"
            />
            <span className="text-lg">Ton Crypto</span>
          </label>

          {/* Bitcoin */}
          <label className="flex items-center space-x-3 border p-4 rounded cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              onClick={() => handleRedirect("https://bitcoin.org/en/")}
              className="w-5 h-5"
            />
            <span className="text-lg">Bitcoin (BTC)</span>
          </label>

          {/* Ethereum */}
          <label className="flex items-center space-x-3 border p-4 rounded cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              onClick={() => handleRedirect("https://ethereum.org/en/")}
              className="w-5 h-5"
            />
            <span className="text-lg">Ethereum (ETH)</span>
          </label>

          {/* Tether USDT */}
          <label className="flex items-center space-x-3 border p-4 rounded cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              onClick={() => handleRedirect("https://tether.to/")}
              className="w-5 h-5"
            />
            <span className="text-lg">Tether (USDT)</span>
          </label>
        </div>

        <Button
          onClick={handleContinue}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
