import React, { useEffect, useState } from 'react'
import Style from './WishList.module.css'
import { CartContext } from '../../Context/CartContext'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { useContext } from 'react'
import { WishlistContext } from '../../Context/WishlistContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'
export default function WishList() {
  let { getUserWishlist, deleteWislistProduct } = useContext(WishlistContext)
  const [wishlistItems, setWishlistItems] = useState(null)
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [flag, setFlag] = useState(0)
  let { addToCart, setCartCount } = useContext(CartContext)

  async function addProductToCart(productId) {
    setLoadingScreen(true)
    let response = await addToCart(productId)
    if (response.data.status === "success") {
      setLoadingScreen(false)
      setCartCount(response.data.numOfCartItems)
      toast.success(response.data.message, {
        duration: 2000,
        position: 'top-center',
      })
    } else {
      setLoadingScreen(false)
      toast.error(response.data.message, {
        duration: 2000,
        position: 'top-center',
      })
    }


  }
  async function getWishlist() {
    setLoadingScreen(true)
    let response = await getUserWishlist()
    setWishlistItems(response.data.data)
    setLoadingScreen(false)
  }
  async function deleteWishlist(productId) {

    let response = await deleteWislistProduct(productId)
    if (response.data.status === "success") {
      setWishlistItems(response.data.data)
      console.log(wishlistItems);
      
      console.log(response.data.data);
      
      setFlag(flag + 1)
      toast.success(response.data.message, {
        duration: 2000,
        position: 'top-center',
      })
    } else {
      setLoadingScreen(false)
      toast.error(response.data.message, {
        duration: 2000,
        position: 'top-center',
      })
    }
  }


  useEffect(() => {
    getWishlist()
  }, [flag])
  return <>
    <Helmet>
      <link rel="icon" type="image/svg+xml" href="../../public/green-shopping-cart-10935.svg" />
      <title>Wish List</title>
    </Helmet>
    {loadingScreen ? <LoadingScreen /> : <div className="container py-32 mx-auto">
      <h1 className='text-4xl text-green-600 font-bold text-center mb-8'>My Wish List</h1>
      <div>
        {wishlistItems?.length==0?<div>
          <div className=' px-8 bg-gray-100 mt-20 rounded-md '>
          <h1 className='py-14 text-4xl text-gray-700 text-center'>Your Wish List is Empty</h1>
          </div>
        </div>:null}
      </div>
      {wishlistItems?.map((product) => <div key={product._id} className='bg-gray-100 py-5 rounded-md mb-3'>
        <div className="item flex items-center justify-between px-10 ">
          <div className=' flex items-center gap-7  w-2/3 '>
            <img src={product.imageCover} className='w-1/4' alt="" />
            <div>
              <h1 className='text-xl font-semibold'>{product.title}</h1>
              <p className=' text-green-600 font-semibold'>{product.price} EGP</p>
              <button onClick={() => deleteWishlist(product.id)} className='text-red-500 hover:text-red-800 transition duration-500'><i className="fa-solid fa-trash me-2 "></i>Remove</button>
            </div>
          </div>
          <div className=' w-1/3 text-end'>
            <button onClick={() => addProductToCart(product._id)} className='px-16 py-2 bg-green-600 text-white rounded btn'>Add to Cart</button>
          </div>
        </div>
      </div>
      )}


    </div>}

  </>
}
