"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { debounce } from '@/utils/debounce';
import { Search, RotateCcw, SlidersHorizontal, ChevronDown } from 'lucide-react';

// --- Constants ---
const MIN_LIMIT = 500;
const MAX_LIMIT = 5000000;
const STEP = 500;

/**
 * @principle Single Responsibility (SRP)
 * Separate formatting logic from the UI component.
 */
const formatCurrency = (val) => {
  if (val >= 100000) return `${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
  return val;
};

export default function FilterSidebar({ currentFilters }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Local UI States
  const [localSearch, setLocalSearch] = useState(currentFilters['search[name]'] || '');
  const [priceRange, setPriceRange] = useState({
    min: Number(currentFilters.min_price) || MIN_LIMIT,
    max: Number(currentFilters.max_price) || MAX_LIMIT
  });

  // Sync state with URL (Handles external resets/back button)
  useEffect(() => {
    setLocalSearch(currentFilters['search[name]'] || '');
    setPriceRange({
      min: Number(currentFilters.min_price) || MIN_LIMIT,
      max: Number(currentFilters.max_price) || MAX_LIMIT
    });
  }, [currentFilters]);

  // 2. URL Strategy (Dependency Inversion style)
  const updateUrl = useCallback((updates) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([name, value]) => {
      if (value && value !== MIN_LIMIT.toString() && value !== MAX_LIMIT.toString()) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  const debouncedUpdate = useMemo(() => debounce(updateUrl, 400), [updateUrl]);

  // 3. Handlers
  const handleSearchChange = (val) => {
    setLocalSearch(val);
    debouncedUpdate({ 'search[name]': val });
  };

  const handleSliderChange = (e, type) => {
    const value = Number(e.target.value);
    const newRange = { ...priceRange, [type]: value };

    if (type === 'min' && value >= priceRange.max - STEP) return;
    if (type === 'max' && value <= priceRange.min + STEP) return;

    setPriceRange(newRange);
    debouncedUpdate({ min_price: newRange.min, max_price: newRange.max });
  };

  return (
    <aside className="w-full max-w-[300px] bg-white h-screen sticky top-0 border-r border-slate-100 flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-brand-primary" />
          <h2 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Filters</h2>
        </div>
        <button 
          onClick={() => router.push(pathname)}
          className="text-[11px] px-2 py-1 font-bold text-brand-secondary hover:bg-brand-secondary/10 rounded-md transition-all flex items-center gap-1"
        >
          <RotateCcw size={12} /> RESET
        </button>
      </div>

      <div className="p-6 space-y-10 overflow-y-auto">
        {/* Search Section */}
        <section className="space-y-3">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Product Search</label>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search items..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:bg-white outline-none transition-all text-sm"
              onChange={(e) => handleSearchChange(e.target.value)}
              value={localSearch}
            />
          </div>
        </section>

        {/* Price Slider Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Price Range</label>
            <span className="text-[12px] font-bold text-brand-primary py-1 px-2 bg-brand-primary/5 rounded">
              ₹{formatCurrency(priceRange.min)} — ₹{formatCurrency(priceRange.max)}
            </span>
          </div>

          <div className="relative h-6 flex items-center px-2">
            <div className="absolute left-2 right-2 h-1.5 bg-slate-200 rounded-full" />
            <div 
              className="absolute h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_rgba(var(--brand-primary-rgb),0.4)]" 
              style={{ 
                left: `${((priceRange.min - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100}%`, 
                right: `${100 - ((priceRange.max - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100}%` 
              }}
            />

            <input
              type="range"
              min={MIN_LIMIT}
              max={MAX_LIMIT}
              step={STEP}
              value={priceRange.min}
              onChange={(e) => handleSliderChange(e, 'min')}
              className="absolute w-full appearance-none bg-transparent pointer-events-none cursor-pointer z-20 slider-thumb"
            />
            <input
              type="range"
              min={MIN_LIMIT}
              max={MAX_LIMIT}
              step={STEP}
              value={priceRange.max}
              onChange={(e) => handleSliderChange(e, 'max')}
              className="absolute w-full appearance-none bg-transparent pointer-events-none cursor-pointer z-30 slider-thumb"
            />
          </div>
          
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span className="bg-slate-50 px-2 py-1 rounded">
            <input
              type="Number"
              min={MIN_LIMIT}
              max={MAX_LIMIT}
              value={priceRange.min}
              onChange={(e) => handleSliderChange(e, 'min')}
              className="bg-slate-50 px-2 py-1 rounded"
            /></span>
            <span className="border-brand-primary border-1 px-2 py-1 rounded">₹
            <input
              type="Number"
              min={MIN_LIMIT}
              max={MAX_LIMIT}
              value={priceRange.max}
              onChange={(e) => handleSliderChange(e, 'max')}
              className="text-[12px] outline-0"
            /></span>
          </div>
        </section>
      </div>

      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          pointer-events: auto;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #daac47;
          border: 3px solid var(--brand-primary);
          cursor: grab;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .slider-thumb::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.15);
          box-shadow: 0 0 0 8px var(--brand-primary-opacity);
        }
      `}</style>
    </aside>
  );
}