// src/modules/user/services/UserService.js
import { UserAPIRepository } from "../repositories/UserAPIRepository";
import { CustomerRegistrationSchema, LoginSchema, OTPRequestSchema, OTPVerifySchema } from "../model";


/**
 * @description Provides the business logic for all Customer operations.
 */
export class UserService {
  
  /** @private */
  userRepository;

  constructor() {
    this.userRepository = new UserAPIRepository();
  }

  /**
   * Validates and executes customer registration.
   * @param {object} rawData - Data received from the Server Action.
   * @returns {Promise<{ user: object, token: string }>}
   */
  async registerCustomer(rawData) {
    
    // 1. **Server-Side Validation**: Ensures data integrity before hitting the repo
    // Note: We use the base schema without the temporary 'termsAccepted' field for the API payload validation.
    const validatedData = CustomerRegistrationSchema.omit({ termsAccepted: true }).parse(rawData);

    // 2. Delegation and Execution
    try {
      const result = await this.userRepository.registerCustomer(validatedData);
      console.log(`Customer registration successful for user: ${result?.user?.email || result?.email}`);

      return result;
      
    } catch (error) {
      // Logic transformation: Convert technical error into user-facing message
      if (error.message.includes('email already exists')) {
         throw new Error('This email address is already registered. Please login.');
      }
      throw error; // Re-throw any critical/unexpected error
    }
  }

  /**
   * Executes the traditional email/username and password login flow.
   * @param {object} credentials - Data received from the Saga/Controller.
   * @returns {Promise<{ user: object, token: string }>}
   */
  login = async (credentials) =>{
    
    // 1. Server-Side Validation: Ensure data integrity using the Login schema
    const validatedData = LoginSchema.parse(credentials); 

    // 2. Call the repository to communicate with the backend
    try {
      const result = await this.userRepository?.login(validatedData);
      
      console.log(`User login successful for identifier: ${validatedData.email}`);
      console.log(`11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111`);
      return result;
      
    } catch (error) {
      // Logic transformation: Convert technical error into user-facing message
      if (error.message.includes('Invalid credentials')) {
         throw new Error('Incorrect email/username or password.');
      }
      throw error; // Re-throw any critical/unexpected error
    }
  }

  requestOtp = async (phone)=> {
    // Server-Side Validation
    const validatedData = OTPRequestSchema.parse({ phone });
    
    try {
        return await this.userRepository.requestOtp(validatedData.phone);
    } catch (error) {
        throw new Error("Failed to send OTP. Check phone number or try again.");
    }
  }

  verifyOtp = async (phone, otp)=> {
    // Server-Side Validation
    const validatedData = OTPVerifySchema.parse({ otp_id, otp });
    
    try {
        const result = await this.userRepository.verifyOtp(validatedData.otp_id, validatedData.otp);
        console.log(`OTP login successful `);
        return result;
    } catch (error) {
        throw new Error("OTP verification failed. Invalid OTP or expired code.");
    }
  }

  verifyToken = async (token) => {
    try {
      const user = await this.userRepository.verifyToken(token);
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  

}