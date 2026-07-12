
import Link from 'next/link';
import { Search } from 'lucide-react';
import {fetchPopularSearches} from '@/lib/action.js'

export default async function PopularSearches({ items=[] }) {

  
  // const data = await fetchPopularSearches();
  // console.log(data);
  if (!items || items.length === 0) return null;
  console.log(items);       
  return (
    <div className="bg-brand-primary border-t border-white/5">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-brand-secondary/10 rounded-lg">
            <Search className="w-4 h-4 text-brand-secondary" />
          </div>
          <h2 className="text-xs font-black text-brand-secondary uppercase tracking-[0.2em]">
            Trending Discoveries
          </h2>
        </div>

        {/* Tag Container */}
        <div className="flex flex-wrap gap-2 md:gap-3 items-center">
          {items.map((item, index) => {
            const content = (
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] md:text-xs font-bold text-white/80 hover:text-brand-secondary hover:border-brand-secondary/50 hover:bg-brand-secondary/5 transition-all duration-300 cursor-pointer whitespace-nowrap uppercase tracking-wider">
                {item.label}
              </span>
            );

            return (
              <div key={item.id || index} className="animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                {item.url ? (
                  <Link href={item.url} className="no-underline">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}