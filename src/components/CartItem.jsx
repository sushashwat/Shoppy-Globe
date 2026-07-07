import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {updateItemQuantity, removeItem} from "../redux/cartSlice";


/**
 * CartItem component: represents a single item in the shopping cart.
 * Allows quantity adjustment (min1) and removal - both calls the backend 
 * via Redux async thunks 
 */

function CartItem({item}) {
    const dispatch = useDispatch()
    const{product, quantity} = item

    function handleIncrease(){
        dispatch(updateItemQuantity({CartItemId: item._id, quantity: quantity+1 }))
    }

      function handleDecrease() {
        if (quantity > 1) {
            dispatch(updateItemQuantity({ cartItemId: item._id, quantity: quantity - 1 }))
        }
    }

    
    function handleRemove() {
        dispatch(removeItem(item._id))
    }


    return(
        <div className="cart-item">            
                        {/* Lazy Load image for performance */}
            <img className="cart-item-img" src={product.imageUrl} alt={product.name} loading="lazy"/>   

            <div className="cart-item-info">
                <p className="cart-item-title">{product.name}</p>
                <p className="cart-item-price">${product.price.toFixed(2)}</p>

                <div className="qty-controls">
                   <button className="qty-btn" onClick={handleDecrease} disabled={quantity <= 1}>
                        −
                    </button>

                    <span className="qty-num">{quantity}</span>
                    <button className="qty-btn" onClick={(handleIncrease)}>
                         +
                    </button>
                    <span className="item-subtotal">= $ {(product.price*quantity).toFixed(2)}</span>
                </div>
            </div>
            <button 
            className="remove-btn"
            onClick={(handleRemove)}
            title="Remove item">
                 ✕
            </button>
        </div>  
    )
}

// PropTypes ensure component receives correct data shape 
CartItem.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        product: PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            imageUrl: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}
export default CartItem