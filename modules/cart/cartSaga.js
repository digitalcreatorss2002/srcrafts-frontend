import { takeLatest, put, call, delay, select } from 'redux-saga/effects';
import { updateRemoteCartAction } from './cartAction'; 
import { 
  addToCartRequest, 
  updateQtyRequest, 
  removeItemRequest, // Added for Sidebar Delete action
  syncCartSuccess, 
  syncCartFailure 
} from "./cartSlice";

/**
 * CORE WORKER: Syncs current Redux state with the Express Database.
 * This handles the "Source of Truth" transition from Client to Server.
 */
function* performCartSync() {
  try {
    // 1. Select the current optimistic items from the Redux State
    const items = yield select(state => state.cart.items);
    
    // 2. Call the Next.js Server Action (The bridge to Express)
    // This sends the entire items array to ensure idempotency
    const response = yield call(updateRemoteCartAction, items);
    
    if (response.success) {
      // 3. Update Redux with server-validated data (stock, prices, and IDs)
      yield put(syncCartSuccess(response.data));
    } else {
      // 4. Trigger Rollback in Reducer if server rejects (e.g., Stock empty)
      yield put(syncCartFailure(response.message || "Sync Failed"));
    }
  } catch (error) {
    // 5. Catch Network/Server errors and revert the UI
    yield put(syncCartFailure("Network error. Changes reverted."));
  }
}

/**
 * WORKER: Handle Quantity Updates (Debounced)
 * Uses delay to prevent rapid API calls while user clicks + / -
 */
function* handleUpdateQty() {
  yield delay(500); 
  yield call(performCartSync);
}

/**
 * WORKER: Immediate Sync
 * Used for Add and Remove actions where we want the server to update ASAP.
 */
function* handleImmediateSync() {
  yield call(performCartSync);
}

/**
 * WATCHER: Root Cart Saga
 * Manages concurrency using takeLatest to prevent race conditions.
 */
export function* watchCartSaga() {
  // Use takeLatest: If user clicks "Add" multiple times, only the last one finishes
  yield takeLatest(addToCartRequest.type, handleImmediateSync);
  // New: Watch for the remove item action from the Sidebar
  yield takeLatest(removeItemRequest.type, handleImmediateSync);
  // Specific watcher for quantity with the 500ms debounce
  yield takeLatest(updateQtyRequest.type, handleUpdateQty);
}         