import SearchForm from "@/components/search-form"
import FilterTabs from "@/components/filter-tabs"

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Main Heading - Edit title here */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Buy & Sell cars in TTRidz</h1>

            {/* Subtitle - Edit description here */}
            <p className="text-xl text-gray-600 mb-8">Browse through hundreds of used and new cars for sale</p>

            {/* Filter Tabs */}
            <FilterTabs />

            {/* Search Form */}
            <SearchForm />
          </div>

          {/* Right Content - Car Image */}
          <div className="relative">
            <img
              src="/car1.jpg?height=400&width=600"
              alt="Toyota RAV4"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
