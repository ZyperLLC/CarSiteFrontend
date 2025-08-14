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
  return (
    <div className="w-full relative overflow-hidden mt-9">
      <motion.div
        className="flex gap-16 pr-16"
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
        initial={{ transform: "translateX(0%)" }}
        animate={{ transform: "translateX(-50%)" }}
      >
        {images.map(({ src, alt }, index) => (
          <Image
            key={index}
            src={src}
            alt={alt}
            width={120}
            height={60}
            className="flex-none w-auto h-8 object-contain"
          />
        ))}
        {images.map(({ src, alt }, index) => (
          <Image
            key={`dup-${index}`}
            src={src}
            alt={alt}
            width={120}
            height={60}
            className="flex-none w-auto h-8 object-contain"
          />
        ))}
      </motion.div>
    </div>
  );
};
