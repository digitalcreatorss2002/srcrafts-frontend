import { createSlice } from "@reduxjs/toolkit"

const productsSlice = createSlice({
    name: "products",
    initialState:{
        products: [],
        product:{},
        loading: false,
        error: null,
    },
    reducers:{
        fetchProductsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess: (state,action)=>{
            state.loading = false;
            state.products = action.payload;
        },
        fetchProductsFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        fetchProductByIdRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductByIdSuccess: (state,action)=>{
            state.product = action.payload
            state.loading = false
        }
    }
})

export const {
    fetchProductsRequest,
    fetchProductsSuccess, 
    fetchProductsFailure,
    fetchProductByIdSuccess,
    fetchProductByIdRequest,
    } = productsSlice.actions;
export default productsSlice.reducer;