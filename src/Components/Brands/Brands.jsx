import React, { useEffect, useState } from 'react'
import Style from './Brands.module.css'
import img from '../../assets/images/bg-1.jpg'
import axios from 'axios'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { Helmet } from "react-helmet";
export default function Brands() {
  const [brands, setBrands] = useState([])
  const [loadingScreen, setLoadingScreen] = useState(false)
  function getBrands() {
    setLoadingScreen(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        setBrands(data.data)
        setLoadingScreen(false)
      }).catch(() => {

      })
  }
  useEffect(() => {
    getBrands()
  }, [])
  return <>
    <Helmet>
      <link rel="icon" type="image/svg+xml" href="../../public/green-shopping-cart-10935.svg" />
      <title>Brands</title>
    </Helmet>
    {loadingScreen ? <LoadingScreen /> : <div className="container mx-auto py-32">
      <h1 className='text-4xl text-green-600 font-bold text-center mb-8'>All Brands</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4 mb-9">
        {brands.map((brand) => <div key={brand._id} className="card p-3 rounded ">
          <img src={brand.image} className='w-full' alt="" />
          <h3 className=' text-center font-semibold '>{brand.name} </h3>
        </div>
        )}
      </div>
    </div>


    }


  </>
}
