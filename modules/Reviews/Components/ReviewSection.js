"use client";

import React, { useState, useEffect } from 'react';
import { Star, Image as ImageIcon, ChevronRight } from 'lucide-react';
import ReviewStars from './ReviewStars';
import ReviewForm from './ReviewForm';
import { useSelector } from 'react-redux';
import { getImageUrl } from '@/utils/helperFunction';


const theme = {
  primary: '#051f20',
  secondary: '#daac47',
  accent: '#9ed36a',
  bg: '#fcfbf7' // Soft paper-like background for "Craft" feel
};

;


function ReviewDate({ dateString }) {
  const [formattedDate, setFormattedDate] = useState('');
  useEffect(() => {
    if (!dateString) return;

    try {
      const date = new Date(dateString);
      
      if (!isNaN(date.getTime())) {
        setFormattedDate(
          date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        );
      }
    } catch (error) {
      console.error("Date formatting error:", error);
    }
  }, [dateString]);

  return (
    <td className="py-6 pl-4 align-top text-right w-24">
      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
        {formattedDate || <span className="opacity-0" aria-hidden="true">Jan 2000</span>}
      </span>
    </td>
  );
}

const ReviewRow = ({ review }) => {
  const ratingValue = parseInt(review.ratings) || 0;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true)
  },[])


  return (
    <tr className="border-b border-slate-100 group">
      {/* 1. Verified Customer Column */}
      <td className="py-6 pr-4 align-top w-1/4">
        <div className="flex flex-col">
          <span className="font-bold text-[--color-brand-primary] uppercase tracking-widest text-xs mb-1">
            {review.name}
          </span>
         {isMounted && review.approved && <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500" /> 
            Verified Artisan Buyer
          </span>}
        </div>
      </td>

      {/* 2. Content Column */}
      <td className="py-6 px-4 align-top">
        <div className="flex items-center gap-1 mb-3">
          <ReviewStars rating={review.ratings}/>
        </div>
        <p className="text-[#4a4a4a] text-sm leading-relaxed mb-4 italic">
          "{review.message || "Quality product, very satisfied with the craft."}"
        </p>
        
        {/* Craft-Style Media Gallery */}
        {review.media && review.media.length > 0 && (
          <div className="flex gap-3 mt-4">
            {review.media.map((src, idx) => (
              <div key={idx} className="relative group/img overflow-hidden rounded-sm border border-slate-200">
                 <img 
                  src={getImageUrl(src)} 
                  className="w-16 h-16 object-cover grayscale-50 hover:grayscale-0 transition-all duration-500 scale-100 hover:scale-110" 
                  alt="Product context"
                />
              </div>
            ))}
          </div>
        )}
      </td>

      {/* 3. Date Column */}
      {isMounted && <ReviewDate dateString={review.published_date}/>}
    </tr>
  );
};

export default function ReviewSection({reviewsData}) {
  const [reviews, setReviews] = useState([]);
  const [isFormOpen,setIsFormOpen] = useState(false)
  const {currentProduct} = useSelector(state=>state.product)
  console.log(currentProduct);
  
  // Custom Styles Injection
  const inlineStyles = `
    :root {
      --color-brand-primary: #051f20;
      --color-brand-secondary: #daac47;
      --color-brand-accent: #9ed36a;
    }
  `;
  useEffect(()=>{
    if(isFormOpen)
    {
      document.body.style.overflow = "hidden"
    }
    else{
      document.body.style.overflow = "scroll"
      
    }
  },[isFormOpen])

  useEffect(() => {
    const {reviews} = reviewsData
    setReviews(reviews);
  }, []);

  return (
    <section className="bg-brand-primary/10 py-20 px-6 font-sans mt-5">
      <style>{inlineStyles}</style>
      <div className=" mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-brand-primary/10 pb-6 mb-10">
          <div>
            <h2 className="text-2xl  text-brand-primary mb-2 font-bold">The Artisan's Word</h2>
            <p className="text-sm text-slate-500 captalize tracking-widest">Let's see what our buyer's say about this product</p>
          </div>
          <button 
            className="mt-4 md:mt-0 px-6 py-2 bg-brand-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-primary/80 transition-colors"
            onClick={()=>{setIsFormOpen(true)}}
            >
            Share Your Experience
          </button>
        </div>
        {
          isFormOpen &&  <ReviewForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}/>
        }

        {/* Minimalist Table */}
        <div className="px-1">
          <table className="w-full border-collapse ">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-slate-400 border-b border-brand-primary/20">
                <th className="pb-4 font-medium">Patron</th>
                <th className="pb-4 font-medium">Review</th>
                <th className="pb-4 font-medium text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev,index) => (
                <ReviewRow key={index} review={rev} />
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-12 text-center">
            <button className="group flex items-center gap-2 mx-auto text-[--color-brand-primary] font-bold text-sm uppercase tracking-widest">
                Load More Stories 
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </section>
  );
}