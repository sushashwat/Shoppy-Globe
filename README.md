# ShoppyGlobe — React E-commerce Application

A fully-featured e-commerce app built with **Vite + React**, **Redux Toolkit**, and **React Router v6**.

## GitHub Repository
> _Add your GitHub repo link here before submitting_

---

## Tech Stack
- **Vite** — project scaffolding & dev server
- **React 18** — UI library
- **Redux Toolkit** — state management (cart + search)
- **React Router v6** — routing with `createBrowserRouter`
- **React.lazy + Suspense** — code splitting & lazy loading
- **DummyJSON API** — product data source

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── App.jsx                  # Root: createBrowserRouter + React.lazy + Suspense
├── main.jsx                 # Entry: ReactDOM + Redux Provider
├── components/
│   ├── Layout.jsx           # Wraps all pages with Header + <Outlet />
│   ├── Header.jsx           # Nav + cart icon + cart count badge
│   ├── ProductItem.jsx      # Single product card with Add to Cart
│   └── CartItem.jsx         # Single cart row with qty controls + remove
├── pages/
│   ├── ProductList.jsx      # Home: product grid + Redux search
│   ├── ProductDetail.jsx    # Detail: fetches by route param :id
│   ├── Cart.jsx             # Cart: items list + order summary
│   ├── Checkout.jsx         # Form + summary + Place Order
│   └── NotFound.jsx         # 404 page with error details
├── hooks/
│   └── useFetchProducts.js  # Custom hook: useEffect fetch + loading/error
├── redux/
│   ├── store.js             # configureStore
│   ├── cartSlice.js         # Actions, reducer, selectors for cart
│   └── searchSlice.js       # Actions, reducer, selectors for search
└── styles/
    └── style.css            # Global responsive CSS
```

## Features Implemented

| Requirement | Status |
|---|---|
| Vite project setup | ✅ |
| Component structure (App, Header, ProductList, ProductItem, ProductDetail, Cart, CartItem, NotFound) | ✅ |
| Checkout with dummy form + Place Order + redirect | ✅ |
| Props + PropTypes | ✅ |
| Custom hook useFetchProducts | ✅ |
| useEffect for ProductList & ProductDetail | ✅ |
| Error handling for fetch failures | ✅ |
| Redux Toolkit (cartSlice + searchSlice) | ✅ |
| Redux search filter on ProductList | ✅ |
| Add to cart / Remove / Qty controls (min 1) | ✅ |
| createBrowserRouter with dynamic :id route | ✅ |
| React Lists with unique keys | ✅ |
| React.lazy + Suspense for all pages | ✅ |
| Lazy loading for images | ✅ |
| Responsive CSS | ✅ |
| 404 NotFound with error details | ✅ |
