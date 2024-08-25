import React, { useContext, useEffect, useState } from 'react'
import Style from './AllOrders.module.css'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from "react-helmet";
export default function AllOrders() {
  const [AllOrders, setAllOrders] = useState(null)
  const [loadingScreen, setLoadingScreen] = useState(false)
  let{deleteCart}=useContext(CartContext)
  let token = localStorage.getItem('token')
  let { id } = jwtDecode(token)
  console.log(id);
  
  function getAllOrders() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    .then((response)=>{
      console.log(response);
      deleteCart()
    }).catch(()=>{

    })
  }
  useEffect(() => { 
    getAllOrders()
  }, [])
  return <>
      <Helmet>
      <link rel="icon" type="image/svg+xml" href="../../public/green-shopping-cart-10935.svg" />
      <title>All Orders</title>
    </Helmet>
    {loadingScreen ? <LoadingScreen /> : <div className="container py-40 mx-auto">
      <h1 className='text-4xl text-green-600 font-bold text-center mb-8'>All Orders</h1>
      <div className=' px-8 bg-gray-100 mt-20 rounded-md '>
          <h1 className='py-14 text-4xl text-gray-700 text-center'>All Orders are Done</h1>
          </div>
    </div>}

  </>
}
