export default function BrandLogos() {
  // Add/remove brand logos here - Replace with actual logo images
  const brands = [
    { name: "Audi", logo: "/audilogo.jpg?height=60&width=120" },
    { name: "Ford", logo: "/fordlogo.jpg?height=60&width=120" },
    { name: "Hyundai", logo: "/hyundailogo.jpg?height=60&width=120" },
    { name: "Honda", logo: "/hondalogo.jpg?height=60&width=120" },
    { name: "Infiniti", logo: "/infinitilogo.jpg?height=60&width=120" },
    { name: "KIA", logo: "/kialogo.jpg?height=60&width=120" },
    { name: "BMW", logo: "/bmwlogo.jpg?height=60&width=120" },
    { name: "Nissan", logo: "/nissanlogo.jpg?height=60&width=120" },
    { name: "Volvo", logo: "/volvologo.jpg?height=60&width=120" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center"
            >
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={`${brand.name} logo`}
                className="h-12 md:h-13 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
