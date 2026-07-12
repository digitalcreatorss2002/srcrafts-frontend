"use client"
import { useVerification } from '@/app/hooks/useVerification';
import { CheckCircle2, Loader2, Upload, X, FileText, AlertCircle } from 'lucide-react';
import React, { useState, useEffect, useRef,useMemo } from 'react';
import { uploadFileAction } from '@/lib/action';
import { cn } from '@/utils/cn';
import InfinityLoader from '../InfinityLoader';

// The useFormContext import is kept here for reference if you expand to use Context later, 
// but is not strictly necessary for these components as props are passed directly.

// Helper function to safely access nested error messages
const getNestedError = (errors, name) => {
  const parts = name.split('.');
  let error = errors;
  for (const part of parts) {
    if (error && error[part]) {
      error = error[part];
    } else {
      return null;
    }
  }
  return error?.message;
};

// --- 1. Generic RHF Input Wrapper ---

/**
 * Reusable wrapper for standard text, email, password, or number inputs using RHF's register.
 * @param {object} props - Component props.
 * @param {string} props.name - The field name.
 * @param {string} props.label - The visible label text.
 * @param {object} props.register - The register function from useForm.
 * @param {object} props.errors - The errors object from formState.
 * @param {string} [props.type='text'] - Input type (text, email, password, etc.).
 * @returns {JSX.Element}
 * * SOLID Principle: Open/Closed Principle (OCP) and Single Responsibility Principle (SRP).
 */
export const RHFInputWrapper = ({ name, label, register, errors, type = 'text', ...rest }) => {
  
  const errorMessage = errors[name]?.message || getNestedError(errors, name);
  const hasError = !!errorMessage;

  const inputClass = "w-full p-3 border rounded-lg   transition duration-150";
  
  const finalInputClass = `${inputClass} ${
    hasError 
      ? 'border-red-500 focus:border-red-500' 
      : 'border-slate-300 focus:border-brand-primary'
  }`;

  return (
    <div>
      <label className="block text-sm font-medium text-brand-primary/60 mb-1" htmlFor={name}>
        {label}
      </label>
      <input 
        type={type} 
        id={name} 
        {...register(name)} 
        className={finalInputClass}
        {...rest}
      />
      {errorMessage && <p className="mt-1 text-xs text-red-500 font-medium">{errorMessage}</p>}
    </div>
  );
};

// --- 2. Generic RHF Checkbox Wrapper ---

/**
 * Reusable wrapper for a single checkbox input using RHF's register.
 * * SOLID Principle: Single Responsibility Principle (SRP).
 * @param {object} props - Component props.
 * @param {string} props.name - The field name (must match Zod schema).
 * @param {string} props.label - The visible label text associated with the checkbox.
 * @param {object} props.register - The register function from useForm.
 * @param {object} props.errors - The errors object from formState.
 * @returns {JSX.Element}
 */
export const RHFCheckboxWrapper = ({ name, label, register, errors, ...rest }) => {
  const hasError = errors[name];
  const errorMessage = hasError?.message;

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={name}
          // The register function handles setting the value (true/false)
          {...register(name)}
          className={cn(`h-4 w-4 rounded transition-all duration-200 cursor-pointer  ${
            hasError 
          ? "border-red-500 focus:ring-red-500" 
          : "border-brand-primary/30 text-brand-secondary focus:ring-brand-primary"
          }`)}
          {...rest}
        />
        <label className="text-sm font-medium text-brand-primary/70 select-none" htmlFor={name}>
          {label}
        </label>
      </div>
      {/* Display error message below the checkbox */}
      {errorMessage && <p className="mt-1 text-xs text-red-500 font-medium ml-6">{errorMessage}</p>}
    </div>
  );
};

// --- 3. Generic RHF Select/Dropdown Wrapper (NEW) ---

/**
 * Reusable wrapper for a Select dropdown input using RHF's register.
 * @param {object} props - Component props.
 * @param {string} props.name - The field name (must match Zod schema).
 * @param {string} props.label - The visible label text.
 * @param {object} props.register - The register function from useForm.
 * @param {object} props.errors - The errors object from formState.
 * @param {Array<{value: string, label: string}>} props.options - Array of options for the select.
 * @returns {JSX.Element}
 * * SOLID Principle: Single Responsibility Principle (SRP).
 * Explanation: This component is solely responsible for rendering a dropdown and managing its RHF integration and error display.
 */
