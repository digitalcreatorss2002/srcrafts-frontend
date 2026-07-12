import { takeEvery, call , put } from "redux-saga/effects"
import { 
    fetchProductByIdRequest,
    fetchProductByIdSuccess,
    fetchProductsFailure,
    fetchProductsRequest,
    fetchProductsSuccess,
    
} from './productSlice';


// function and saga to get all products 
function getAllProduct(){
    return fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/products`)
    .then(res => {
        if(!res.ok) throw new Error('Network response was not ok');
        return res.json();
    });
    
}


function* fetchProductsWorkerSaga(){
    try{
        const products = yield call(getAllProduct);
        yield put(fetchProductsSuccess(products));
    } catch (error){
        yield put(fetchProductsFailure(error.message));
    }
}


// function and saga to get single product data 
function getProductById(id){
    {   
        return fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/products/${id}`)
        .then(res => {
            if(!res.ok) throw new Error('Network response was not ok');
            return res.json();
        });
    }
    
}

function* fetchProductByIdWorkerSaga(action){
    try {
  
      const product = yield call(getProductById, action.payload);
      console.log("API Response:", product);
  
      yield put(fetchProductByIdSuccess(product));
    } catch (error) {
      yield put(fetchProductsFailure(error.message));
    }
  }


export function* productsWatcherSaga() {
    yield takeEvery(fetchProductsRequest.type, fetchProductsWorkerSaga);
    yield takeEvery(fetchProductByIdRequest.type, fetchProductByIdWorkerSaga);
}