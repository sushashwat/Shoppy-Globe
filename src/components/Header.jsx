import React from "react"
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { clearCartState, selectCartCount } from '../redux/cartSlice'
import { selectCurrentUser, selectIsAuthenticated, logout } from '../redux/authSlice'

/**
 * Header component: displays navigation menu and shopping cart icon.
 * Uses NavLink for active route styling.
 * Cart count is read from Redux state.
 * Shows Login/Register when logged out, or user name + Logout when logged in.
 */

function Header() {

    const cartCount = useSelector(selectCartCount)
    const user = useSelector(selectCurrentUser)
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout() {
        dispatch(logout())
        dispatch(clearCartState())
        navigate('/')
    }

    return (
        <header className="header">
            <Link to="/" className="logo">
                Shoppy <span className="logo-accent">Globe</span>
            </Link>

            <nav className="nav-links">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    Home
                </NavLink>
                <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    Cart
                </NavLink>
                <NavLink to="/checkout" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    Checkout
                </NavLink>
                 {isAuthenticated ? (
                    <>
                        <span className="nav-link">Hi, {user?.name}</span>
                        <button className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer', background: 'none', border: 'none' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            Login
                        </NavLink>
                        <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            Register
                        </NavLink>
                    </>
                )}
            </nav>

            {/* Shopping cart icon with item count badge */}
            <Link to="/cart" className="cart-icon-btn">
                <span className="cart-icon">🛒</span>
                <span className="cart-label">Cart</span>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
        </header>
    )
}
export default Header;
