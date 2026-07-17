import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  }
  return [];
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cartItems) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
};

const initialState = {
  items: loadCartFromStorage(), // Load from localStorage on init
  validatedCart: null,
  isCodAvailable: false,
  validationErrors: [],
  status: 'idle', // 'idle' | 'validating' | 'validated' | 'error',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, variation, quantity = 1, productData } = action.payload;

      // Ensure items is an array
      if (!Array.isArray(state.items)) {
        state.items = [];
      }

      // Create unique key for cart item (product + variation combination)
      const cartKey = variation ? `${product}_${variation}` : product;

      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex((item) => {
        const itemKey = item.variation
          ? `${item.product}_${item.variation}`
          : item.product;
        return itemKey === cartKey;
      });

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        state.items.push({
          product,
          variation: variation || null,
          quantity,
          slug: productData?.slug || '',
          name: productData?.name || '',
          image: productData?.image || '',
          price: productData?.price || productData?.sale_price || 0,
          regularPrice: productData?.regularPrice || productData?.regular_price || 0,
          vendor: productData?.vendor || null,
          vendorName: productData?.vendorName || '',
          stock: productData?.stock || 0,
          addedAt: new Date().toISOString(),
        });
      }

      saveCartToStorage(state.items);
      state.validatedCart = null; // Reset validation when cart changes
      state.status = 'idle';
    },

    updateQuantity: (state, action) => {
      const { product, variation, quantity } = action.payload;
      const cartKey = variation ? `${product}_${variation}` : product;

      const itemIndex = state.items.findIndex((item) => {
        const itemKey = item.variation
          ? `${item.product}_${item.variation}`
          : item.product;
        return itemKey === cartKey;
      });

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity = quantity;
        }
        saveCartToStorage(state.items);
        state.validatedCart = null; // Reset validation
        state.status = 'idle';
      }
    },

    removeFromCart: (state, action) => {
      const { product, variation } = action.payload;
      const cartKey = variation ? `${product}_${variation}` : product;

      state.items = state.items.filter((item) => {
        const itemKey = item.variation
          ? `${item.product}_${item.variation}`
          : item.product;
        return itemKey !== cartKey;
      });

      saveCartToStorage(state.items);
      state.validatedCart = null; // Reset validation
      state.status = 'idle';
    },

    clearCart: (state) => {
      state.items = [];
      state.validatedCart = null;
      state.isCodAvailable = false;
      state.validationErrors = [];
      state.status = 'idle';
      saveCartToStorage([]);
    },

    // Validation actions (handled by saga)
    validateCartRequest: (state) => {
      state.status = 'validating';
      state.validationErrors = [];
    },

    validateCartSuccess: (state, action) => {
      state.status = 'validated';
      state.validatedCart = action.payload.cartArray;
      state.isCodAvailable = action.payload.is_cod_available || false;
      state.validationErrors = action.payload.message || [];
    },

    validateCartFailure: (state, action) => {
      state.status = 'error';
      state.validationErrors = action.payload?.errors || [
        'Failed to validate cart',
      ];
    },

    // Sync cart from localStorage (useful after page reload)
    syncCartFromStorage: (state) => {
      state.items = loadCartFromStorage();
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  validateCartRequest,
  validateCartSuccess,
  validateCartFailure,
  syncCartFromStorage,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => {
  const items = state.cart?.items;
  return Array.isArray(items) ? items : [];
};

export const selectCartItemCount = (state) => {
  const items = state.cart?.items;
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const selectCartTotal = (state) => {
  const items = state.cart?.items;
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const selectValidatedCart = (state) => state.cart?.validatedCart;
export const selectIsCodAvailable = (state) =>
  state.cart?.isCodAvailable || false;
export const selectCartStatus = (state) => state.cart?.status || 'idle';
export const selectValidationErrors = (state) =>
  state.cart?.validationErrors || [];

// Group cart items by vendor
export const selectCartByVendor = (state) => {
  const grouped = {};
  const items = state.cart?.items;

  if (!Array.isArray(items)) return grouped;

  items.forEach((item) => {
    const vendorId = item.vendor || 'unknown';
    if (!grouped[vendorId]) {
      grouped[vendorId] = {
        items: [],
        subtotal: 0,
      };
    }
    grouped[vendorId].items.push(item);
    grouped[vendorId].subtotal += item.price * item.quantity;
  });

  return grouped;
};

export default cartSlice.reducer;
