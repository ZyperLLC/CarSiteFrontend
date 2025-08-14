"use client"

import { motion } from "framer-motion"
import SearchForm from "@/components/search-form"
import FilterTabs from "@/components/filter-tabs"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Main Heading */}
            <h1 className="whitespace-nowrap text-5xl mb-4 text-center lg:text-left text-[#0A131F] font-inter not-italic font-extrabold leading-[70px] tracking-[-2.56px]">
              Buy & Sell cars on TTRidz
            </h1>

            {/* Subtitle */}
            <p className="whitespace-nowrap mb-8 text-center lg:text-left text-[#0A131F] font-inter text-2xl not-italic font-semibold leading-[28px] tracking-[-0.48px]">
              Browse through hundreds of used and new cars for sale
            </p>

            {/* Car Image for Mobile */}
            <div className="relative block lg:hidden mb-8">
              <img
                src="/car1.jpg?height=400&width=600"
                alt="Toyota RAV4"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Filter Tabs */}
            <FilterTabs />

            {/* Search Form */}
            <SearchForm />
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
              <Image
              src="/car1.jpg?height=400&width=600"
              alt="Toyota RAV4"
              width={600}
              height={400}
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
