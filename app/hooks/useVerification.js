"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

export function useVerification({
    value, 
    onReset, 
    otpLength = 6, 
    debounceMs = 600, 
    otpTimeoutMs = 60000 
}) {
    const [canVerify, setCanVerify] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null); 
    const [timeLeft, setTimeLeft] = useState(0);
    const [canResend, setCanResend] = useState(false);
    
    const debounceRef = useRef(null);
    const timeoutRef = useRef(null); 

    // Reset logic when input (email/phone) changes
    useEffect(() => {
        onReset(); 
        setCanVerify(false);
        setOtpSent(false);
        setOtp("");
        setError(null); 
        setTimeLeft(0);
        
        if (timeoutRef.current) clearTimeout(timeoutRef.current); 

        if (!value) return;

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setCanVerify(true);
        }, debounceMs);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [value, debounceMs, onReset]);

    // Timer Interval Logic
    useEffect(() => {
        let interval = null;
        if (timeLeft > 0) {
            setCanResend(false);
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timeLeft]);

    // Internal Verification logic
    const verifyOtpInternal = useCallback(async (verifyFn, onSuccess, onError) => {
        if (!otpSent || otp.length !== otpLength || loading) return;
    
        setLoading(true);
        setError(null); 
        
        try {
            // Action hamesha true/false return karega
            const isOk = await verifyFn(value, otp); 
            
            if (isOk === true) {
                onSuccess();
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            } else {
                // False case handling
                const errMessage = "Invalid OTP. Please try again.";
                setError(errMessage);
                onError(errMessage);
                setOtp(""); // Clear boxes for retry
            }
        } catch (e) {
            const errMsg = e?.message || "Verification failed.";
            setError(errMsg);
            onError(errMsg);
            setOtp(""); 
        } finally {
            setLoading(false);
        }
    }, [otp, otpLength, otpSent, value, loading]);

    const sendOtp = async (sendFn) => {
        if (loading) return;
        setLoading(true);
        setError(null);
        try {
            await sendFn(value);
            setOtpSent(true);
            setTimeLeft(Math.floor(otpTimeoutMs / 1000)); 
        } catch (e) {
            setError(e.message || "Failed to send OTP.");
            setOtpSent(false); 
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = (verifyFn, onSuccess) => {
        return async () => {
            await verifyOtpInternal(verifyFn, onSuccess, (err) => {
                setError(err); // Sync internal error to state
            });
        };
    };

    return {
        canVerify, otpSent, loading, otp, setOtp, 
        sendOtp, verifyOtp, error, timeLeft, canResend
    };
}