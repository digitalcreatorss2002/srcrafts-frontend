

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories:[],
        loading:false,
        error:null,
    },
    reducers:{
        fetchCategoriesRequest: (state)=>{
            state.loading = true;
            state.error = null
        },
        fetchCategoriesSuccess: (state, action)=>{
            state.categories= action.payload;
            state.loading = false;
        },
        fetchCategoriesFaliure: (state,action)=>{
            state.error = action.payload;
            state.loading = false;
        }
    }
})


export const {
    fetchCategoriesFaliure,
    fetchCategoriesRequest,
    fetchCategoriesSuccess
} = categoriesSlice.action;

export default categoriesSlice.reducer;