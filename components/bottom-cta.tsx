import { Button } from "@/components/ui/button"

export default function BottomCTA() {
  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading - Edit CTA title here */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Selling your car has never been easier
          <br />— reach real buyers in minutes
        </h2>

        {/* Subtitle - Edit CTA description here */}
        <p className="text-xl text-blue-100 mb-8">
          List your car for free and get instant exposure to thousands of buyers
        </p>

        {/* CTA Button - Customize button text here */}
        <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium">Post Your Ad</Button>
      </div>
    </section>
  )
}
