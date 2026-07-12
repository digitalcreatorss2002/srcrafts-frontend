// src/modules/user/model.js
import { z } from 'zod';

/**
 * @description Zod schema for standard Customer Registration data validation.
 */
export const CustomerRegistrationSchema = z.object({
  name: z.string().min(3, "Full Name is required and must be at least 3 characters."),
  
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits.")
    .max(15, "Phone number is too long."),
    
  email: z.string().email("Invalid email format. Please check your address."),
  
  password: z.string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[a-z]/, "Password must contain a lowercase letter.")
    .regex(/[A-Z]/, "Password must contain an uppercase letter.")
    .regex(/[0-9]/, "Password must contain a number."),

  role: z.literal("CUSTOMER"), 

  phoneVerified: z.literal(true, {
    errorMap: () => ({ message: "Phone verification required" }),
  }),
  
  // NOTE: This is for client-side validation only. The final payload will exclude this.
  termsAccepted: z.boolean({
    required_error: "You must accept the terms and conditions."
  }).refine(val => val === true, { 
    message: "You must accept the terms and conditions to register."
  }),
});

/**
 * @description Zod schema for Traditional Login.
 */

export const LoginSchema = z.object({
  email : z.string().min(1,"Email or Username is required."),
  password : z.string().min(1, "password is required"),
});

/**
 * @description Zod schema for OTP Login.
*/

export const OTPRequestSchema = z.object({
  phone: z.string().min(10, "Phone number must be valid."),
});

// 3. OTP Verification Schema (Step 2)
export const OTPVerifySchema = z.object({
  otp_id: z.string().min(1, "Wrong otp"),
  otp: z.string().length(6, "OTP must be 6 digits."),
});

