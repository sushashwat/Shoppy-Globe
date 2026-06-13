import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import { useOutletContext } from 'react-router-dom'

/**
 * ProductDetail page: shows detailed info about a single product.
 * - useParams() reads the dynamic route param :id
 * - useEffect fetches product data when component mounts / id changes
 * - Error handling shows a friendly message on fetch failure
 */
function ProductDetail() {
    const { id } = useParams()   // Dynamic Route Parameter
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { showToast } = useOutletContext() // Get showToast from Layout

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // useEffect: fetch product details when component mounts or id changes
    useEffect(() => {
        const controller = new AbortController()

        async function fetchProduct() {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`, {
                    signal: controller.signal,
                })
                if (!res.ok) throw new Error('Product not found')
                setProduct(await res.json())
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

    return (
        <div className="detail-page">
            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

            <div className="detail-grid">
                {/* Product image — lazy loaded */}
                <div className="detail-img-wrap">
                    <img className="detail-img" src={product.thumbnail} alt={product.title} loading="lazy" />
                </div>

                {/* Product information */}
                <div className="detail-info">
                    <p className="detail-category">{product.category}</p>
                    <h1 className="detail-title">{product.title}</h1>
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