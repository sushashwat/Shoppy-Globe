import React from "react"
import { NavLink, Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { selectCartCount } from '../redux/cartSlice'

/**
 * Header component: displays navigation menu and shopping cart icon.
 * Uses NavLink for active route styling.
 * Cart count is read from Redux state.
 * 
 */

function Header() {

    const cartCount = useSelector(selectCartCount)

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
