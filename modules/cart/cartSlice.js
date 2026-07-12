import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],          // Array of { variantId, productId, quantity, isAvailable, name, price, image }
  previousItems: [],  // Snapshot for Rollback logic (SOLID: Data Integrity)
  isOpen: false,      // UI State for Sidebar/Drawer toggle
  status: 'idle',     // 'idle' | 'loading' | 'succeeded' | 'failed'
  itemId: '',

  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // UI Toggle for Sidebar
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    setCartOpen: (state, action) => {
      state.isOpen = action.payload;
    },

    // TRIGGER: User adds item (Optimistic)
    addToCartRequest: (state, action) => {
      state.status = 'loading';

      const { variantId, quantity, productId } = action.payload;

      state.itemId = variantId || productId;
      const existingItem = state.items.find(item => (item.variantId === variantId && item.productId === productId));

      
      // Step 1: Create a deep copy backup before modifying
      state.previousItems = JSON.parse(JSON.stringify(state.items));

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        // Assume available until server says otherwise
        state.items.push({ ...action.payload, isAvailable: true });
      }

    },

    // TRIGGER: User changes quantity in Sidebar (Optimistic + Debounced in Saga)
    updateQtyRequest: (state, action) => {
      state.status = 'loading';
      state.previousItems = JSON.parse(JSON.stringify(state.items)); // Backup
      
      const { variantId, quantity } = action.payload;
      const item = state.items.find(i => i.variantId === variantId);
      
      if (item) {
        item.quantity = quantity;
      }
    },

    // TRIGGER: User removes item (Optimistic)
    removeItemRequest: (state, action) => {
      state.status = 'loading';
      state.previousItems = JSON.parse(JSON.stringify(state.items));
      state.items = state.items.filter(i => i.variantId !== action.payload);
    },

    // SUCCESS: Server confirmed state or returned merged guest cart
    syncCartSuccess: (state, action) => {
      state.status = 'succeeded';
      // Server returns Source of Truth (validated stock, prices, and IDs)
      state.items = action.payload.items; 
      state.previousItems = []; // Clear rollback backup on success
      state.error = null;
    },

    // FAILURE: Server rejected update (e.g., Out of Stock, Auth issue)
    syncCartFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      // Step 2: Restore previous valid state (Rollback Logic)
      state.items = state.previousItems;
      state.previousItems = [];
    }
  },
});

export const { 
  toggleCart, 
  setCartOpen, 
  addToCartRequest, 
  updateQtyRequest, 
  removeItemRequest, 
  syncCartSuccess, 
  syncCartFailure 
} = cartSlice.actions;

export default cartSlice.reducer;