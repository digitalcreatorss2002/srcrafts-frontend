import { takeEvery, call, put } from "redux-saga/effects";
import { fetchCollectionsSuccess,fetchCollectionsFailure, fetchCollectionsRequest } from "./collectionSlice";

function getAllCategories(){
    return fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/collections`)
    .then(res=>{
        if(!res.ok) throw new Error ('Network Response was not ok ');
        return res.json();
    })
}

function* fetchCollectionWorkerSaga(){
    try{
        const collections = yield call(getAllCategories);
        yield put(fetchCollectionsSuccess(collections));
    }catch(error){
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* collectionWatcherSaga(){
    yield takeEvery(fetchCollectionsRequest.type, fetchCollectionWorkerSaga);
}