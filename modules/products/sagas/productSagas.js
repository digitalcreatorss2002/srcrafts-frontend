import { takeLatest, put, delay } from 'redux-saga/effects';
import { addToCartRequest, addToCartSuccess } from '../state/productSlice'

function* handleAddToCart(action) {
  try {
    // Simulate API call
    yield delay(1000); 
    console.log("Added to cart:", action.payload);
    yield put(addToCartSuccess());
    alert("Product added to cart!");
  } catch (e) {
    console.error(e);
  }
}

export default function* productSaga() {
  yield takeLatest(addToCartRequest.type, handleAddToCart);
}