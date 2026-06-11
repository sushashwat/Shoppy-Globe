import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path:'/',
    element: <div> Placeholder - Layout goes here </div>,
  },
])

function App(){
  return <RouterProvider router = {router}/>
}

export default App