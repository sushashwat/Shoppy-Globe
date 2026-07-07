import React from "react";
import PropTypes from 'prop-types'
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import {selectIsAuthenticated} from "../redux/authSlice"
/**
 * ProductItem component represents a single product card in the grid.
 * Props: product object passed from ProductList parent.
 * "Add to Cart" dispatches an async thunk that calls the backend.
 * Requires the user to be logged in — redirects to /login if not.
 */

function ProductItem({ product }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const { showToast } = useOutletContext()  //Get showToast    from Layout

    function handleAddToCart(e) {
        // Prevent card click navigating to detail when clicking button 
        e.preventDefault()
        e.stopPropagation()
       
          // Cart is backend-protected — a logged-out user can't add to it
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
          dispatch(addItemToCart({ productId: product._id, quantity: 1 }))

        // Show toast notification
        showToast(`✓ "${product.name.substring(0, 25)}..." added to cart!`)
    }

    const rating = product.rating || 4
    const fullStars = Math.round(rating)
    const stars = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars)

    return (
        <article className="product-card">
            {/* Clicking the card navigates to the product detail page */}
            <Link to={`/product/${product._id}`} className="product-card-link">
                {/* Lazy loaded image for performance optimization */}
                <img
                    className="product-img"
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                />
                <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-rating">
                        <span className="stars">{stars}</span>
                        <span className="rating-num">{rating.toFixed(1)}</span>
                    </p>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
            </Link>

            {/* Add to Cart button — event handling via Redux async thunk   */}
            <div className="product-card-footer">
                <button className="btn btn-primary" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </article>
    )

}

// PropTypes for type safety and reusability 

ProductItem.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
        category: PropTypes.string,
        rating: PropTypes.number,
        description: PropTypes.string,
    }).isRequired,
}

export default ProductItem