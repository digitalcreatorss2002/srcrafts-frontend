"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Store, MapPin, ShieldCheck, ArrowRight } from 'lucide-react'; // Modern icons

// Models & Actions
import { vendorProfileSchema } from '@/modules/vendor/model/vendorModel';
import { updateVendorAction } from '@/lib/action'; 

// Components
import { 
  RHFInputWrapper, 
  RHFButton, 
  RHFFileField, 
  RHFTextareaWrapper 
} from '@/components/form/FormWrapper';

export default function VendorOnboardingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverMessage, setServerMessage] = useState(null);

  const vendorId = searchParams.get('id');
  const vendorType = searchParams.get('type') || 'Individual'; 

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(vendorProfileSchema),
    mode: "onTouched", // Validates as the user moves through fields
    defaultValues: {
      store_name: '', store_description: '', store_logo: '',
      supporting_docs: '', address_1: '', address_2: '',
      state: '', pin: '', gst_no: '', gst_certificate: '',
      pan_no: '', pan_file: '', adhaar_no: '',
      adhaar_certificate_front: '', adhaar_certificate_back: '',
    }
  });

  const onSubmit = async (data) => {
    if (!vendorId) {
      setServerMessage({ type: 'error', text: "Session Error: Missing Vendor ID." });
      return;
    }
    setServerMessage(null);
    
    // Formatting payload for Modular Backend
    const payload = {
      vendor: {
        vendor_type: vendorType,
        store_name: data.store_name,
        store_description: `<p>${data.store_description}</p>`,
        store_logo: data.store_logo,
        supporting_docs: data.supporting_docs, 
        gst_no: data.gst_no,
        gst_certificate: data.gst_certificate,
        pan_no: data.pan_no,
        pan: data.pan_file,
        adhaar_no: data.adhaar_no,
        adhaar_certificate_front: data.adhaar_certificate_front,
        adhaar_certificate_back: data.adhaar_certificate_back,
        pickup_address: [{
          address_1: data.address_1,
          address_2: data.address_2,
          state: data.state,
          pin: data.pin,
          add_to_shiprocket: false 
        }]
      }
    };

    try {
      const result = await updateVendorAction(vendorId, payload);
      if (result && !result.error && result?.name !== "ApiError") {
        setServerMessage({ type: 'success', text: "Profile verified! Taking you to your dashboard..." });
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setServerMessage({ type: 'warning', text: result?.data?.message || "Please fix the highlighted errors." });
      }
    } catch (error) {
      setServerMessage({ type: 'error', text: "Connection failed. Please check your internet." });
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-12 px-4">
      {/* --- HEADER SECTION --- */}
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="h-16 w-16 bg-brand-secondary/10 text-brand-secondary rounded-full flex items-center justify-center mb-4 shadow-sm">
          <Store size={32} />
        </div>
        <h2 className="text-4xl font-extrabold text-brand-primary tracking-tight">Complete Your Profile</h2>
        <p className="text-brand-primary/60 mt-2 max-w-md">
          Fill in your business details to start selling as an 
          <span className="ml-1 px-2 py-0.5 bg-brand-secondary/10 text-brand-secondary font-bold rounded-full text-sm border border-rose-100">
            {vendorType}
          </span>
        </p>
      </div>

      {serverMessage && (
        <div className={`max-w-4xl mx-auto mb-8 p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          serverMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}>
          <div className={`h-2 w-2 rounded-full shrink-0 ${serverMessage.type === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <p className="text-sm font-semibold">{serverMessage.text}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        
        {/* --- SECTION 1: BUSINESS IDENTITY --- */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-brand-primary text-white rounded-lg"><Store size={20}/></div>
            <h3 className="text-xl font-bold text-brand-primary/90">Store Identity</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <RHFInputWrapper name="store_name" label="Store Name" register={register} errors={errors} placeholder="Brand Name" />
              <RHFTextareaWrapper name="store_description" label="Brand Story" register={register} errors={errors} placeholder="Tell customers about your craftsmanship..." />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <RHFFileField name="store_logo" label="Logo" setValue={setValue} watch={watch} errors={errors} />
              <RHFFileField 
                name="supporting_docs" 
                label={vendorType === 'Company' ? "Company Registration" : "Artisan Card"} 
                setValue={setValue} watch={watch} errors={errors} 
              />
            </div>
          </div>
        </section>

        {/* --- SECTION 2: LOGISTICS --- */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-brand-primary text-white rounded-lg"><MapPin size={20}/></div>
            <h3 className="text-xl font-bold text-brand-primary/90">Pickup Address</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2"><RHFInputWrapper name="address_1" label="Street Address" register={register} errors={errors} /></div>
            <RHFInputWrapper name="address_2" label="Apartment/Suite (Optional)" register={register} errors={errors} />
            <div className="grid grid-cols-2 gap-4">
               <RHFInputWrapper name="state" label="State" register={register} errors={errors} />
               <RHFInputWrapper name="pin" label="Pincode" type="number" register={register} errors={errors} />
            </div>
          </div>
        </section>

        {/* --- SECTION 3: COMPLIANCE --- */}
        <section className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-inner">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-brand-primary text-white rounded-lg"><ShieldCheck size={20}/></div>
            <h3 className="text-xl font-bold text-brand-primary/90">Legal Verification</h3>
          </div>

          <div className="space-y-8">
            {/* Aadhaar Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end bg-white p-6 rounded-xl border border-slate-200">
              <div className="lg:col-span-1"><RHFInputWrapper name="adhaar_no" label="Aadhaar Number" type="number" register={register} errors={errors} /></div>
              <RHFFileField name="adhaar_certificate_front" label="Aadhaar Front" setValue={setValue} watch={watch} errors={errors} />
              <RHFFileField name="adhaar_certificate_back" label="Aadhaar Back" setValue={setValue} watch={watch} errors={errors} />
            </div>

            {/* PAN & GST Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
                <RHFInputWrapper name="pan_no" label="PAN Card Number" register={register} errors={errors} />
                <RHFFileField name="pan_file" label="Upload PAN Image" setValue={setValue} watch={watch} errors={errors} />
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
                <RHFInputWrapper name="gst_no" label="GSTIN (Optional)" register={register} errors={errors} />
                <RHFFileField name="gst_certificate" label="GST Certificate" setValue={setValue} watch={watch} errors={errors} />
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER ACTION --- */}
        <div className="flex flex-col items-center gap-4">
          <RHFButton 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full md:w-auto md:px-20 h-16 bg-brand-primary hover:bg-black text-white rounded-full text-lg font-bold shadow-xl transition-all active:scale-95 disabled:opacity-70"
          >
            {isSubmitting ? "Processing Details..." : (
              <span className="flex items-center gap-2">Verify & Create Account <ArrowRight size={20}/></span>
            )}
          </RHFButton>
          <p className="text-xs text-slate-400">By continuing, you agree to the Vendor Terms of Service.</p>
        </div>
      </form>
    </div>
  );
}