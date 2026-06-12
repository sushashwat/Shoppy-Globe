import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { lazy } from "react";
import Layout from "./components/Layout";

const ProductList = lazy(() => import( './pages/ProductList'))

function PageLoader(){
  return <div className="page-loader">Loading...</div>
}


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
    ],
  },
])


function App(){
  return <RouterProvider router = {router}/>
}

export default App