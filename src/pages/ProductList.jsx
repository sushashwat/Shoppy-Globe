import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setSearchQuery,
    selectSearchQuery,
    selectFilteredProducts,
    selectProductsLoading,
    selectProductsError,
} from '../redux/productsSlice'

import useFetchProducts from '../hooks/useFetchProducts'
import ProductItem from '../components/ProductItem'

/**
 * ProductList Page
 *
 * - Calls custom hook useFetchProducts (useEffect inside) to load products
 *   and store them in Redux.
 * - Search query is stored in Redux state (productsSlice).
 * - Filtered products derived via Redux selector selectFilteredProducts.
 * - Each <ProductItem> gets a unique key={product.id} (React Lists requirement).
 */

function ProductList() {
    const dispatch = useDispatch()
    const searchQuery = useSelector(selectSearchQuery)
    const filtered = useSelector(selectFilteredProducts)
    const loading = useSelector(selectProductsLoading)
    const error = useSelector(selectProductsError)

  // Custom hook: triggers useEffect fetch, writes to Redux store
    useFetchProducts()

  // ── Skeleton loading state ────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="product-list-page">
                <div className="search-bar-wrap">
                    <input className="search-input" placeholder="Search products..." disabled />
                </div>
                <div className="products-header">
                    <h2 className="section-title">Our Collection</h2>
                </div>
                <div className="products-grid">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="skeleton-card">
                            <div className="skeleton skeleton-img" />
                            <div className="skeleton-body">
                                <div className="skeleton skeleton-line" />
                                <div className="skeleton skeleton-line" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

  // ── Error state ───────────────────────────────────────────────────────────
    if (error) {
        return (
            <div className="product-list-page">
                <div className="error-banner">
                    <span>⚠️</span>
                    <p>{error}</p>
                </div>
            </div>
        )
    }

  // ── Main render ───────────────────────────────────────────────────────────
    return (
        <div className="product-list-page">
            <div className="search-bar-wrap">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search products by name or category..."
                    value={searchQuery}
                    onChange={e => dispatch(setSearchQuery(e.target.value))}
                />
                {searchQuery && (
                    <button className="clear-search" onClick={() => dispatch(setSearchQuery(''))}>
                        ✕
                    </button>
                )}
            </div>

            <div className="products-header">
                <h2 className="section-title">Our Collection</h2>
                <span className="products-count">{filtered.length} products</span>
            </div>

            {filtered.length === 0 ? (
                <div className="empty-state">
                    <p className="empty-icon">🔍</p>
                    <h3>No products found</h3>
                </div>
            ) : (
                <div className="products-grid">
                    {filtered.map(product => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductList
