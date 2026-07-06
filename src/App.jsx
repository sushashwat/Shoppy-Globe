import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { lazy } from "react";
import Layout from "./components/Layout";


// Performance Optimization: React.lazy + Suspense for all route-level components
const ProductList  = lazy(() => import('./pages/ProductList'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart         = lazy(() => import('./pages/Cart'))
const Checkout     = lazy(() => import('./pages/Checkout'))
const Login        = lazy(() => import('./pages/Login'))
const Register     = lazy(() => import('./pages/Register'))
const NotFound     = lazy(() => import('./pages/NotFound'))

// Loading fallback shown while lazy components are being fetched
function PageLoader() {
  return (
    <div className="page-loader">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  )
}

// createBrowserRouter (modern React Router v6 API with better data handling)
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductList />
          </Suspense>
        ),
      },
      {
        // Dynamic route for product detail using route param :id
        path: 'product/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: 'checkout',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Register />
          </Suspense>
        ),
      },
      {
        // Catch-all route → 404 NotFound page
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
