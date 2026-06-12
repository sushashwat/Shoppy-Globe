import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";


/**
 * CartItem component: represents a single item in the shopping cart.
 * Allows quantity adjustment (min1) and removal - all via Redux actions.
 */

function CartItem({item}) {
    const dispatch = useDispatch()

    return(
        <div className="cart-item">            
                        {/* Lazy Load image for performance */}
            <img className="cart-item-img" src={item.thumbnail} alt={item.title} loading="lazy"/>   

            <div className="cart-item-info">
                <p className="cart-item-title">{item.title}</p>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>

                <div className="qty-controls">
                    <button className="qty-btn" onClick={()=> dispatch(decreaseQty(item.id))}
                        disabled={item.qty <=1}> − </button>

                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn" onClick={()=> dispatch(increaseQty(item.id))}>
                         +
                    </button>
                    <span className="item-subtotal">= $ {(item.price*item.qty).toFixed(2)}</span>
                </div>
            </div>
            <button 
            className="remove-btn"
            onClick={() => dispatch(removeFromCart(item.id))}
            title="Remove item">
                 ✕
            </button>
        </div>  
    )
}

// PropTypes ensure component receives correct data shape 
CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        qty: PropTypes.number.isRequired,
    }). isRequired,
}

export default CartItem