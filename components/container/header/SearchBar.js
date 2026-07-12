'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@/lib/hooks/useDebounce';
import axios from 'axios';
import Link from 'next/link';

const SearchBar = ({ isMobile }) => {
  const [isOpen, setIsOpen] = useState(isMobile);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isFetching } = useQuery({
    queryKey: ['globalSearch', debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) return null;
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/api/search?q=${debouncedSearch}`);
      return data;
    },
    enabled: debouncedSearch.length > 2,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(isMobile ? true : false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isMobile]);

  return (
    /* HIDE SEARCH BAR BELOW 768px (md:flex) */
    <div 
      ref={searchRef}
      className={`relative transition-all duration-500 ease-in-out hidden md:flex items-center ${
        isOpen ? 'w-full md:max-w-md lg:max-w-xl' : 'w-10'
      }`}
    >
      <div className="relative w-full flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for crafts..."
          className={`w-full py-2 pl-4 pr-10 rounded-full text-gray-900 bg-white border focus:ring-2 focus:ring-brand-primary outline-none transition-all duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
        
        {isFetching && isOpen && (
          <Loader2 className="absolute right-12 animate-spin text-gray-400" size={18} />
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute p-2 rounded-full transition-all duration-300 ${
            isOpen ? 'right-2 text-gray-400 hover:text-brand-primary' : 'right-0 text-white hover:bg-white/10'
          }`}
        >
          {isOpen ? <X size={20} /> : <Search size={24} />}
        </button>
      </div>

      {/* RESULT DROPDOWN */}
      {isOpen && searchTerm.length > 2 && data && (
        <div className="absolute top-full left-0 w-full bg-white mt-2 shadow-2xl rounded-xl border border-gray-100 max-h-[70vh] z-50 overflow-visible">
          <div className="p-4 overflow-y-auto max-h-[70vh]">
            
            {/* Categories & Collections with Hover Sub-menu */}
            <div className="grid grid-cols-1 gap-4">
              {['categories', 'collections'].map((bucketKey) => (
                data.data?.[bucketKey]?.length > 0 && (
                  <div key={bucketKey}>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{bucketKey}</h3>
                    {data.data[bucketKey].map((item) => (
                      <div key={item._id} className="relative group">
                        <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                          <Link href={`/${bucketKey === 'categories' ? 'category' : 'collection'}/${item.slug}`} className="flex-1 font-medium text-gray-700">
                            {item.name}
                          </Link>
                          <ChevronRight size={16} className="text-gray-400" />
                        </div>

                        {/* SUB-DROPDOWN ON HOVER */}
                        <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute left-full top-0 ml-2 w-64 bg-white border border-gray-100 shadow-2xl rounded-xl p-3 transition-all duration-200 z-[60]">
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Products in {item.name}</p>
                          <div className="space-y-2">
                            {item.products?.map((prod) => (
                              <Link key={prod._id} href={`/product/${prod.slug}`} className="flex items-center gap-2 p-1 hover:bg-brand-primary/5 rounded">
                                <img src={prod.media?.[0]} className="w-8 h-8 rounded object-cover" alt="" />
                                <div className="overflow-hidden">
                                  <p className="text-xs font-medium text-gray-800 truncate">{prod.name}</p>
                                  <p className="text-[10px] text-brand-primary font-bold">₹{prod.sale_price}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ))}

              {/* Individual Global Hits */}
              {data.data?.products?.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Standalone Hits</h3>
                  {data.data.products.map(product => (
                    <Link key={product._id} href={`/product/${product.slug}`} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                      <img src={product.media[0]} alt="" className="w-10 h-10 rounded object-cover" />
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;