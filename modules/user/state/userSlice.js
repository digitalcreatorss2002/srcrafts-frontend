// src/modules/user/state/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, 
  token: null, 
  isLoggedIn: false,
  isLoading: false,
  isAuthChecking:true,
  error: null,
  // State for OTP flow
  isOtpSent: false,
  otp_id: null, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // --- Shared Login/Logout Actions ---
    loginRequest: (state, action) => { // Used for Email/Password login
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => { // Used for both login types on success
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token; 
      state.isOtpSent = false;
      state.phoneForOtp = null;
    },
    loginFailure: (state, action) => { // Used for both login types on failure
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
    },
    logout: (state) => {
      // Clear state
      Object.assign(state, initialState); 
    },
    // --- OTP Login Actions ---
    otpRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    otpRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.isOtpSent = true;
      state.phoneForOtp = action.payload.phone; 
    },
    otpRequestFailure: (state, action) => {
      state.isLoading = false;
      state.isOtpSent = false;
      state.error = action.payload;
    },
    resetOtpState: (state) => {
        state.isOtpSent = false;
        state.phoneForOtp = null;
        state.error = null;
    },
    authCheckedFinished:(state)=>{
      state.isAuthChecking = false; //Set to false when Saga completes
    },
    logoutRequest: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      Object.assign(state, initialState);
    }

  },
});

export const { 
    loginRequest, loginSuccess, loginFailure, logout,
    otpRequest, otpRequestSuccess, otpRequestFailure, otpVerify,logoutRequest,logoutSuccess,
    resetOtpState, authCheckedFinished
} = userSlice.actions;

export default userSlice.reducer;