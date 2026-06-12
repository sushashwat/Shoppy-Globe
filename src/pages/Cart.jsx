import { isRejected } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItems, selectCartTotal } from "../redux/cartSlice";
import CartItem from "../components/CartItem";

/**
 * Cart page: displays all items added to the cart.
 * - Reads cart items and totals from Redux state via selectors
 * - Renders CartItem components — each with a unique key (item.id)
 * - Shows empty state when cart has no items
 */


function Cart(){
    const items = useSelector(selectCartItems)
    const subtotal = useSelector(selectCartTotal)
    const tax = subtotal *0.1

    if(items.length === 0){
        return (
      <div className="cart-page">
        <h1 className="page-title">Your Cart</h1>
        <div className="empty-state">
          <p className="empty-icon">🛒</p>
          <h3>Your cart is empty</h3>
          <p>You haven't added anything yet.</p>
          <Link to="/" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }
    return(
        <div className="cart-page">
      <h1 className="page-title">Your Cart</h1>

      <div className="cart-layout">
        <div className="cart-items-list">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="order-summary">
          <p className="summary-title">Order Summary</p>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-tag">Free</span>
          </div>
          <div className="summary-row">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${(subtotal + tax).toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
