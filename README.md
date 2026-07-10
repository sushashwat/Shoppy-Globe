> 🔗 Backend repo: [shoppyglobe-backend](https://github.com/sushashwat/shoppyglobe-Backend)
# ShoppyGlobe — React E-commerce Application

A fully-featured e-commerce app built with **Vite + React**, **Redux Toolkit**, and **React Router v6**.

## GitHub Repository
https://github.com/sushashwat/Shoppy-Globe
---

## Tech Stack
- **Vite** — project scaffolding & dev server
- **React 18** — UI library
- **Redux Toolkit** — state management (cart + search)
- **React Router v6** — routing with `createBrowserRouter`
- **React.lazy + Suspense** — code splitting & lazy loading
- **DummyJSON API** — product data source

## 🌟 Features

- ✅ Browse products from DummyJSON API
- ✅ Search and filter products in real-time
- ✅ Add/remove items from shopping cart
- ✅ Adjust product quantities (minimum 1)
- ✅ View detailed product information
- ✅ Checkout with dummy form
- ✅ Order placement with automatic cart clearing
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Code splitting with lazy loading
- ✅ Skeleton loading screens
- ✅ Error handling for API failures
- ✅ 404 Not Found page


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
## Concepts Used

- React Hooks
- Redux Toolkit
- React Router v6
- Custom Hooks
- Lazy Loading
- Code Splitting
- Conditional Rendering
- Responsive Design
- CSS Grid & Flexbox

## 🎨 Component Architecture

### Data Flow

User Interaction
↓
Component dispatches Redux action
↓
Redux store updates state
↓
Component re-renders with new data
↓
User sees updated UI
### Key Components

**Header** → Navigation + Cart badge (reads cart count from Redux)
**ProductList** → Fetches products, displays grid, handles search (Redux state)
**ProductItem** → Individual product card, dispatches addToCart
**ProductDetail** → Fetches product by :id route param, shows details
**Cart** → Lists cart items, calculates totals
**CartItem** → Single cart item with qty controls
**Checkout** → Form to collect user details, places order

## 🔄 State Management (Redux)

### Cart State
```javascript
state.cart = {
  items: [
    { id, title, price, thumbnail, qty },
    ...
  ]
}
```

**Actions:**
- `addToCart(product)` — Add or increment qty
- `removeFromCart(id)` — Remove item completely
- `increaseQty(id)` — Increase qty by 1
- `decreaseQty(id)` — Decrease qty by 1 (min 1)
- `clearCart()` — Empty cart (after order)

### Products State
```javascript
state.products = {
  items: [...all products],
  searchQuery: "",
  loading: false,
  error: null
}
```

**Actions:**
- `setProducts(items)` — Store fetched products
- `setLoading(bool)` — Set loading state
- `setError(msg)` — Set error message
- `setSearchQuery(query)` — Update search filter

## 🌐 API Integration

Products are fetched from **DummyJSON API**:

GET https://dummyjson.com/products?limit=30
GET https://dummyjson.com/products/:id


No authentication required.

## 📱 Responsive Breakpoints

- **Desktop**: Full layout (grid: 3+ columns)
- **Tablet** (max-width: 768px): Grid: 2 columns, sidebar stacked
- **Mobile** (max-width: 480px): Grid: 1 column, full width

## 🚀 Performance Optimizations

- **Code Splitting** — Routes lazy loaded with React.lazy + Suspense
- **Image Lazy Loading** — Images load only when visible
- **Skeleton Loading** — Shows placeholders while data loads
- **Efficient Re-renders** — Redux selectors prevent unnecessary updates

## 🐛 Error Handling

- API fetch failures show friendly error messages
- Invalid routes show 404 page with error details
- Form validation on checkout
- PropTypes validation for component props

## ⚙️ Installation

```bash
git clone https://github.com/sushashwat/Shoppy-Globe.git

cd Shoppy-Globe

npm install

npm run dev
```

## 🎯 Features Breakdown

### Search Functionality
- Real-time search as you type
- Filters by product title or category
- Clear button to reset search
- Redux state stores search query
- Global state management with Redux Toolkit

### Shopping Cart
- Add items from product cards or detail page
- Adjust quantities with +/- buttons
- Quantity cannot go below 1
- Remove items completely
- Shows subtotal, tax (10%), and total

### Checkout Flow
1. Fill in shipping & payment details (dummy form)
2. Review cart summary
3. Click "Place Order"
4. See "Order Placed!" success message
5. Cart clears automatically
6. Redirected to home page after 2.5 seconds

### Product Details
- Click product card to see full details
- Shows rating, stock, discount, brand
- Dynamic URL: `/product/:id`
- useEffect fetches data based on route param

## 🔧 Customization

### Change API Endpoint
In `src/hooks/useFetchProducts.js`:
```javascript
function useFetchProducts(url = 'https://dummyjson.com/products?limit=30') {
  // Change this URL to fetch from different API
}
```

### Modify Colors
In `src/style.css`, update CSS variables:
```css
:root {
  --accent: #c8481a;  /* Change accent color */
  --green: #2a5c3f;   /* Change success color */
  /* ... etc ... */
}
```

### Add More Routes
In `src/App.jsx`:
```javascript
{
  path: 'new-page',
  element: <Suspense fallback={<PageLoader />}><NewPage /></Suspense>
}
```

## 📚 Learning Resources

This project demonstrates:
- Modern React with hooks (useState, useEffect, useContext)
- Redux Toolkit for state management
- React Router v6 with dynamic routes
- Custom hooks for code reuse
- Responsive CSS Grid & Flexbox
- Lazy loading & code splitting
- Error handling & loading states

## 🎓 How to Understand the Code

1. Start with `src/main.jsx` — entry point
2. Read `src/App.jsx` — routing setup
3. Explore `src/components/Layout.jsx` — main structure
4. Check `src/pages/ProductList.jsx` — most complex component
5. Look at `src/redux/cartSlice.js` — Redux pattern
6. Review `src/styles/style.css` — styling approach

## 🐛 Troubleshooting

### Products not loading?
- Check browser console for errors
- Verify DummyJSON API is accessible
- Clear cache and hard refresh (Ctrl+Shift+R)

### Styling looks broken?
- Make sure `src/style.css` is imported in `src/main.jsx`
- Check for CSS variable usage
- Verify media queries are correct

### Cart not updating?
- Check Redux DevTools (install browser extension)
- Verify dispatch is happening
- Check component is connected with useSelector

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Shashwat Gupta**

Aspiring Full-Stack Web Developer passionate about building modern React applications using Redux Toolkit and responsive UI design.

---

**Happy shopping! 🛒**  

# GIT REPO - https://github.com/sushashwat/Shoppy-Globe
