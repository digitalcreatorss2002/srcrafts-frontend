import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentProduct: null,
  selectedVariation: null, // Stores the specific SKU object
  selectedOptions: {}, // { Color: "Blue", Size: "M" }
  status: 'idle', // idle | loading | succeeded | failed
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductData: (state, action) => {
      state.currentProduct = action.payload;
      // Default to first variation if available
      if(action.payload.variations?.length > 0) {
         state.selectedVariation = action.payload.variations[0];
         // Pre-fill options based on first variation
         state.selectedOptions = action.payload.variations[0].options.reduce((acc, opt) => {
            acc[opt.label] = opt.value;
            return acc;
         }, {});
      }else{
        state.selectedVariation = null;
      }
    },
    updateOption: (state, action) => {
      const { label, value } = action.payload;
      state.selectedOptions[label] = value;
      
      // Logic to find matching variation based on ALL selected options
      if (state.currentProduct?.variations) {
        const match = state.currentProduct.variations.find(v => 
          v.options.every(opt => state.selectedOptions[opt.label] === opt.value)
        );
        if (match) state.selectedVariation = match;
      }
    },
    addToCartRequest: (state) => { state.status = 'loading'; },
    addToCartSuccess: (state) => { state.status = 'succeeded'; },
  },
});

export const { setProductData, updateOption, addToCartRequest, addToCartSuccess } = productSlice.actions;
export default productSlice.reducer;