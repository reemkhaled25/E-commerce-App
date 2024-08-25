import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import toast from 'react-hot-toast'
import { CountContext } from '../../Context/CountContext'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
export default function Cart() {

  let { getUserCart, deleteProduct, updateCart, deleteCart } = useContext(CartContext)
  let { CartCount, setCartCount } = useContext(CountContext)
  const [cartItems, setCartItems] = useState(null)
  const [cartId, setCartId] = useState(0)
  const [loadingScreen, setLoadingScreen] = useState(false)

  async function getCart() {
    setLoadingScreen(true)
    let response = await getUserCart()
    setCartId(response.data?.data._id)
    setCartItems(response.data?.data)
    setCartCount(response.data?.numOfCartItems)
    setLoadingScreen(false)

  }

  async function clearCart() {
    setLoadingScreen(true)
    let response = await deleteCart()
    setCartCount(0)
    setCartItems(null)
    setLoadingScreen(false)
  }

  async function deleteProductFromCart(productId) {
    setLoadingScreen(true)
    let response = await deleteProduct(productId)
    setCartItems(response.data.data)
    setCartCount(response.data.numOfCartItems)

  }

  async function updateCartItems(productId, count) {
    setLoadingScreen(true)
    if (count == 0) {
      deleteProductFromCart(productId)
    }
    let response = await updateCart(productId, count)
    setCartItems(response.data.data)
    setLoadingScreen(false)

  }


  useEffect(() => {
    getCart()
  }, [])
  return <>
    <Helmet>
      <link rel="icon" type="image/svg+xml" href="../../public/green-shopping-cart-10935.svg" />
      <title>Cart</title>
    </Helmet>
    {loadingScreen ? <LoadingScreen /> : <div className="container py-40 mx-auto">
      <h1 className='text-4xl text-green-600 font-bold text-center mb-8'>My Cart</h1>
      {cartItems?.products.map((product) => <div key={product.product.id} className='bg-gray-100 py-5 rounded-md mb-3'>
        <div className="item flex items-center justify-between px-10">
          <div className=' flex items-center gap-7  w-2/3 '>
            <img src={product.product.imageCover} className='w-1/4' alt="" />
            <div>
              <h1 className='text-xl font-semibold'>{product.product.title}</h1>
              <p className=' text-green-600 font-semibold'>{product.price} EGP</p>
              <button onClick={() => deleteProductFromCart(product.product.id)} className='text-red-500 hover:text-red-800 transition duration-500'><i className="fa-solid fa-trash me-2 "></i>Remove</button>
            </div>
          </div>
          <div className=' w-1/3 text-end'>
            <span onClick={() => updateCartItems(product.product.id, product.count + 1)} className=' cursor-pointer text-2xl font-bold me-4 p-1 text-green-600 rounded border botder-solid  border-green-600'>+</span>
            <span className='text-2xl font-bold me-4 p-1 '>{product.count}</span>
            <span onClick={() => updateCartItems(product.product.id, product.count - 1)} className='cursor-pointer text-2xl font-bold py-1 px-[7px]  text-green-600 rounded border botder-solid border-green-600'>-</span>
          </div>
        </div>
      </div>
      )}
      <div className='bg-gray-100 py-5 rounded-md mb-3'>
        {cartItems != null ? <div className="item flex items-center justify-between px-10 bg-gray-100 ">
          <div className='flex flex-col items-center'>
            <div>
              <h1 className='text-xl font-semibold '>Total Number of Items :<span className='text-green-600'> {CartCount}</span></h1>
            </div>
            <div>
              <button onClick={clearCart} className='px-16 py-2 mt-5 bg-red-600 hover:bg-red-800 transition duration-500 text-white rounded '>Clear My Cart</button>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div>
              <h1 className='text-xl font-semibold '>Total Price : <span className='text-green-600'> {cartItems?.totalCartPrice}</span></h1>
            </div>
            <div>
              <Link to={"/checkout/" + cartId}><button className='px-16 py-2 mt-5 bg-slate-700 hover:bg-slate-900 transition duration-500 text-white rounded' >Check Out</button></Link>
            </div>
          </div>
        </div> : <h1 className='py-10 text-4xl text-gray-700 text-center'>Your Cart is Empty</h1>}

      </div>
    </div>}

  </>
}
