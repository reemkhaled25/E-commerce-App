import React, { useEffect, useState } from 'react'
import Style from './Home.module.css'
import Products from '../Products/Products'
import About from '../About/About'
import { Helmet } from "react-helmet";
export default function Home() {

  return <>
    <Helmet>
      <link rel="icon" type="image/svg+xml" href="../../public/green-shopping-cart-10935.svg" />
      <title>Fresh Cart</title>
    </Helmet>
    <header className='flex  items-center text-white px-14'>
      <div className="container">
        <h1 className='text-5xl font-bold mb-3'>Welcome To Our </h1>
        <h1 className='text-5xl font-bold text-green-600 mb-10'>Fresh Cart </h1>
        <p className='text-lg'>We are here to make your shopping easier</p>
      </div>
    </header>
    <About />
    <Products />
  </>
}