export const RHFOptionSelect = ({ name, label, register, errors, options, ...rest }) => {
  const errorMessage = errors[name]?.message || getNestedError(errors, name);
  const hasError = !!errorMessage;

  const selectClass = "w-full p-3 border rounded-lg  transition duration-150 appearance-none bg-white pr-8";
  
  const finalSelectClass = `${selectClass} ${
    hasError 
      ? 'border-red-500 focus:border-red-500' 
      : 'border-slate-300 focus:border-rose-500'
  }`;

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-brand-primary/60 mb-1" htmlFor={name}>
        {label}
      </label>
      <select 
        id={name} 
        {...register(name)} 
        className={finalSelectClass}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.value === ''}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow for better styling */}
      <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-brand-primary/70">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>

      {errorMessage && <p className="mt-1 text-xs text-red-500 font-medium">{errorMessage}</p>}
    </div>
  );
};


// --- 4. RHF File Upload Field (Unchanged) ---

/**
 * Custom file upload component integrated with RHF via setValue and watch.
 * @param {object} props - Component props.
 * @param {string} props.name - The field name.
 * @param {string} props.label - The visible label text.
 * @param {function} props.setValue - The setValue function from useForm.
 * @param {function} props.watch - The watch function from useForm.
 * @param {object} props.errors - The errors object from formState.
 * @returns {JSX.Element}
 */




export const RHFFileField = ({ name, label, setValue, watch, errors }) => {
  const [loading, setLoading] = useState(false);
  
  // 1. Force the component to re-render when the form value changes
  const fileValue = watch(name); 
  const errorMessage = errors[name]?.message;

  // 2. Normalize the path and add a timestamp to bypass browser cache for the same filename
  const previewUrl = useMemo(() => {
    if (!fileValue) return null;
    // Replace backslashes with forward slashes for Windows compatibility
    const cleanPath = fileValue.replace(/\\/g, '/');
    const base = process.env.NEXT_PUBLIC_API_URI || '';
    return `${base}${cleanPath}?t=${Date.now()}`;
  }, [fileValue]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const result = await uploadFileAction(formData);
      if (result.success) {
        // result.url must be a string like "/uploads/filename.jpg"
        setValue(name, result.url, { 
            shouldValidate: true, 
            shouldDirty: true, 
            shouldTouch: true 
        });
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Upload UI Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center px-1">
        <label className="text-sm font-bold text-brand-primary/70">{label}</label>
        {fileValue && !loading && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
            <CheckCircle2 size={12} /> Verified
          </span>
        )}
      </div>

      <div className={`relative transition-all duration-300 rounded-xl border-2 border-dashed min-h-[110px] flex items-center justify-center
        ${loading ? 'bg-slate-50 border-slate-300' : 
          fileValue ? 'bg-emerald-50/20 border-emerald-500/30' : 
          errorMessage ? 'bg-red-50 border-red-300' : 'bg-white border-slate-200 hover:border-rose-400'}`}
      >
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-brand-accent animate-spin" />
            <p className="text-xs font-medium text-slate-500">Uploading...</p>
          </div>
        ) : fileValue ? (
          <div className="flex items-center w-full p-3 gap-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="relative h-20 w-20 shrink-0 bg-white rounded-lg border shadow-sm overflow-hidden">
              {fileValue.toLowerCase().endsWith('.pdf') ? (
                <div className="flex flex-col items-center justify-center h-full w-full bg-slate-50 text-slate-400">
                  <FileText size={24} />
                  <span className="text-[8px] uppercase font-bold mt-1">PDF</span>
                </div>
              ) : (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="h-full w-full object-cover"
                  onLoad={() => console.log("Preview loaded successfully")}
                  onError={(e) => {
                    console.error("Preview failed to load at:", previewUrl);
                    e.target.src = "https://placehold.co/100x100?text=No+Preview";
                  }}
                />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-brand-primary/70 truncate block">
                {fileValue.split(/[\\/]/).pop()}
              </p>
              <p className="text-[10px] text-slate-400">Ready for submission</p>
            </div>

            <button 
              type="button" 
              onClick={handleRemove}
              className="p-2 bg-white text-slate-400 hover:text-brand-primary/60   rounded-full border border-slate-100 shadow-sm transition-transform hover:scale-110"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full py-6 cursor-pointer group">
            <div className="p-3 bg-brand-primary/10 text-brand-primary/50 rounded-full mb-2 group-hover:bg-brand-primary/10 transition-colors">
              <Upload size={20} />
            </div>
            <span className="text-xs font-bold text-brand-primary/60">Upload {label}</span>
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
          </label>
        )}
      </div>

      {errorMessage && (
        <p className="flex items-center gap-1 text-[11px] text-red-500 font-bold px-1">
          <AlertCircle size={12} /> {errorMessage}
        </p>
      )}
    </div>
  );
};

