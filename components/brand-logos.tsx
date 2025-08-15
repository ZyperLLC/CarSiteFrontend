"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const images = [
  { src: "/audilogo.jpg?height=60&width=120", alt: "Audi Logo" },
  { src: "/fordlogo.jpg?height=60&width=120", alt: "Ford Logo" },
  { src: "/hyundailogo.jpg?height=60&width=120", alt: "Hyundai Logo" },
  { src: "/hondalogo.jpg?height=60&width=120", alt: "Honda Logo" },
  { src: "/infinitilogo.jpg?height=60&width=120", alt: "Infiniti Logo" },
  { src: "/kialogo.jpg?height=60&width=120", alt: "KIA Logo" },
  { src: "/bmwlogo.jpg?height=60&width=120", alt: "BMW Logo" },
  { src: "/nissanlogo.jpg?height=60&width=120", alt: "Nissan Logo" },
  { src: "/volvologo.jpg?height=60&width=120", alt: "Volvo Logo" },
];

export const BrandLogos = () => {
  // Double the list so scrolling is seamless
  const scrollingImages = [...images, ...images];

  return (
    <div className="w-full relative overflow-hidden mt-9 py-12 bg-white">
      <motion.div
        className="flex gap-16 pr-16"
        transition={{
          duration: 20, // slower to show all logos before loop
          ease: "linear",
          repeat: Infinity,
        }}
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }} // scroll full width
      >
        {scrollingImages.map(({ src, alt }, index) => (
          <Image
            key={index}
            src={src}
            alt={alt}
            width={90}
            height={90}
            className="flex-none w-[90px] h-[90px] object-contain"
          />
        ))}
      </motion.div>
    </div>
  );
};
