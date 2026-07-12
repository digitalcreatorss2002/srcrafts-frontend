import React from 'react';
import CollectionCard from './CollectionCard';
import { GRID_CONFIGS } from '@/config/constant'

export default function DynamicGrid({ product_collections }) {
  const items = product_collections || [];
  const length = items.length;

  if (length === 0) {
    return (
      <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
        <p className="text-gray-400 font-medium">No collections curated yet.</p>
      </div>
    );
  }

  // Get configuration or fallback to uniform grid if length > 6
  const config = GRID_CONFIGS[length] || { 
    container: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", 
    items: Array(length).fill("h-[300px]") 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={`grid gap-1 md:gap-2 ${config.container}`}>
        {items.map((col, index) => (
          <CollectionCard 
            key={col._id || index} 
            collection={col} 
            gridClasses={config.items[index]} 
          />
        ))}
      </div>
    </div>
  );
}