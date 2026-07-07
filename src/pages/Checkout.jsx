import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems, selectCartTotal, clearCartState } from "../redux/cartSlice";

/**
 * Checkout page: form to collect user details + cart summary.
 * On "Place Order":
 *   1. Validates that all required fields are filled in
 *   2. Shows "Order placed" message
 *   3. Clears the cart (Redux clearCartState action)
 *   4. Redirects user to Home page automatically after 2.5s
 *
 * NOTE: There is currently no backend "orders" endpoint — this only
 * simulates placing an order and clears the cart. To persist real
 * orders, a backend Order model + route would be needed.
 */


function Checkout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const items = useSelector(selectCartItems)
    const subtotal = useSelector(selectCartTotal)
    const tax = subtotal * 0.1
    const [ordered, setOrdered] = useState(false)
    const [formError, setFormError] = useState(null)

    //Form State
    const [form, setForm] = useState({
        name: '', email: '', phone: '', address: '', city: '', zip: '',
        card: '', expiry: '', cvv: '',
    })

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handlePlaceOrder() {
        // Validate: every field must be filled in before we allow an order
        const emptyField = Object.entries(form).find(([, value]) => value.trim() === '')
        if (emptyField) {
            setFormError('Please fill in all fields before placing your order.')
            return
        }
        if (items.length === 0) {
            setFormError('Your cart is empty.')
            return
        }

        setFormError(null)
        // Show order success message
        setOrdered(true)
        // Clear the cart via Redux action
        dispatch(clearCartState())
        // Redirect to home page automatically after 2.5 seconds
        setTimeout(() => navigate('/'), 2500)
    }

  // Order success screen
  if (ordered) {
    return (
      <div className="checkout-page">
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h2 className="success-title">Order Placed!</h2>
          <p className="success-msg">Thank you for your purchase. Redirecting...</p>
        </div>
      </div>
    )
  }



  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>

      {formError && <p className="error-banner">{formError}</p>}

      <div className="checkout-grid">
        {/* Form to collect user details */}
        <div className="form-section">
          <p className="form-title">Shipping Details</p>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="form-input" type="tel" name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input className="form-input" name="address" value={form.address} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="form-input" name="city" value={form.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">PIN Code</label>
              <input className="form-input" name="zip" value={form.zip} onChange={handleChange} required />
            </div>
          </div>

          <p className="form-title" style={{ marginTop: '1.5rem' }}>Payment</p>
          <div className="form-group">
            <label className="form-label">Card Number</label>
            <input className="form-input" name="card" value={form.card} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Expiry</label>
              <input className="form-input" name="expiry" value={form.expiry} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">CVV</label>
              <input className="form-input" name="cvv" value={form.cvv} onChange={handleChange} required />
            </div>
          </div>
             {/* Place Order Button */}
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            ✓ Place Order
          </button>
        </div>

       {/* Cart summary on checkout page */}
        <div className="form-section">
          <p className="form-title">Order Summary</p>
          {/* Cart items list with unique key */}
          {items.map(item => (
            <div key={item._id} className="checkout-summary-item">
              <img className="checkout-item-img" src={item.product.imageUrl} alt={item.product.name} loading="lazy" />
              <span className="checkout-item-name">{item.product.name} ×{item.quantity}</span>
              <span className="checkout-item-subtotal">${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #ccc' }}>
            <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summary-row"><span>Tax (10%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="summary-total"><span>Total</span><span>${(subtotal + tax).toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout