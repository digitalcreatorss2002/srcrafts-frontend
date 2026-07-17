import { createSlice } from '@reduxjs/toolkit';

// Helper function to load wishlist from localStorage
const loadWishlistFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return [];
    }
  }
  return [];
};

// Helper function to save wishlist to localStorage
const saveWishlistToStorage = (wishlistItems) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }
};

const initialState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload; // product details object
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      const exists = state.items.some((item) => item._id === product._id);
      if (!exists) {
        state.items.push(product);
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);
      saveWishlistToStorage(state.items);
    },
    syncWishlistFromStorage: (state) => {
      state.items = loadWishlistFromStorage();
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage([]);
    }
  }
});

export const {
  addToWishlist,
  removeFromWishlist,
  syncWishlistFromStorage,
  clearWishlist,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => {
  const items = state.wishlist?.items;
  return Array.isArray(items) ? items : [];
};

export const selectWishlistItemCount = (state) => {
  const items = state.wishlist?.items;
  return Array.isArray(items) ? items.length : 0;
};

export default wishlistSlice.reducer;
