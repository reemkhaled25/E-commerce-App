import React, { useContext, useEffect, useState } from 'react'
import Style from './Products.module.css'
import Search from '../Search/Search'
import img from '../../assets/images/bg-1.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { CartContext } from '../../Context/CartContext'
import { WishlistContext } from '../../Context/WishlistContext'
import toast from 'react-hot-toast'
import { CountContext } from '../../Context/CountContext'
import { Helmet } from 'react-helmet'

export default function Products() {

  const [products, setProducts] = useState([])
  let { addToCart} = useContext(CartContext)
  let { addToWishlist } = useContext(WishlistContext)
  let {setCartCount } = useContext(CountContext)
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
 
  function getProducts() {
    setLoadingScreen(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setProducts(data.data)
        setLoadingScreen(false)

      })
      .catch((res) => {

      })
  }
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
  async function addProductToWishlist(productId) {
    setLoadingScreen(true)
    let response = await addToWishlist(productId)
    if (response.data.status === "success") {      
      setLoadingScreen(false)
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
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    getProducts()
  }, [])

  return <>
      <Helmet>
      <link rel="icon" type="image/svg+xml" href="../../public/green-shopping-cart-10935.svg" />
      <title>Products</title>
    </Helmet>
    {loadingScreen ? <LoadingScreen /> : <div className="container py-32 mx-auto">
      <div className="text-center mb-5">
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-3/4 py-1 rounded-md px-2 outline-0 border border-gray-400 search' placeholder='Search' />
      </div>
      <h1 className='text-4xl text-green-600 font-bold text-center mb-8'>Our Products</h1>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4 mb-9">
        {filteredProducts.map((product) => <div key={product._id}>

          <div className="card p-3  rounded   overflow-hidden cursor-pointer">
            <Link to={`/productdetails/${product._id}/${product.category.name}`}>
              <img src={product.imageCover} className='w-full' alt="" />
              <p className='text-green-600'>{product.category.name}</p>
              <h3 className='font-semibold'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
              <div className='flex justify-between items-center mb-5'>
                <span>{product.price}<span className='ms-1'>EGP</span></span>
                <span><i className="fa-solid fa-star me-1 text-yellow-600"></i>{product.ratingsAverage}</span>
              </div></Link>
            <div className='flex items-center'>
              <button onClick={() => addProductToCart(product._id)} className='px-16 py-2 bg-green-600 text-white rounded'>Add</button>
              <i onClick={() => addProductToWishlist(product._id)} className="fa-solid fa-heart  text-3xl ms-auto "></i>
            </div>
          </div>

        </div>
        )}
      </div>
    </div>}

  </>
}
