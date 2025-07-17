import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Car, Shield, Users, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About TTRidz</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trinidad & Tobago's most trusted platform for buying and selling cars. We make car trading simple, safe, and
            reliable for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Thousands of Cars</h3>
            <p className="text-gray-600">
              Browse through hundreds of verified listings from trusted sellers across Trinidad & Tobago.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Safe & Secure</h3>
            <p className="text-gray-600">
              All listings are verified and we provide safety tips to ensure secure transactions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Trusted Community</h3>
            <p className="text-gray-600">
              Join thousands of satisfied buyers and sellers who trust TTRidz for their car needs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Quick & Easy</h3>
            <p className="text-gray-600">
              List your car in minutes or find your dream car with our powerful search filters.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white p-8 rounded-lg shadow-sm border mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How TTRidz Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse or List</h3>
              <p className="text-gray-600">Search through thousands of cars or list your own vehicle for free</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect</h3>
              <p className="text-gray-600">
                Contact sellers directly through WhatsApp or phone for quick communication
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Deal Safely</h3>
              <p className="text-gray-600">
                Meet in person, inspect the vehicle, and complete your transaction securely
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you with any questions about buying or selling cars on TTRidz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-green-600 hover:bg-green-700 text-white">WhatsApp Support</Button>
            <Button variant="outline">Email Support</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
