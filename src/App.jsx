import { createBrowserRouter, RouterProvider, Suspense } from "react-router-dom";
import { lazy } from "react";
import Layout from "./components/Layout";
const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children: [{
      index: true,
      element: <div>Product List coming soon...</div>, 
    },
  ],
 },
])

function App(){
  return <RouterProvider router = {router}/>
}

export default App