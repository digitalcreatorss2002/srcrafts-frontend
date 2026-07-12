"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from '@/utils/debounce';
import { Search, RotateCcw } from 'lucide-react'; // Optional: install lucide-react

export default function FilterSidebar({ currentFilters }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Local states to prevent "stuttering" while typing
  const [localSearch, setLocalSearch] = useState(currentFilters['search[name]'] || '');
  const [localPrice, setLocalPrice] = useState({
    min: currentFilters.min_price || '',
    max: currentFilters.max_price || ''
  });

  // Sync local state if filters change (e.g., on Reset)
  useEffect(() => {
    setLocalSearch(currentFilters['search[name]'] || '');
    setLocalPrice({
      min: currentFilters.min_price || '',
      max: currentFilters.max_price || ''
    });
  }, [currentFilters]);

  // 2. Optimized URL Creator
  const updateUrl = useCallback((updates) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([name, value]) => {
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  // 3. Debounced Handlers
  const debouncedUpdate = useCallback(
    debounce((updates) => updateUrl(updates), 500),
    [updateUrl]
  );

  const handleSearchChange = (val) => {
    setLocalSearch(val);
    debouncedUpdate({ 'search[name]': val });
  };

  const handlePriceChange = (type, val) => {
    setLocalPrice(prev => ({ ...prev, [type]: val }));
    debouncedUpdate({ [`${type}_price`]: val });
  };

  return (
    <aside className="w-full max-w-xs space-y-8 p-6 bg-white rounded-md h-full">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl text-slate-800">Filters</h2>
        <button 
          onClick={() => router.push(pathname)}
          className="text-xs flex items-center gap-1 text-blue-600 hover:underline font-medium"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Search Product Section */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">Search Product</label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            onChange={(e) => handleSearchChange(e.target.value)}
            value={localSearch}
          />
        </div>
      </div>

      {/* Price Range Section */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700 ">Price Range</label>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 text-sm">₹</span>
            <input
              type="number"
              placeholder="Min"
              className="w-full pl-6 pr-2 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
              onChange={(e) => handlePriceChange('min', e.target.value)}
              value={localPrice.min}
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 text-sm">₹</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full pl-6 pr-2 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
              onChange={(e) => handlePriceChange('max', e.target.value)}
              value={localPrice.max}
            />
          </div>
        </div>
      </div>

      {/* Example: Category Section (Highly recommended for sidebars) */}
      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Availability</h3>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            onChange={(e) => updateUrl({ in_stock: e.target.checked ? 'true' : '' })}
          />
          <span className="text-sm text-slate-600 group-hover:text-slate-900">In Stock Only</span>
        </label>
      </div>
    </aside>
  );
}