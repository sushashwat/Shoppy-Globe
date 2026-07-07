import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const API_URL = import.meta.env.VITE_API_URL


// Small helper so every cart request automatically carries the JWT token
function authHeaders(getState) {
    const token = getState().auth.token
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
}

// ---- Async Thunks: each one talks to the backend ----

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async(_, { getState, rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/cart`, {
                headers: authHeaders(getState),
            })
            const result = await res.json()
            if (!res.ok) throw new Error(result.message || 'Failed to fetch cart')
            return result.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

// POST /cart — add a product (or bump its quantity if already in cart)

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async ({ productId, quantity = 1 }, { getState, rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/cart`, {
                method: 'POST',
                headers: authHeaders(getState),
                body: JSON.stringify({ productId, quantity }),
            })
            const result = await res.json()
            if (!res.ok) throw new Error(result.message || 'Failed to add to cart')
            return result.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)


// PUT /cart/:id — update quantity of a specific cart item
export const updateItemQuantity = createAsyncThunk(
    'cart/updateItemQuantity',
    async ({ cartItemId, quantity }, { getState, rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/cart/${cartItemId}`, {
                method: 'PUT',
                headers: authHeaders(getState),
                body: JSON.stringify({ quantity }),
            })
            const result = await res.json()
            if (!res.ok) throw new Error(result.message || 'Failed to update cart item')
            return result.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

// DELETE /cart/:id — remove an item from the cart
export const removeItem = createAsyncThunk(
    'cart/removeItem',
    async (cartItemId, { getState, rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/cart/${cartItemId}`, {
                method: 'DELETE',
                headers: authHeaders(getState),
            })
            const result = await res.json()
            if (!res.ok) throw new Error(result.message || 'Failed to remove cart item')
            return cartItemId
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],      // each item: { _id, product: {_id, name, price, imageUrl, stock}, quantity }
        loading: false,
        error: null,
    },
    reducers: {
        // Used on logout, so the next user doesn't see the previous user's cart
        clearCartState(state) {
            state.items = []
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchCart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // addItemToCart
            .addCase(addItemToCart.fulfilled, (state, action) => {
                const existingIndex = state.items.findIndex(i => i._id === action.payload._id)
                if (existingIndex !== -1) {
                    state.items[existingIndex] = action.payload
                } else {
                    state.items.push(action.payload)
                }
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.error = action.payload
            })
            // updateItemQuantity
            .addCase(updateItemQuantity.fulfilled, (state, action) => {
                const index = state.items.findIndex(i => i._id === action.payload._id)
                if (index !== -1) state.items[index] = action.payload
            })
            .addCase(updateItemQuantity.rejected, (state, action) => {
                state.error = action.payload
            })
            // removeItem
            .addCase(removeItem.fulfilled, (state, action) => {
                state.items = state.items.filter(i => i._id !== action.payload)
            })
            .addCase(removeItem.rejected, (state, action) => {
                state.error = action.payload
            })
    },
})

export const { clearCartState } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartLoading = (state) => state.cart.loading
export const selectCartError = (state) => state.cart.error
export const selectCartCount = (state) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
export const selectCartTotal = (state) =>
    state.cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

export default cartSlice.reducer