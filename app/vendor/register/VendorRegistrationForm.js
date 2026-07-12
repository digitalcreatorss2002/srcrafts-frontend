"use client";

import React, { useState } from 'react';
// RHF and Zod imports
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; 
import { z } from 'zod'; 
import { vendorSchema } from '@/modules/vendor/model/vendorModel';
// Action and Wrapper imports
import { registerVendorAction } from '@/lib/action'; 
import { RHFInputWrapper, RHFCheckboxWrapper, RHFOptionSelect, RHFButton, RHFOtpInput, RHFOtpInputWrapper } from '@/components/form/FormWrapper';
//Router to redirect
import { useVerification } from '@/app/hooks/useVerification';
import { sendEmailOtp, verifyEmailOtp, sendPhoneOtp, verifyPhoneOtp } from '@/lib/action';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// --- VENDOR TYPE OPTIONS ---
const VENDOR_TYPE_OPTIONS = [
  { value: '', label: 'Select Vendor Type' },
  { value: 'Individual', label: 'Individual (Sole Proprietor)' },
  { value: 'Company', label: 'Company (Registered Business)' },
];




export default function VendorRegistrationForm() {
  

  const router = useRouter();
  // RHF Integration
  const { 
    register,
    control,
    setValue, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset, 
  } = useForm({
    resolver: zodResolver(vendorSchema), 
    defaultValues: {
      name: '', phone: '', email: '', password: '',
      vendor: { vendor_type: '' }, 
      termsAccepted: false,phoneVerified: false,
      emailVerified:false, confirmPassword:''
    }
  });

  // State for Server Action result messages
  const [serverMessage, setServerMessage] = useState(null); 
  
  // Submission Handler
  const onSubmit = async (data) => {
    setServerMessage(null);
    try {
      const submissionData = {
        ...data,
        role: "VENDOR", 
      };

      // Call the Server Action which makes the API call
      const result = await registerVendorAction(submissionData); 
      
      // --- SUCCESS HANDLING: Token and External Redirect ---
      if (result && result.token && result?.name !== "ApiError") {
        // 1. Store token in local storage (for redundancy/backup if external site fails to parse URL)
        localStorage.setItem('token', result.token); 
        
        // 2. Construct the external URL with the token as a query parameter
        // This supports the external site's immediate need for the token.
        
        // 3. Redirect to the external website
        
        setServerMessage({ 
          type: 'success', 
          text: "Registration successful! Redirecting to vendor portal..." 
        });

        const vendorId = result._id; 
        const vendorType = result.vendor?.vendor_type || "Individual"; // Fallback

        setServerMessage({ type: 'success', text: "Success! Redirecting to setup..." });

        // 3. PASS DATA TO PHASE 2 VIA URL
        router.push(`phasetwo?id=${vendorId}&type=${vendorType}`);
        
      }else if(result?.name == "ApiError")
      {
        console.log(result);
        setServerMessage({ 
          type: 'warning', 
          text: result?.data?.message
        });
        reset();
      }
       else {
        setServerMessage({ 
          type: 'success', 
          text: 'Registration successful, Please try logging in.' 
        });
      }

    } catch (error) {
      // Handles errors thrown by the Server Action
      console.error(error);
      setServerMessage({ 
        type: 'error', 
        text: `Network Error Please try after some time` 
      });
    } 
  };

  const email = useWatch({ control, name: "email" });
  const phone = useWatch({ control, name: "phone" });
  const emailVerified = useWatch({ control, name: "emailVerified" });
  const phoneVerified = useWatch({ control, name: "phoneVerified" });

  const baseCardStyles = "flex-1 flex items-center justify-center p-6 text-md font-bold transition-all duration-200 hover:opacity-90 ";

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex flex-col md:flex-row w-full borde overflow-hidden border-b border-slate-400">
      
      {/* Vendor Option */}
      <Link 
        href="/user/register" 
        className={`${baseCardStyles}  text-brand-primary hover:bg-brand-secondary md:border-r`}
      >
        Customer Registration
      </Link>
      {/* Customer Option */}
      <div className={`${baseCardStyles} bg-brand-secondary text-brand-primary border-b md:border-b-0  border-brand-primary`}>
        Vendor Registration
      </div>
    </div>

    <div className='p-6 sm:p-10'>
      {/* Message Box */}
      {serverMessage && (
        <div 
          className={`p-4 mb-6 rounded-lg font-medium ${
            serverMessage.type === 'success' ? 'bg-rose-100 text-brand-accent' : 'bg-red-100 text-red-700'
          }`}
        >
          {serverMessage.text}
        </div>
      )}

      {/* Use RHF's handleSubmit wrapper */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* === Personal Details === */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-brand-primary border-l-4 border-brand-primary pl-3">Your Account</h3>
          
          <RHFInputWrapper
            name="name"
            label="Full Name"
            type="text"
            register={register}
            errors={errors}
          />

          <RHFInputWrapper
            name="email"
            label="Email Address"
            type="email"
            register={register}
            errors={errors}
          />

          <RHFOtpInputWrapper 
            fieldWatcher={email}
            verificationWatcher={emailVerified}
            fieldName="emailVerified"
            otpSendAction={sendEmailOtp}
            otpVerifyaction={verifyEmailOtp}
            setValue={setValue}
            name="Email"
            />

            <RHFInputWrapper
              name="phone"
              label="Phone Number"
              type="tel"
              register={register}
              errors={errors}
            />

            <RHFOtpInputWrapper
              name="Phone"
              fieldWatcher={phone}
              verificationWatcher={phoneVerified}
              fieldName="phoneVerified"
              otpSendAction={sendPhoneOtp}
              otpVerifyaction={verifyPhoneOtp}
              setValue={setValue}
              />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
           <RHFInputWrapper
              name="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
            />
            <RHFInputWrapper
              name="confirmPassword"
              label="Confirmed Password"
              type="password"
              register={register}
              errors={errors}
            />
            

          </div>
        </div>

        {/* === Vendor Details (Nested) === */}
        <div className="pt-4 space-y-4 border-t border-slate-200">
          <h3 className="text-xl font-semibold text-brand-primary border-l-4 border-brand-primary pl-3">Vendor Information</h3>
          
          <RHFOptionSelect
            name="vendor.vendor_type"
            label="Select Primary Vendor Type"
            register={register}
            errors={errors}
            options={VENDOR_TYPE_OPTIONS}
          />
          
        </div>
        
        {/* === Terms & Conditions Checkbox === */}
        <div className="pt-4 space-y-4 border-t border-slate-200">
          <RHFCheckboxWrapper
            name="termsAccepted"
            label="I agree to the Vendor Terms and Conditions and Privacy Policy."
            register={register}
            errors={errors}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting} 
          className="w-full py-3 bg-brand-secondary text-brand-primary font-semibold rounded-lg shadow-md hover:bg-brand-secondary/80 transition duration-300 ease-in-out disabled:bg-brand-secondary/80 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Registering...</span>
            </>
          ) : (
            <span>Register as Vendor</span>
          )}
        </button>
      </form>

      <p className="text-sm text-center text-slate-500 mt-6">
        By registering, you agree to the Vendor Terms and Conditions.
      </p>
    </div>

      
    </div>
  );
}