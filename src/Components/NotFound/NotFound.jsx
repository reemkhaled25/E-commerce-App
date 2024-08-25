import React, { useEffect, useState } from 'react'
import Style from './NotFound.module.css'
import notfound from '../../assets/images/notfound.jpg'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function NotFound() {

  return <>
    <Helmet>
      <link rel="icon" type="image/svg+xml" href="../../public/green-shopping-cart-10935.svg" />
      <title>Fresh Cart</title>
    </Helmet>
    <div className="container mx-auto py-32  text-center">
      <img src={notfound} className=' mx-auto' alt="" />
      <h1 className='text-4xl text-slate-900 font-bold text-center mb-8'>Oops! This Page is Not Found</h1>
      <span className='text-lg text-white bg-slate-900  py-2 px-4 rounded-lg cursor-pointer hover:bg-slate-800'>
        <Link to={''}>Back Home Now <i class="fa-solid fa-motorcycle ms-2"></i></Link>
      </span>
    </div>
  </>
}
