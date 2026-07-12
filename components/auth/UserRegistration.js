"use client";

import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; 
// Import schema for client-side validation
import { CustomerRegistrationSchema } from '@/modules/user/model'; 
// Import Server Action for submission
import { registerCustomerAction, sendPhoneOtp, verifyPhoneOtp } from '@/lib/action'; 
// Assuming placeholder wrappers exist
import { RHFInputWrapper, RHFCheckboxWrapper, RHFButton, RHFOtpInputWrapper } from '@/components/form/FormWrapper'; 
import Link from 'next/link';

// NOTE: The CustomerRegistrationSchema already includes 'role: z.literal("CUSTOMER")'
const defaultValues = {
  name: '', phone: '', email: '', password: '', 
  role: 'CUSTOMER', 
  termsAccepted: false, 
  phoneVerified: false,
};

export default function CustomerRegistrationForm() {
  
  const { 
    register, 
    control,
    setValue,
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset, 
  } = useForm({
    resolver: zodResolver(CustomerRegistrationSchema), 
    defaultValues,
  });

  const phone = useWatch({ control, name: "phone" });
  const phoneVerified = useWatch({ control, name: "phoneVerified" });

  const [serverMessage, setServerMessage] = useState(null); 
  
  const onSubmit = async (data) => {
    setServerMessage(null);
    
    try {
      // Pass the full data object, including 'termsAccepted' and 'role', to the Server Action.
      // The action/service layer handles stripping fields the API doesn't need.
      const result = await registerCustomerAction(data); 
      
      if (result && result.token) {
        
        setServerMessage({ 
          type: 'success', 
          text: `Registration successful for ${result?.user?.name || result?.name}. Please proceed to login.` 
        });
        reset();
        
        // In a real app, you would redirect here using router.push('/login')
        
      } else {
        setServerMessage({ 
          type: 'error', 
          text: 'Registration successful, but session token was missing. Please try logging in.' 
        });
      }

    } catch (error) {
      setServerMessage({ 
        type: 'error', 
        text: error.message || 'A critical error occurred during registration.' 
      });
    } 
  };

  // Helper for conditional styling
  const messageClass = serverMessage 
    ? (serverMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')
    : '';

    const baseCardStyles = "flex-1 flex items-center justify-center p-6 text-md font-bold transition-all duration-200 hover:opacity-90 ";
    return (
    <div className="bg-white shadow-xl rounded-2xl  border border-slate-200 max-w-lg mx-auto my-12 overflow-hidden">
      <div className="flex flex-col md:flex-row w-full borde overflow-hidden border-b border-slate-400">
      {/* Customer Option */}
      <div className={`${baseCardStyles} bg-brand-secondary text-brand-primary border-b md:border-b-0 md:border-r border-brand-primary`}>
        Customer Registration
      </div>

      {/* Vendor Option */}
      <Link 
        href="/vendor/register" 
        className={`${baseCardStyles}  text-brand-primary hover:bg-brand-secondary`}
      >
        Vendor Registration
      </Link>
    </div>

      <div className='p-6'>

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
        

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* === Account Details === */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-brand-primary/90 border-l-4 border-brand-primary pl-3">Your Details</h3>
          
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
          
          <RHFInputWrapper
            name="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
          />
        </div>
        
        {/* === Terms & Conditions Checkbox === */}
        <div className="pt-4 space-y-4 border-t border-slate-200">
          <RHFCheckboxWrapper
            name="termsAccepted"
            label="I agree to the Customer Terms and Conditions and Privacy Policy."
            register={register}
            errors={errors}
          />
        </div>

        {/* Submit Button */}
        <RHFButton
          text="Register"
          type="submit"
          disabled={isSubmitting}
          className="">
             {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Registering...</span>
            </>
          ) : (
            <span>Register Now</span>
          )}
          </RHFButton>
      </form>

      <p className="text-sm text-center text-slate-500 mt-6">
        Already have an account? 
        <Link href="/user/login" className="text-brand-secondary hover:underline font-medium ml-1">Log In here</Link>.
      </p>
      </div>
    </div>
  );
}

// --- Placeholder for Form Wrapper Components (Must be defined in your project) ---
/* * You need to define RHFInputWrapper and RHFCheckboxWrapper 
 * in /src/components/form/FormWrapper.jsx for this code to run. 
 * They handle displaying the label, input, and RHF errors using Tailwind CSS.
*/