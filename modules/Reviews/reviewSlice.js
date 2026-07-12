import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    createReviewRequest: (state) => { console.log("hello"); state.loading = true; state.success = false; },
    createReviewSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.reviews.unshift(action.payload);
    },
    createReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetReviewStatus: (state) => { state.success = false; state.error = null; }
  }
});

export const { createReviewRequest, createReviewSuccess, createReviewFail, resetReviewStatus } = reviewSlice.actions;
export default reviewSlice.reducer;