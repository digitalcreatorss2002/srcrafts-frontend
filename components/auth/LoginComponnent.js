// src/components/auth/LoginComponent.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { 
    LoginSchema, 
    OTPRequestSchema, 
    OTPVerifySchema 
} from '@/modules/user/model'; 
import { 
    loginRequest, 
    otpRequest, 
    loginFailure, // Used to manually trigger verification logic
    resetOtpState
} from '@/modules/user/state/userSlice';
import { RHFInputWrapper,  RHFButton } from '@/components/form/FormWrapper'; // Assuming this component exists
import Link from 'next/link';
// Define a custom action type for OTP Verify to be caught by the Saga
const OTP_VERIFY_ACTION = 'user/otpVerify'; 

export default function LoginComponnent() {

    const dispatch = useDispatch();
    const router = useRouter();
    const { 
        isLoading, 
        error, 
        isLoggedIn, 
        isOtpSent, 
        otp_id
    } = useSelector(state => state.user);

    const [loginMode, setLoginMode] = useState('password'); // 'password' or 'otp'

    // --- Dynamic Schema Setup ---
    let currentSchema;
    if (loginMode === 'password') {
        currentSchema = LoginSchema;
    } else if (isOtpSent) {
        currentSchema = OTPVerifySchema;
    } else {
        currentSchema = OTPRequestSchema;
    }

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting: isFormSubmitting }, 
        reset,
        getValues
    } = useForm({
        resolver: zodResolver(currentSchema),
        defaultValues: { email: '', password: '', phone: '', otp: '' },
    });

       



    React.useEffect(() => {
        if (isLoggedIn) {
            // LocalStorage Saga/Action handle kar raha hoga, 
            // par hum yahan manual Cookie set karenge Server Components ke liye
            const token = localStorage.getItem('token'); // Get token from where your saga saved it
            
            if (token) {
                Cookies.set('token', token, { 
                    expires: 7, // 7 days
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });
            }
            
            router.push('/'); 
            router.refresh(); // Important: Refresh triggers server components to re-fetch with new cookie
        }
    }, [isLoggedIn, router]);

    const handleSwitchMode = (mode) => {
        setLoginMode(mode);
        reset();
        dispatch(resetOtpState()); // Reset any ongoing OTP flow state
    };

    const onSubmit = (data) => {
        if (loginMode === 'password') {
            // 1. Traditional Login
            dispatch(loginRequest(data));

        } else if (loginMode === 'otp' && !isOtpSent) {
            // 2. OTP Request (Step 1)
            dispatch(otpRequest(data));
        
        } else if (loginMode === 'otp' && isOtpSent) {
            // 3. OTP Verify (Step 2)
            // We manually dispatch the custom action type for the Saga to catch
            dispatch({ 
                type: OTP_VERIFY_ACTION, 
                payload: { phone: phoneForOtp || data.otp_id, otp: data.otp } 
            });
        }
    };
    
    // Determine the current state for button display
    const isSubmitting = isLoading || isFormSubmitting;


      

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-slate-200 max-w-lg mx-auto my-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4 text-center">
                User Login
            </h2>
            
            {/* Mode Switch Tabs */}
            <div className="flex justify-center mb-6 space-x-4">
                <button
                    onClick={() => handleSwitchMode('password')}
                    className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                        loginMode === 'password' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                    Email/Password
                </button>
                <button
                    onClick={() => handleSwitchMode('otp')}
                    className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                        loginMode === 'otp' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                    Phone/OTP
                </button>
            </div>

            {/* Error Message Box */}
            {error && (
                <div className="p-4 mb-6 rounded-lg font-medium bg-red-100 text-red-700">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* === Email/Password Login Fields === */}
                {loginMode === 'password' && (
                    <div className="space-y-4">
                        <RHFInputWrapper
                            name="email"
                            label="Email or Username"
                            type="text"
                            register={register}
                            errors={errors}
                        />
                        <RHFInputWrapper
                            name="password"
                            label="Password"
                            type="password"
                            register={register}
                            errors={errors}
                        />
                    </div>
                )}
                
                {/* === OTP Login Fields (Step 1 or 2) === */}
                {loginMode === 'otp' && (
                    <div className="space-y-4">
                        {/* Always show phone input unless OTP is sent and we store the phone number */}
                        <RHFInputWrapper
                            name="phone"
                            label="Phone Number"
                            type="tel"
                            register={register}
                            errors={errors}
                            disabled={isOtpSent} // Disable phone input after OTP is sent
                        />
                        
                        {isOtpSent && (
                            <RHFInputWrapper
                                name="otp"
                                label="Verification Code (6 digits)"
                                type="text"
                                register={register}
                                errors={errors}
                            />
                        )}
                        
                        {isOtpSent && (
                             <p className="text-sm text-center text-green-600">
                                OTP sent to {phoneForOtp || getValues('phone')}. 
                                <button type="button" onClick={() => handleSwitchMode('otp')} className="text-indigo-600 hover:underline ml-1">Change</button>
                            </p>
                        )}
                    </div>
                )}

                {/* Submit Button */}
                <RHFButton 
                    type="submit"
                    disabled={isSubmitting}
                    className={""}
                >
                     {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>{loginMode === 'password' ? 'Logging In...' : (isOtpSent ? 'Verifying OTP...' : 'Sending OTP...')}</span>
                        </>
                    ) : (
                        <span>{loginMode === 'password' ? 'Log In' : (isOtpSent ? 'Verify & Log In' : 'Send OTP')}</span>
                    )}
                </RHFButton>
                
            </form>

            <p className="text-sm text-center text-slate-500 mt-6">
                Don't have an account? 
                <Link href="/user/register" className="text-indigo-600 hover:underline font-medium ml-1">Sign Up</Link>.
            </p>
        </div>
    );
}