import { createSlice } from "@reduxjs/toolkit";

// Cart Slice: manages all cart state with actions and reducers
const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        items:[], 
    },
    reducers:{
        // add item or increment in qty of already in cart 
        addToCart(state,action){
            const existing = state.items.find(i => i.id === action.payload.id)
            if (existing){
                existing.qty +=1
            } else{
                state.items.push({
                    ...action.payload, qty:1})
            }
        },
        // Remove items from Cart
        removeFromCart(state,action){
            state.items = state.items.filter(i => i.id !== action.payload)
        },

        // Increas Qty by 1
        increaseQty(state,action){
            const item = state.items.find(i => i.id === action.payload)
            if(item) item.qty +=1
        },
        // Decrease qty by 1 , but never below 1 
        decreaseQty(state,action){
            const item = state.items.find(i => i.id === action.payload)
            if(item && item.qty>1) item.qty -=1
        },
        // Clear entire cart 
        clearCart(state){
            state.items = []
        },
    },
})


export const {addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions
// Selectors 
export const selectCartItems = state => state.cart.items
export const selectCartCount = state => state.cart.items.reduce((sum, i) => sum + i.qty, 0)
export const selectCartTotal = state =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0)

export default cartSlice.reducer