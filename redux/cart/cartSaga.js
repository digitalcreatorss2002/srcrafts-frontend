import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  validateCartRequest,
  validateCartSuccess,
  validateCartFailure,
  selectCartItems,
} from '../cart/cartSlice';

// API base URL - adjust based on your environment
const API_URL = process.env.NEXT_PUBLIC_API_URI || 'http://localhost:5000';

// API call to validate cart
function* validateCart() {
  try {
    const cartItems = yield select(selectCartItems);
    // Transform cart items to backend format
    const cartArray = cartItems.map((item) => ({
      product: item.product,
      variation: item.variation || null,
      quantity: item.quantity,
      slug: item.slug,
    }));
    // Call backend validation endpoint
    const response = yield call(fetch, `${API_URL}/api/cart/validate-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartArray }),
    });
    if (!response.ok) {
      throw new Error('Failed to validate cart');
    }

    const data = yield call([response, 'json']);
    console.log(data);
    
    // Dispatch success with validated cart data
    yield put(
      validateCartSuccess({
        cartArray: data.cartArray || [],
        is_cod_available: data.is_cod_available || false,
        message: data.message || [],
      })
    );
  } catch (error) {
    console.error('Cart validation error:', error);
    yield put(
      validateCartFailure({
        errors: [error.message || 'Failed to validate cart. Please try again.'],
      })
    );
  }
}

// Watcher saga
export default function* cartSaga() {
  yield takeLatest(validateCartRequest.type, validateCart);
}
