import { createSlice } from "@reduxjs/toolkit";

/**
 * Products Slice
 * Manages the fetched products list and the search query (Redux State). 
 */


const productsSlice = createSlice({
    name:'products',
    initialState:{
        items: [],  // All fetched products
        searchQuery: '', // Search input stored in Redux State
        loading : false,
        error: null,
    },
    reducers:{
        setProducts(state,action){
            state.items = action.payload
            state.loading = false
            state.error = null
        },
        setLoading(state,action){
            state.loading = action.payload
        },
        setError(state,action){
            state.error = action.payload
            state.loading = false
        },
        // Search action - updates redux state 
        setSearchQuery(state,action){
            state.searchQuery = action.payload
        },
    },
})

export const {setProducts, setLoading, setError, setSearchQuery} = productsSlice.actions

// Selectors 

// All Products
export const selectAllProducts = (state) => state.products.items

// Products filtered by searchQuery (redux state)

export const selectFilteredProducts = (state) =>{
    const query = state.products.searchQuery.toLowerCase().trim()
    if (!query) return state.products.items
    return state.products.items.filter(
        (p) =>
        p.title.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query))
    )
}
    
export const selectSearchQuery = (state) => state.products.searchQuery
export const selectProductsLoading = (state) => state.products.loading
export const selectProductsError = (state) => state.products.error

export default productsSlice.reducer
