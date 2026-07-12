import { z } from "zod";

export const vendorSchema = z
  .object({
    name: z.string().min(3, "Full Name is required and must be at least 3 characters."),

    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits.")
      .max(15, "Phone number is too long."),

    email: z.string().email("Invalid email format. Please check your address."),

    emailVerified: z.literal(true, {
      errorMap: () => ({ message: "Email verification required" }),
    }),

    phoneVerified: z.literal(true, {
      errorMap: () => ({ message: "Phone verification required" }),
    }),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[a-z]/, "Password must contain a lowercase letter.")
      .regex(/[A-Z]/, "Password must contain an uppercase letter.")
      .regex(/[0-9]/, "Password must contain a number."),

    confirmPassword: z.string().min(8, "Confirm password is required"),

    vendor: z.object({
      vendor_type: z.enum(["Individual", "Company"], {
        required_error: "Vendor Type is required.",
        invalid_type_error: "Invalid vendor type selected.",
      }),
    }),

    termsAccepted: z
      .boolean({
        required_error: "You must accept the terms and conditions.",
      })
      .refine((val) => val === true, {
        message: "You must accept the terms and conditions to register.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });


// modules/vendor/model/vendorProfileModel.js

// --- Regex Patterns for Indian Context ---
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const PIN_REGEX = /^[1-9][0-9]{5}$/;
const ADHAAR_REGEX = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;

export const vendorProfileSchema = z.object({
  // --- Store Details ---
  store_name: z.string().min(3, "Store name must be at least 3 characters."),
  store_description: z.string().min(20, "Description must be at least 20 characters."),
  store_logo: z.string().min(1, "Store Logo is required."),

  // --- Dynamic Document (Artisan Card or Company Registration) ---
  // Maps to 'supporting_docs' in DB
  supporting_docs: z.string().min(1, "Proof of Business/Skill document is required."),

  // --- Address Details (Will be mapped to pickup_address array) ---
  address_1: z.string().min(5, "Address Line 1 is required."),
  address_2: z.string().optional(),
  state: z.string().min(2, "State is required."),
  pin: z.string().regex(PIN_REGEX, "Invalid 6-digit PIN Code."),

  // --- KYC / Legal Documents ---
  pan_no: z.string().regex(PAN_REGEX, "Invalid PAN Number format (e.g., ABCDE1234F)."),
  pan_file: z.string().min(1, "PAN Card image is required."), // Maps to 'pan' in DB
  
  adhaar_no: z.string().regex(ADHAAR_REGEX, "Invalid 12-digit Aadhaar Number."),
  adhaar_certificate_front: z.string().min(1, "Aadhaar Front image is required."),
  adhaar_certificate_back: z.string().min(1, "Aadhaar Back image is required."),

  // GST is optional for Individuals but strictly validated if provided
  gst_no: z.union([
    z.string().regex(GST_REGEX, "Invalid GST Number format."),
    z.literal(""),
    z.undefined()
  ]),
  gst_certificate: z.string().optional(),
});