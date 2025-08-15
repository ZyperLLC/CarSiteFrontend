"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function BottomCTA() {
  const router = useRouter()

  const handleClick = () => {
    router.push("/select")
  }

  return (
    <motion.section
      className="bg-blue-600 py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Selling your car has never been easier
          <br />— reach real buyers in minutes
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-blue-100 mb-8">
          List your car for free and get instant exposure to thousands of buyers
        </p>

        {/* CTA Button - Customize button text here */}
        <Button
          onClick={handleClick}
          className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium transition-all duration-300 hover:translate-y-1"
        >
          Post Your Ad
        </Button>
      </div>
    </motion.section>
  )
}
