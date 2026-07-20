"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { debounce } from '@/utils/debounce';
import { Search, RotateCcw, SlidersHorizontal, X, Check, ArrowUpDown, Sparkles, Box } from 'lucide-react';

// --- Constants ---
const MIN_LIMIT = 0;
const MAX_LIMIT = 5000000;
const STEP = 500;

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
  const [localSearch, setLocalSearch] = useState(currentFilters['search[name]'] || currentFilters.search || '');
  const [priceRange, setPriceRange] = useState({
    min: Number(currentFilters.min_price) || MIN_LIMIT,
    max: Number(currentFilters.max_price) || MAX_LIMIT
  });
  const [sortBy, setSortBy] = useState(currentFilters.sort || '');
  const [inStockOnly, setInStockOnly] = useState(currentFilters.in_stock === 'true');
  const [featuredOnly, setFeaturedOnly] = useState(currentFilters.featured === 'true');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Sync state with URL
  useEffect(() => {
    setLocalSearch(currentFilters['search[name]'] || currentFilters.search || '');
    setPriceRange({
      min: Number(currentFilters.min_price) || MIN_LIMIT,
      max: Number(currentFilters.max_price) || MAX_LIMIT
    });
    setSortBy(currentFilters.sort || '');
    setInStockOnly(currentFilters.in_stock === 'true');
    setFeaturedOnly(currentFilters.featured === 'true');
  }, [currentFilters]);

  // 2. URL Strategy
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

  const handleSortChange = (e) => {
    const val = e.target.value;
    setSortBy(val);
    updateUrl({ sort: val });
  };

  const handleInStockToggle = (e) => {
    const checked = e.target.checked;
    setInStockOnly(checked);
    updateUrl({ in_stock: checked ? 'true' : '' });
  };

  const handleFeaturedToggle = (e) => {
    const checked = e.target.checked;
    setFeaturedOnly(checked);
    updateUrl({ featured: checked ? 'true' : '' });
  };

  const handleReset = () => {
    router.push(pathname);
    setIsMobileOpen(false);
  };

  const hasActiveFilters = Boolean(
    localSearch || 
    priceRange.min > MIN_LIMIT || 
    priceRange.max < MAX_LIMIT ||
    sortBy ||
    inStockOnly ||
    featuredOnly
  );

  const filterContent = (
    <div className="p-6 space-y-8 overflow-y-auto flex-1">
      {/* Search Section */}
      <section className="space-y-3">
        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Search size={14} className="text-brand-primary" /> Product Search
        </label>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={16} />
          <input
            type="text"
            placeholder="Search items by name..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:bg-white outline-none transition-all text-sm"
            onChange={(e) => handleSearchChange(e.target.value)}
            value={localSearch}
          />
        </div>
      </section>

      {/* Sort By Section */}
      <section className="space-y-3">
        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <ArrowUpDown size={14} className="text-brand-primary" /> Sort Products
        </label>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer"
        >
          <option value="">Default Sorting</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest Arrivals</option>
          <option value="popular">Popularity</option>
        </select>
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
        
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 gap-2">
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1.5 rounded border border-slate-200">
            <span>Min: ₹</span>
            <input
              type="number"
              min={MIN_LIMIT}
              max={MAX_LIMIT}
              value={priceRange.min}
              onChange={(e) => handleSliderChange(e, 'min')}
              className="w-16 bg-transparent outline-none font-bold text-brand-primary text-xs"
            />
          </div>
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1.5 rounded border border-slate-200">
            <span>Max: ₹</span>
            <input
              type="number"
              min={MIN_LIMIT}
              max={MAX_LIMIT}
              value={priceRange.max}
              onChange={(e) => handleSliderChange(e, 'max')}
              className="w-20 bg-transparent outline-none font-bold text-brand-primary text-xs"
            />
          </div>
        </div>
      </section>

      {/* Availability & Feature Toggles */}
      <section className="space-y-4 pt-4 border-t border-slate-100">
        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Additional Filters</label>
        
        <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/60 rounded-xl cursor-pointer hover:border-brand-primary transition-all">
          <div className="flex items-center gap-2.5">
            <Box size={16} className="text-emerald-600" />
            <span className="text-xs font-bold text-slate-700">In Stock Only</span>
          </div>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={handleInStockToggle}
            className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/60 rounded-xl cursor-pointer hover:border-brand-primary transition-all">
          <div className="flex items-center gap-2.5">
            <Sparkles size={16} className="text-amber-500" />
            <span className="text-xs font-bold text-slate-700">Featured Specials</span>
          </div>
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={handleFeaturedToggle}
            className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
          />
        </label>
      </section>

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
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-brand-primary transition-all text-left"
        >
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal size={18} className="text-brand-primary" />
            <span className="font-bold text-sm text-brand-primary">Filter Products</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
            )}
          </div>
          <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
            {hasActiveFilters ? 'Active' : 'Select'}
          </span>
        </button>

        {/* Mobile Slide-Over Drawer Modal */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-t-3xl max-h-[85vh] flex flex-col w-full shadow-2xl animate-in slide-in-from-bottom duration-300">
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-3xl">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-brand-primary" />
                  <h2 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Filter Products</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleReset}
                    className="text-[11px] px-2.5 py-1 font-bold text-brand-secondary hover:bg-brand-secondary/10 rounded-md transition-all flex items-center gap-1"
                  >
                    <RotateCcw size={12} /> RESET
                  </button>
                  <button 
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Drawer Content */}
              {filterContent}

              {/* Drawer Footer CTA */}
              <div className="p-4 border-t border-slate-100 bg-white">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full py-3.5 bg-brand-primary text-brand-secondary font-black text-sm uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Check size={16} />
                  <span>Apply Filters</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex w-full max-w-[300px] bg-white h-[calc(100vh-4rem)] sticky top-16 border-r border-slate-100 flex-col rounded-xl shadow-xs">
        <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-brand-primary" />
            <h2 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Filters</h2>
          </div>
          <button 
            onClick={handleReset}
            className="text-[11px] px-2 py-1 font-bold text-brand-secondary hover:bg-brand-secondary/10 rounded-md transition-all flex items-center gap-1"
          >
            <RotateCcw size={12} /> RESET
          </button>
        </div>
        {filterContent}
      </aside>
    </>
  );
}