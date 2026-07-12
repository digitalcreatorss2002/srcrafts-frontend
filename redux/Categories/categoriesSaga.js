import {takeEvery, call , put} from "redux-saga/effects"
import { fetchCategoriesRequest, fetchCategoriesSuccess, fetchCategoriesRequest } from "./categoriesSlice";

// fetch all categories
// Redux-Saga terminology, this function is called a “service function” or “API helper”
function getAllCategories(){
    return fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/categories`)
    .then(res =>{
        if(!res.ok) throw new Error('Network response was not ok');
        return res.json();
    })
}

function* fetchCategoriesWorkerSaga(){
    try{
        const categories = yield call(getAllCategories);
        yield put(fetchCategoriesSuccess(categories))
    }
    catch(error){
        yield put(fetchCategoriesFailure(error.message));
    }
}

//fetch main categories


export function* productsWatcherSaga(){
    yield takeEvery(fetchCategoriesRequest.type, fetchCategoriesWorkerSaga);
}