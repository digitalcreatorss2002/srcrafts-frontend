"use client"
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Section from '@/components/container/genericContainer/Section';

export default function NotFound() {
  return (
    <Section>
      <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="relative">
          <h1 className="text-[12rem] md:text-[15rem] font-black text-slate-100 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Lost in the Craft?
            </h2>
            <p className="text-slate-500 max-w-sm mx-auto">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-3 bg-brand-primary text-white rounded-full font-semibold hover:shadow-lg transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-full font-semibold hover:bg-slate-50 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-400 mb-4">Try searching for products or categories:</p>
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search our catalog..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            />
          </div>
        </div>
      </div>
    </div>
    </Section>
  );
}