/**
 * Multi-File Upload Component
 * SOLID Principle: Single Responsibility - Manages a collection of file paths.
 */
export const RHFMultiFileField = ({ name, label, setValue, watch, errors }) => {
  const [loading, setLoading] = useState(false);
  
  // 1. watch returns an array [url1, url2] or undefined
  const fileValues = watch(name) || []; 
  const errorMessage = errors[name]?.message;

  const base = process.env.NEXT_PUBLIC_API_URI || '';

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const result = await uploadFileAction(formData);
      if (result.success) {
        // Normalize and Add to existing array
        const cleanPath = result.url.replace(/\\/g, '/');
        const updatedFiles = [...fileValues, cleanPath];
        
        setValue(name, updatedFiles, { 
            shouldValidate: true, 
            shouldDirty: true, 
            shouldTouch: true 
        });
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Upload UI Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (indexToRemove) => {
    const updatedFiles = fileValues.filter((_, index) => index !== indexToRemove);
    setValue(name, updatedFiles, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-bold text-brand-primary/70 px-1">{label}</label>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* Render Existing Previews */}
        {fileValues.map((url, index) => (
          <div key={index} className="relative group aspect-square rounded-xl border overflow-hidden bg-slate-50">
            <img 
              src={`${base}${url}`} 
              alt="preview" 
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {/* Upload Trigger (Always visible if loading is false) */}
        {!loading && (
          <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-slate-200 hover:border-rose-400 cursor-pointer transition-colors bg-white">
            <Upload size={20} className="text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 mt-1">Add More</span>
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </label>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">
            <InfinityLoader className="h-6 w-6 text-brand-accent animate-spin" />
          </div>
        )}
      </div>

      {errorMessage && (
        <p className="flex items-center gap-1 text-[11px] text-red-500 font-bold px-1">
          <AlertCircle size={12} /> {errorMessage}
        </p>
      )}
    </div>
  );
};


// --- 5. RHF Button ---

export const RHFButton = ({children,type,disabled,className,onClick })=>(
  <button
    type={type?type:"button"}
    disabled={disabled} 
    className={`w-full py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-black transition duration-300 ease-in-out disabled:bg-brand-secondary/60 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${className}`}
    onClick={onClick || null}
  >
    {children}
  </button>
)


// RHFOtpInput.jsx

export function RHFOtpInput({
    length = 6,
    value,
    onChange,
    onComplete,
}) {
    const inputsRef = useRef([]);

    // Auto-verify when full OTP is entered
    useEffect(() => {
        if (value.length === length) {
            onComplete?.(value);
        }
    }, [value, length, onComplete]);

    const handleChange = (e, index) => {
        // Allow only a single digit and strip non-digits
        const digit = e.target.value.replace(/\D/g, "").slice(0, 1); 

        if (!digit) return;

        // Construct the new OTP string
        const newValue =
            value.slice(0, index) +
            digit +
            value.slice(index + 1);

        onChange(newValue);

        // Move focus to the next input
        if (index < length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            e.preventDefault();

            if (value[index]) {
                // If there is a value in the current box, clear it
                const newValue =
                    value.slice(0, index) +
                    " " +
                    value.slice(index + 1);
                
                // Use trimEnd to ensure trailing spaces are removed if the last digit is deleted
                onChange(newValue.trimEnd()); 
            } else if (index > 0) {
                // If the current box is empty, move to the previous and optionally clear it (optional, but often preferred)
                inputsRef.current[index - 1].focus();
                
                // Optionally clear the previous box when backspacing from an empty one
                const prevIndex = index - 1;
                const newValue = 
                    value.slice(0, prevIndex) + 
                    " " + 
                    value.slice(prevIndex + 1);
                onChange(newValue.trimEnd());
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, length);

        onChange(pasted);

        // Move focus to the last pasted element
        if (pasted.length > 0) {
             const focusIndex = Math.min(pasted.length, length) - 1;
             inputsRef.current[focusIndex]?.focus();
        }
    };


    return (
        <div>
            <div className="flex gap-2">
                {Array.from({ length }).map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputsRef.current[index] = el)}
                        value={value[index] || ""}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        inputMode="numeric"
                        maxLength={1}
                        className="w-10 h-12 text-center border rounded-md text-lg focus:outline-none "
                    />
                ))}
            </div>
        </div>
    );
}



// Import your components and hook
// import { RHFOtpInput } from './RHFOtpInput'; 
// import { useVerification } from './useVerification'; 



export function RHFOtpInputWrapper({
    length = 6,
    fieldWatcher,
    verificationWatcher,
    fieldName,
    otpSendAction,
    otpVerifyaction,
    setValue,
    name
}) {
    const { 
        canVerify, otpSent, loading, otp, setOtp, 
        sendOtp, verifyOtp, error, timeLeft, canResend 
    } = useVerification({
        value: fieldWatcher,
        onReset: () => setValue(fieldName, false),
        otpLength: length
    });

    const wrappedVerify = verifyOtp(
        otpVerifyaction,
        () => setValue(fieldName, true, { shouldDirty: true })
    );

    // Production-ready error logic: React Crash se bachne ke liye string check
    const getDisplayError = () => {
        // priority 1: Custom Verification Error (Invalid OTP)
        if (error) return error;
        // priority 2: RHF Validation Error
        
    };

    const displayError = getDisplayError();

    return (
        <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-3'>
                
                {/* 1. OTP Inputs */}
                {canVerify && otpSent && !verificationWatcher && (
                    <RHFOtpInput 
                        value={otp}
                        onChange={setOtp}
                        onComplete={wrappedVerify}
                        length={length}
                    />
                )}
                
                {/* 2. Action Button */}
                {canVerify && !verificationWatcher && (
                    <div className='flex items-center gap-2'>
                        <button
                            type="button"
                            disabled={loading || (otpSent && otp.length !== length)}
                            onClick={!otpSent ? () => sendOtp(otpSendAction) : wrappedVerify}
                            className={`border-2 px-3 h-9 rounded-md text-sm transition-all font-bold flex items-center
                                ${loading ? 'bg-gray-100 text-gray-400 border-gray-200' : 
                                  otpSent ? 'text-amber-900 bg-amber-200 border-amber-300 hover:bg-amber-400' : 
                                  'text-rose-700 bg-rose-200 border-rose-300 hover:bg-rose-400'}`}
                        > 
                            {loading && <Loader2 className='animate-spin mr-2' size={16} />}
                            {!loading && (otpSent ? `Verify` : `Send OTP`)}
                            {loading && (otpSent ? 'Verifying...' : 'Sending...')}
                        </button>

                        {/* 3. Resend/Timer Section */}
                        {otpSent && (
                            <div className="flex items-center">
                                {!canResend ? (
                                    <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-2 py-1.5 rounded border border-gray-200 text-[11px] font-medium">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary/70 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary/70"></span>
                                        </span>
                                        {timeLeft}s
                                    </div>
                                ) : (
                                    <button 
                                        type="button" 
                                        onClick={() => sendOtp(otpSendAction)} 
                                        className="bg-brand-secondary/90 text-xs font-bold hover:underline ml-1"
                                    >
                                        Resend?
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* 4. Success State */}
                {verificationWatcher && (
                    <div className="text-green-600 text-sm font-bold flex items-center bg-green-50 px-3 py-1.5 rounded-md border border-green-200">
                        <CheckCircle2 className='mr-2' size={18}/> {name} Verified
                    </div>
                )}
            </div>
            
            {/* 5. Error Display */}
            {displayError && (
                <p className="text-[12px] text-red-600 font-bold mt-1 flex items-center gap-1">
                    <span>⚠️</span> {displayError}
                </p>
            )}
        </div>
    );
}


export const RHFTextareaWrapper = ({ name, label, register, errors, placeholder, ...rest }) => {
  const errorMessage = errors[name]?.message;
  return (
    <div>
      <label className="block text-sm font-medium text-brand-primary/60 mb-1" htmlFor={name}>{label}</label>
      <textarea
        id={name}
        {...register(name)}
        rows={5}
        placeholder={placeholder}
        className={`w-full p-3 border rounded-lg  transition duration-150 resize-none ${
          errorMessage ? 'border-red-500 focus:border-red-500' : 'border-slate-300'
        }`}
        {...rest}
      />
      {errorMessage && <p className="mt-1 text-xs text-red-500 font-medium">{errorMessage}</p>}
    </div>
  );
};