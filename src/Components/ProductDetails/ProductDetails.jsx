import React, { useContext, useEffect, useState } from 'react'
import Style from './ProductDetails.module.css'
import Slider from 'react-slick';
import img from '../../assets/images/bg-1.jpg'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { CartContext } from '../../Context/CartContext'
import { WishlistContext } from '../../Context/WishlistContext'
import toast from 'react-hot-toast'
import { CountContext } from '../../Context/CountContext'
import { Helmet } from "react-helmet";
export default function ProductDetails() {

  let { id, category } = useParams()
  const [productDetails, setProductDetails] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loadingScreen, setLoadingScreen] = useState(false)
  let { addToCart } = useContext(CartContext)
  let { setCartCount } = useContext(CountContext)
  let { addToWishlist } = useContext(WishlistContext)
  function getProductDetails(id) {
    setLoadingScreen(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data)
        setLoadingScreen(false)
      })
      .catch(() => {

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

  function getRelatedProducts(category) {
    setLoadingScreen(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let products = data.data;
        let related = products.filter((product) => product.category.name == category)
        setRelatedProducts(related);
        setLoadingScreen(false)
      })
      .catch(() => {

      })

  }

  useEffect(() => {
    getProductDetails(id)
    getRelatedProducts(category)
  }, [id, category])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return <>
    <Helmet>
      <link rel="icon" type="image/svg+xml" href="../../public/green-shopping-cart-10935.svg" />
      <title>Product Details</title>
    </Helmet>
    {loadingScreen ? <LoadingScreen /> : <div className="container py-32 mx-auto">
      <div className="flex justify-evenly items-center">
        <div className='w-1/4'>
          <Slider {...settings}>
            {productDetails?.images.map((src, index) => <img key={index} src={src} className='w-full' alt="" />)}
          </Slider>
        </div>
        <div className='  w-3/4 px-8'>
          <h1 className='text-3xl font-semibold'>{productDetails?.title}</h1>
          <p className='text-gray-500 m-5'>{productDetails?.description}</p>
          <div className='flex justify-between items-center mb-5'>
            <span>{productDetails?.price}<span className='ms-1'>EGP</span></span>
            <span><i className="fa-solid fa-star me-1 text-yellow-600"></i>{productDetails?.ratingsAverage}</span>
          </div>
          <div className='flex items-center'>
            <button onClick={() => addProductToCart(productDetails._id)} className='px-16 py-2 bg-green-600 text-white rounded w-3/4 mx-auto btn'>Add</button>
            <i onClick={() => addProductToWishlist(productDetails._id)} className="fa-solid fa-heart text-3xl ms-auto cursor-pointer"></i>
          </div>
        </div>
      </div>
      <div className='mt-20'>
        <h1 className='text-4xl text-green-600 font-bold text-center mb-8'>Related Products</h1>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4 mb-9">
          {relatedProducts.map((product) => <div key={product._id}>

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
                <i onClick={(e) => addProductToWishlist(product._id, e)} className='fa-solid fa-heart text-3xl ms-auto'></i>
              </div>
            </div></div>
          )}
        </div>
      </div>
    </div>


    }

  </>
}
