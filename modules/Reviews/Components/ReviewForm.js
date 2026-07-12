"use client";
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, X } from 'lucide-react';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

// Your Modular RHF Components
import { 
  RHFInputWrapper, 
  RHFTextareaWrapper, 
  RHFOptionSelect, 
  RHFFileField,      // For Video
  RHFMultiFileField, // NEW: For Multiple Images
  RHFButton 
} from '@/components/form/FormWrapper';

import { createReviewRequest, resetReviewStatus } from '../reviewSlice';
import InfinityLoader from '@/components/InfinityLoader';

// 1. Zod Schema updated for Multiple Images
const reviewSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal('')),
  product: z.string().min(1, "Product ID missing"),
  ratings: z.string().min(1, "Please select a rating"),
  message: z.string().min(10, "Review must be at least 10 characters"),
  images: z.array(z.string()).default([]), // Supports array of strings
  video: z.string().optional().or(z.literal('')),
});

export default function ReviewForm({ isFormOpen, setIsFormOpen }) {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { loading, success, error } = useSelector((state) => state.review);
  const { currentProduct } = useSelector(state => state.product);
  const { user } = useSelector(state => state.user);
  

  // Auth Guard Logic
  // useEffect(() => {
  //   if (isFormOpen && !user) {
  //     router.push(`/user/login?redirect=product/${currentProduct?.slug}`);
  //     setIsFormOpen(false);
  //   }
  // }, [isFormOpen, user, router, setIsFormOpen, currentProduct]);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { 
      product: currentProduct?._id, 
      name: user?.name || '', 
      email: user?.email || '',
      images: [] 
    }
  });

  useEffect(() => {
    if (success) {
      reset();
      setIsFormOpen(false);
      dispatch(resetReviewStatus());
    }
  }, [success, reset, setIsFormOpen, dispatch]);

  if (!isFormOpen) return null;

  return (
    <div className='fixed inset-0 z-1000 flex items-center justify-center p-4 animate-in fade-in duration-300'>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsFormOpen(false)} />

      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 md:p-10 z-1001">
        <button className='absolute top-5 right-5 p-2 hover:bg-slate-100 rounded-full transition-colors' onClick={() => setIsFormOpen(false)}>
          <X className="w-6 h-6 text-slate-500" />
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-brand-primary">Share Your Experience</h2>
          <p className="text-slate-500 mt-2">Upload photos and videos to show the real product.</p>
        </div>

        <form onSubmit={handleSubmit(
          (data) => dispatch(createReviewRequest(data)),
          (errors) => console.error(" ZOD VALIDATION ERRORS:", errors)
          )} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RHFInputWrapper label="Display Name" name="name" register={register} errors={errors} />
            <RHFOptionSelect 
              label="Rating Score" 
              name="ratings" 
              register={register} 
              errors={errors} 
              options={[
                { value: '', label: 'Choose a rating' },
                { value: '5', label: '⭐⭐⭐⭐⭐ (Excellent)' },
                { value: '4', label: '⭐⭐⭐⭐ (Good)' },
                { value: '3', label: '⭐⭐⭐ (Average)' },
                { value: '2', label: '⭐⭐ (Poor)' },
                { value: '1', label: '⭐ (Terrible)' },
              ]}
            />
          </div>

          <RHFTextareaWrapper label="Your Review" name="message" register={register} errors={errors} rows={4} />

          {/* Media Section */}
          <div className="space-y-6 p-5 bg-slate-50 rounded-2xl border border-slate-200">
            {/* Multi Image Component */}
            <RHFMultiFileField 
              label="Product Photos (Multiple)" 
              name="images" 
              setValue={setValue} 
              watch={watch} 
              errors={errors} 
            />
            
            {/* <hr className="border-slate-200" /> */}

            {/* Single Video Component */}
            {/* <RHFFileField 
              label="Unboxing Video (Single)" 
              name="video" 
              setValue={setValue} 
              watch={watch} 
              errors={errors} 
            /> */}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm font-medium">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <div className="pt-4">
            <RHFButton type="submit" disabled={loading}>
              {loading ? <InfinityLoader /> : 'Post Review'}
            </RHFButton>
          </div>
        </form>
      </div>
    </div>
  );
}