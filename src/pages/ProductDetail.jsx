import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../redux/cartSlice'
import { selectIsAuthenticated } from '../redux/authSlice'
import { useOutletContext } from 'react-router-dom'

/**
 * ProductDetail page: shows detailed info about a single product.
 * - useParams() reads the dynamic route param :id
 * - useEffect fetches product data from our own backend when component mounts / id changes
 * - "Add to Cart" dispatches an async thunk that calls the backend (requires login)
 */
function ProductDetail() {
    const { id } = useParams()   // Dynamic Route Parameter
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const { showToast } = useOutletContext() // Get showToast from Layout

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // useEffect: fetch product details from our backend when component mounts or id changes
    useEffect(() => {
        const controller = new AbortController()

        async function fetchProduct() {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
                    signal: controller.signal,
                })
                if (!res.ok) throw new Error('Product not found')
                const result = await res.json()
                setProduct(result.data)   
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError('Failed to load product')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
        return () => controller.abort()
    }, [id])

    if (loading) return <div className="detail-page"><p>Loading...</p></div>
    if (error) return <div className="detail-page"><p className="error-banner">{error}</p></div>
    if (!product) return null

    const rating = product.rating || 4
    const stars = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))

      function handleAddToCart() {
        // Cart is backend-protected — a logged-out user can't add to it
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        dispatch(addItemToCart({ productId: product._id, quantity: 1 }))
        showToast(`✓ "${product.name}" added to cart!`)
    }

    return (
        <div className="detail-page">
            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

            <div className="detail-grid">
                {/* Product image — lazy loaded */}
                <div className="detail-img-wrap">
                    <img className="detail-img" src={product.imageUrl} alt={product.name} loading="lazy" />
                </div>

                {/* Product information */}
                <div className="detail-info">
                    <p className="detail-category">{product.category}</p>
                    <h1 className="detail-title">{product.name}</h1>
                    <p className="detail-price">${product.price.toFixed(2)}</p>
                    <p className="detail-desc">{product.description}</p>

                    <div className="detail-stats">
                        <div className="stat-item">
                            <p className="stat-label">Rating</p>
                            <p className="stat-value">{stars} {rating.toFixed(1)}</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-label">Stock</p>
                            <p className="stat-value">{product.stock ?? 'N/A'}</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-label">Discount</p>
                            <p className="stat-value">{(product.discountPercentage || 0).toFixed(1)}% off</p>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary btn-large"
                        onClick={() => {
                            dispatch(addToCart(product));
                            showToast(`✓ "${product.title}" added to cart!`);
                        }}
                    >
                        Add to Cart
                    </button>
                    <button className="btn btn-outline btn-large" onClick={() => navigate('/cart')}>
                        View Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail