// modules/orders/component/OrderListSkeleton.tsx

export default function OrderListSkeleton() {
    // Render 3 skeleton cards to fill the initial viewport
    const skeletonCards = Array.from({ length: 3 });
  
    return (
      <div className="flex flex-col gap-6 w-full animate-pulse">
        {/* Skeleton for the 'Active Count' badge */}
        <div className="h-8 w-24 bg-gray-200 rounded-lg mb-2" />
  
        {skeletonCards.map((_, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Mock Icon/Image */}
              <div className="w-12 h-12 bg-gray-200 rounded-2xl shrink-0" />
              
              <div className="space-y-2 w-full">
                {/* Mock Order ID/Title */}
                <div className="h-4 bg-gray-200 rounded w-32" />
                {/* Mock Date/Subtitle */}
                <div className="h-3 bg-gray-100 rounded w-20" />
              </div>
            </div>
  
            <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
              {/* Mock Price */}
              <div className="h-5 bg-gray-200 rounded w-24" />
              {/* Mock Status Badge */}
              <div className="h-6 bg-gray-100 rounded-full w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }