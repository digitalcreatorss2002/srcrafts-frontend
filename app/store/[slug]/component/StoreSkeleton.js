export default function StoreSkeleton() {
    return (
      <div className="max-w-7xl mx-auto space-y-10 animate-pulse">
        
        {/* 1. Header Skeleton */}
        <header className="flex flex-col md:flex-row items-center gap-8 border-b pb-10">
          {/* Logo Circle/Square */}
          <div className="w-40 h-40 bg-gray-200 rounded-2xl shadow-sm" />
          
          {/* Text Content */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="h-10 bg-gray-200 rounded-md w-3/4 mx-auto md:mx-0" />
            <div className="h-6 bg-gray-200 rounded-md w-1/2 mx-auto md:mx-0" />
            
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
              <div className="h-8 w-32 bg-gray-100 rounded-full" />
              <div className="h-8 w-32 bg-gray-100 rounded-full" />
            </div>
          </div>
        </header>
  
        {/* 2. Description Skeleton */}
        <section className="bg-gray-50 p-6 rounded-xl space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </section>
  
        {/* 3. Product Grid Skeleton */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-48" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
          
          {/* Grid of 8 Product Cards (Matching our limit: 8) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border rounded-xl p-4 space-y-4">
                {/* Product Image */}
                <div className="aspect-square bg-gray-200 rounded-lg w-full" />
                {/* Product Title */}
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                {/* Product Price */}
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                {/* Button */}
                <div className="h-10 bg-gray-100 rounded-lg w-full" />
              </div>
            ))}
          </div>
        </section>
        
      </div>
    );
  }