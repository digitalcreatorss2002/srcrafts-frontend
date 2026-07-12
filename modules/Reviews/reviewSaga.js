import { call, put, takeLatest } from 'redux-saga/effects';
import { reviewService } from './reviewServices';
import { createReviewRequest, createReviewSuccess, createReviewFail } from './reviewSlice';

function* handleCreateReview(action) {
  try {
    const data = yield call(reviewService.submitNewReview, action.payload);
    console.log(data);
    yield put(createReviewSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(createReviewFail(error.response?.data?.message || "Submission failed"));
  }
}

export function* reviewSaga() {
  yield takeLatest(createReviewRequest.type, handleCreateReview);
}