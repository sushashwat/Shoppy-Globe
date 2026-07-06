import { createSlice } from '@reduxjs/toolkit'

/**
 * Auth Slice
 * Stores the logged-in user's info + JWT token.
 * Persists to localStorage so the user stays logged in after a page refresh.
 */

// On app load, try to restore any previously saved session
const savedUser = localStorage.getItem('user')
const savedToken = localStorage.getItem('token')

const initialState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Called after successful login OR register
        setCredentials: (state, action) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token
            // Persist so a page refresh doesn't log the user out
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
        },
        // Called on logout
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },
    },
})

export const { setCredentials, logout } = authSlice.actions

// Selectors
export const selectCurrentUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token
export const selectIsAuthenticated = (state) => Boolean(state.auth.token)

export default authSlice.reducer