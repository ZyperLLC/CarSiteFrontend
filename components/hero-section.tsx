import SearchForm from "@/components/search-form"
import FilterTabs from "@/components/filter-tabs"

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            {/* Main Heading - Inter ExtraBold */}
            <h1 className="text-4xl lg:text-5xl font-extrabold text-black-900 mb-4 text-center lg:text-left">
              Buy & Sell cars in TTRidz
            </h1>
  
            {/* Subtitle - Inter SemiBold */}
            <p className="text-xl font-semibold text-black-900 mb-8 text-center lg:text-left">
              Browse through hundreds of used and new cars for sale
            </p>

            {/* Car Image for Mobile (Before Filter Options) */}
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
          </div>
  
          {/* Right Content - Car Image (Desktop) */}
          <div className="relative hidden lg:block">
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
