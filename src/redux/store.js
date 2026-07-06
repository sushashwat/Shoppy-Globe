import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import productsReducer from './productsSlice'
import authReducer from './authSlice'

/**
 * Redux Store
 * Combines cart and products (includes search) reducers.
 */

export const store = configureStore({
    reducer:{
        cart: cartReducer,
        products: productsReducer,
        auth: authReducer,
    },
})
