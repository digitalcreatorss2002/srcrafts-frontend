import { all } from 'redux-saga/effects';
import { productsWatcherSaga } from './products/productSaga';
import { collectionWatcherSaga } from './collections/collectionSaga';
import userRootSaga, { userWatcher } from '@/modules/user/sagas/userSaga';
import productSaga from '@/modules/products/sagas/productSagas';
import cartSaga from './cart/cartSaga';
import { reviewSaga } from '@/modules/Reviews/reviewSaga';


export default function* rootSaga() {
  yield all([
    userRootSaga(),
    productsWatcherSaga(),
    productSaga(),
    collectionWatcherSaga(),
    cartSaga(),
    reviewSaga(),
  ]);
}
