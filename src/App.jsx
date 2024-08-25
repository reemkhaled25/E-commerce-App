import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Products from './Components/Products/Products'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import WishList from './Components/WishList/WishList'
import Categories from './Components/Categories/Categories'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import { UserContextProvider } from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import NotFound from './Components/NotFound/NotFound'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import WishlistContextProvider from './Context/WishlistContext'
import toast, { Toaster } from 'react-hot-toast';
import CheckOut from './Components/CheckOut/CheckOut'
import AllOrders from './Components/AllOrders/AllOrders'
import CountContextProvider from './Context/CountContext'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'
 VerifyCode
let router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute> <Home /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'productdetails/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'checkout/:id', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'forgetpassword', element: <ForgetPassword /> },
      { path: 'verifycode', element: <VerifyCode /> },
      { path: 'resetpasssword', element: <ResetPassword /> },
      { path: '*', element: <NotFound /> },
    ]
  }
])

function App() {

  return <>
    <CountContextProvider>
    <CartContextProvider>
      <WishlistContextProvider>
      <UserContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </UserContextProvider>
      </WishlistContextProvider>
      </CartContextProvider>
    </CountContextProvider>

  </>

}

export default App
