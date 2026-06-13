import React from "react";
import PropTypes from 'prop-types'
import { Link, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

/**
 * ProductItem component represents a single product card in the grid.
 * Props: product object passed from ProductList parent.
 * "Add to Cart" dispatches Redux action.
 * When clicked, adds to cart and shows toast notification
 */

function ProductItem({ product }) {
    const dispatch = useDispatch()
    const {showToast} = useOutletContext()  //Get showToast from Layout

    function handleAddToCart(e) {
        // Prevent card click navigating to detail when clicking button 
        e.preventDefault()
        e.stopPropagation()
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
        }))

        // Show toast notification
        showToast(`✓ "${product.title.substring(0, 25)}..." added to cart!`)
    }

    const rating = product.rating || 4
    const fullStars = Math.round(rating)
    const stars = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars)

    return (
        <article className="product-card">
            {/* Clicking the card navigates to the product detail page */}
            <Link to={`/product/${product.id}`} className="product-card-link">
                {/* Lazy loaded image for performance optimization */}
                <img
                    className="product-img"
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                />
                <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-rating">
                        <span className="stars">{stars}</span>
                        <span className="rating-num">{rating.toFixed(1)}</span>
                    </p>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
            </Link>

            {/* Add to Cart button — event handling via Redux dispatch */}
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
    id:          PropTypes.number.isRequired,
    title:       PropTypes.string.isRequired,
    price:       PropTypes.number.isRequired,
    thumbnail:   PropTypes.string.isRequired,
    category:    PropTypes.string,
    rating:      PropTypes.number,
    description: PropTypes.string,
    }) .isRequired,
}

export default ProductItem