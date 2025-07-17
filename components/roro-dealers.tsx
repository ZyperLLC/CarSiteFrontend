import { Button } from "@/components/ui/button"
import { Shield, Star } from "lucide-react"
import Link from "next/link"

export default function RoRoDealers() {
  // DEALER DATA - Replace with your actual dealer information from database
  const dealers = [
    {
      id: 1,
      name: "Premium Auto Imports",
      // DEALER LOGO - Replace with actual high-resolution dealer logo
      logo: "/car1.jpg?height=60&width=120",
      verified: true,
      rating: 4.8,
      totalCars: 45,
      // DEALER DESCRIPTION - Customize for each dealer's specialization
      description: "Specializing in Japanese imports with full inspection reports and warranties",
      cars: [
        {
          name: "Toyota Prius",
          year: 2020,
          price: "$95,000",
          // CAR IMAGE - Replace with actual car photo
          image: "/car2.jpg?height=150&width=200",
        },
        {
          name: "Honda Vezel",
          year: 2019,
          price: "$120,000",
          // CAR IMAGE - Replace with actual car photo
          image: "/car2.jpg?height=150&width=200",
        },
        {
          name: "Nissan Note",
          year: 2021,
          price: "$85,000",
          // CAR IMAGE - Replace with actual car photo
          image: "/car2.jpg?height=150&width=200",
        },
      ],
    },
    {
      id: 2,
      name: "Island Auto Gallery",
      // DEALER LOGO - Replace with actual high-resolution dealer logo
      logo: "/placeholder.svg?height=60&width=120",
      verified: true,
      rating: 4.9,
      totalCars: 32,
      // DEALER DESCRIPTION - Customize for each dealer's specialization
      description: "Trusted RoRo dealer with 15+ years experience",
      cars: [
        {
          name: "Toyota Aqua",
          year: 2018,
          price: "$75,000",
          // CAR IMAGE - Replace with actual car photo
          image: "/car2.jpg?height=150&width=200",
        },
        {
          name: "Honda Fit",
          year: 2020,
          price: "$90,000",
          // CAR IMAGE - Replace with actual car photo
          image: "/car2.jpg?height=150&width=200",
        },
        {
          name: "Suzuki Swift",
          year: 2019,
          price: "$80,000",
          // CAR IMAGE - Replace with actual car photo
          image: "/car2.jpg?height=150&width=200",
        },
      ],
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER - Customize title and description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Imported by Certified RoRo Dealers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Only the most trusted dealers. All vehicles inspected, imported, and certified.
          </p>
        </div>

        {/* DEALERS GRID */}
        <div className="space-y-12">
          {dealers.map((dealer) => (
            <div key={dealer.id} className="bg-gray-50 rounded-lg p-8">
              {/* DEALER HEADER */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  {/* DEALER LOGO - Replace with actual dealer logos */}
                  <img
                    src={dealer.logo || "/placeholder.svg"}
                    alt={`${dealer.name} logo`}
                    className="h-12 w-auto object-contain"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-gray-900">{dealer.name}</h3>
                      {/* VERIFIED BADGE - Customize verification criteria */}
                      {dealer.verified && (
                        <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{dealer.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">{dealer.totalCars} cars available</span>
                    </div>
                  </div>
                </div>

                {/* DEALER ACTION BUTTON - Links to individual dealer page */}
                <Link href={`/dealers/${dealer.id}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">View Dealer Inventory</Button>
                </Link>
              </div>

              {/* DEALER DESCRIPTION */}
              <p className="text-gray-600 mb-6">{dealer.description}</p>

              {/* FEATURED CARS FROM DEALER */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dealer.cars.map((car, index) => (
                  <Link key={index} href={`/car/${dealer.id}-${index + 1}`}>
                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                      {/* CAR IMAGE - Replace with actual car photos */}
                      <img
                        src={car.image || "/placeholder.svg"}
                        alt={car.name}
                        className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900">{car.name}</h4>
                        <p className="text-sm text-gray-600">{car.year}</p>
                        <p className="text-lg font-bold text-blue-600 mt-2">{car.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL DEALERS BUTTON */}
        <div className="text-center mt-12">
          <Link href="/dealers">
            <Button variant="outline" className="px-8 py-3 bg-transparent">
              View All Certified Dealers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
