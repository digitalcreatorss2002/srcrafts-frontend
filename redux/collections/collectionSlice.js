import { createSlice } from "@reduxjs/toolkit";



const collectionsSlice = createSlice({
    name:"collections",
    initialState:{
        collections:[],
        loading:false,
        error:null,
    },
    reducers:{
        fetchCollectionsRequest: (state)=>{
            state.loading = true;
            state.error = null;
        },
        fetchCollectionsSuccess: (state, action)=>{
            state.loading = false;
            state.collections = action.payload;
        },
        fetchCollectionsFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }
    }
})


export const {
    fetchCollectionsFailure,
    fetchCollectionsSuccess,
    fetchCollectionsRequest,
} = collectionsSlice.actions;
export default collectionsSlice.reducer;