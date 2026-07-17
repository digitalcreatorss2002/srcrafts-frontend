import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from '@/modules/products/state/productSlice';
import collectionsReducer from './collections/collectionSlice';
import userReducer from '@/modules/user/state/userSlice';
import cartReducer from './cart/cartSlice';
import reviewReducer from '@/modules/Reviews/reviewSlice';
import wishlistReducer from './wishlist/wishlistSlice';

const rootReducer = combineReducers({
  user: userReducer,
  collections: collectionsReducer,
  product: productsReducer,
  cart: cartReducer,
  review: reviewReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;
