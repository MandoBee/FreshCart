import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import NotFound from './components/NotFound/NotFound'
import { authContext } from './components/Context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import ProductsByBrand from './components/ProductsByBrand/ProductsByBrand'
import Wishlist from './components/Wishlist/Wishlist'
import Payment from './components/Payment/Payment'
import AllOrders from './components/AllOrders/AllOrders'

function App() {
  const {token} = useState(authContext)

  const routes = createBrowserRouter([
    {path:"",element: <Layout/>,children:[
      
      {index:true,element:<ProtectedRoute> <Home/> </ProtectedRoute>},
      {path:"home",element:<ProtectedRoute> <Home/> </ProtectedRoute>},
      {path:"/categories",element:<ProtectedRoute> <Categories/> </ProtectedRoute>},
      {path:"/brands",element:<ProtectedRoute> <Brands/> </ProtectedRoute>},
      {path:"/wishlist",element:<ProtectedRoute> <Wishlist/> </ProtectedRoute>},
      {path:"/payment",element:<ProtectedRoute> <Payment/> </ProtectedRoute>},
      {path:"/allorders",element:<ProtectedRoute> <AllOrders/> </ProtectedRoute>},
      {path:"/products/:id?",element:<ProtectedRoute> <Products/> </ProtectedRoute>},
      {path:"/productsbybrand/:id?",element:<ProtectedRoute> <ProductsByBrand/> </ProtectedRoute>},
      {path:"/productdetails/:id",element:<ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
      {path:"/login",element:<Login/>},
      {path:"/register",element:<Register/>},
      {path:"/cart",element:<ProtectedRoute> <Cart/> </ProtectedRoute>},

      {path:"*",element:<NotFound/>},
    ]},

  ])
  return (
    <>

<RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
